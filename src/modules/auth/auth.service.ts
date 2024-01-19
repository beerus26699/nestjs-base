import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { JwtAccessTokenClaims } from './interfaces/auth.interface';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { ERR_CODE } from 'src/shared/enums/exception.enum';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    async login(dto: LoginDto) {
        // TODO: check username, password in DB

        const user = await this.usersService.findOneByUsername(dto.username);

        if (!user) {
            throw new BadRequestException(
                ERR_CODE.USERNAME_OR_PASSWORD_NOT_MATCH,
            );
        }

        const isMatchPassword = await bcrypt.compare(
            dto.password,
            user.password,
        );
        if (!isMatchPassword) {
            throw new BadRequestException(
                ERR_CODE.USERNAME_OR_PASSWORD_NOT_MATCH,
            );
        }

        const payload: JwtAccessTokenClaims = {
            userId: user.id,
            role: 'admin',
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken: accessToken,
        };
    }

    async register(dto: RegisterDto) {
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const existUser = await this.usersService.findOneByUsername(
            dto.username,
        );

        if (existUser) {
            throw new BadRequestException(ERR_CODE.USERNAME_IS_EXIST);
        }

        const user = await this.usersService.create({
            username: dto.username,
            password: hashPassword,
        });
        return true;
    }
}
