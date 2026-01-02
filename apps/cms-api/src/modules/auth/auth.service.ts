import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UsersDataService } from '@app/shared/modules/users/users-data.service';
import { MailService } from '@app/shared/modules/mail/mail.service';
import { RedisService } from '@app/shared/modules/redis/redis.service';
import { RedisKeys } from '@app/shared/modules/redis/redis-keys.constant';
import { ERR_CODE } from '@app/core/enums/exception.enum';
import { JwtAccessTokenClaims } from '@app/core/types/auth.interface';

interface ExchangeCodeData {
    accessToken: string;
    user: {
        id: number;
        email: string;
        fullName: string;
        avatar: string;
        role: string;
    };
}

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersDataService: UsersDataService,
        private mailService: MailService,
        private redisService: RedisService,
    ) {}

    async login(dto: LoginDto) {
        // TODO: check username, password in DB

        const user = await this.usersDataService.findOne({
            where: { email: dto.email },
        });

        if (!user) {
            throw new BadRequestException(
                ERR_CODE.USERNAME_OR_PASSWORD_NOT_MATCH,
            );
        }

        const isMatchPassword = await bcrypt.compare(
            dto.password,
            user.passwordHash,
        );
        if (!isMatchPassword) {
            throw new BadRequestException(
                ERR_CODE.USERNAME_OR_PASSWORD_NOT_MATCH,
            );
        }

        if (!user.isActivated) {
            throw new BadRequestException(ERR_CODE.ACCOUNT_NOT_ACTIVATED);
        }

        const payload: JwtAccessTokenClaims = {
            userId: user.id,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken: accessToken,
        };
    }

    async register(dto: RegisterDto) {
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const existUser = await this.usersDataService.findOne({
            where: { email: dto.email },
        });

        if (existUser) {
            throw new BadRequestException(ERR_CODE.USERNAME_IS_EXIST);
        }

        const activationToken = crypto.randomBytes(32).toString('hex');
        const activationTokenExpires = new Date(
            Date.now() + 24 * 60 * 60 * 1000,
        ); // 24 hours

        const user = await this.usersDataService.create({
            email: dto.email,
            passwordHash: hashPassword,
            activationToken,
            activationTokenExpires,
            isActivated: false,
        });

        await this.mailService.sendActivationEmail(dto.email, activationToken);

        return {
            message:
                'Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.',
        };
    }

    async activateEmail(token: string) {
        const user = await this.usersDataService.findOne({
            where: { activationToken: token },
        });

        if (!user) {
            throw new BadRequestException(ERR_CODE.INVALID_ACTIVATION_TOKEN);
        }

        if (user.activationTokenExpires < new Date()) {
            throw new BadRequestException(ERR_CODE.ACTIVATION_TOKEN_EXPIRED);
        }

        await user.update({
            isActivated: true,
            activationToken: null,
            activationTokenExpires: null,
        });

        return {
            message:
                'Kích hoạt tài khoản thành công. Bạn có thể đăng nhập ngay bây giờ.',
        };
    }

    async resendActivationEmail(email: string) {
        const user = await this.usersDataService.findOne({
            where: { email },
        });

        if (!user) {
            throw new BadRequestException(
                ERR_CODE.USERNAME_OR_PASSWORD_NOT_MATCH,
            );
        }

        if (user.isActivated) {
            return {
                message: 'Tài khoản đã được kích hoạt.',
            };
        }

        const activationToken = crypto.randomBytes(32).toString('hex');
        const activationTokenExpires = new Date(
            Date.now() + 24 * 60 * 60 * 1000,
        );

        await user.update({
            activationToken,
            activationTokenExpires,
        });

        await this.mailService.sendActivationEmail(email, activationToken);

        return {
            message: 'Email kích hoạt đã được gửi lại.',
        };
    }

    async googleLogin(googleUser: {
        googleId: string;
        email: string;
        fullName: string;
        avatar: string;
    }) {
        let user = await this.usersDataService.findOne({
            where: { googleId: googleUser.googleId },
        });

        if (!user) {
            // Kiểm tra xem email đã tồn tại chưa
            const existingUser = await this.usersDataService.findOne({
                where: { email: googleUser.email },
            });

            if (existingUser) {
                // Liên kết tài khoản Google với tài khoản hiện có
                await existingUser.update({
                    googleId: googleUser.googleId,
                    avatar: googleUser.avatar || existingUser.avatar,
                    fullName: googleUser.fullName || existingUser.fullName,
                    isActivated: true,
                });
                user = existingUser;
            } else {
                // Tạo tài khoản mới
                user = await this.usersDataService.create({
                    email: googleUser.email,
                    googleId: googleUser.googleId,
                    fullName: googleUser.fullName,
                    avatar: googleUser.avatar,
                    isActivated: true,
                });
            }
        }

        const payload: JwtAccessTokenClaims = {
            userId: user.id,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.fullName,
                avatar: user.avatar,
                role: user.role,
            },
        };
    }

    async generateExchangeCode(data: {
        accessToken: string;
        user: any;
    }): Promise<string> {
        const code = crypto.randomBytes(32).toString('hex');
        const key = RedisKeys.exchangeCode(code);

        await this.redisService.getOrSet<ExchangeCodeData>(
            key,
            () => ({ accessToken: data.accessToken, user: data.user }),
            { ttl: 300 }, // 5 minutes in seconds
        );

        return code;
    }

    async exchangeCodeForToken(code: string) {
        const key = RedisKeys.exchangeCode(code);
        const data = await this.redisService.getOrSet<ExchangeCodeData>(
            key,
            () => ({ accessToken: data.accessToken, user: data.user }),
            { ttl: 300 }, // 5 minutes in seconds
        );

        if (!data) {
            throw new BadRequestException(ERR_CODE.INVALID_EXCHANGE_CODE);
        }

        // Delete code after use (one-time use)
        await this.redisService.del(key);

        return {
            accessToken: data.accessToken,
            user: data.user,
        };
    }

    async getMe(userId: number) {
        const user = await this.usersDataService.findByPk(userId);

        if (!user) {
            throw new BadRequestException(ERR_CODE.USER_NOT_FOUND);
        }

        return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            avatar: user.avatar,
            role: user.role,
        };
    }
}
