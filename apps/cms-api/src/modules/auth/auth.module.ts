import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UsersDataModule } from '@app/shared/modules/users/users-data.module';
import { MailModule } from '@app/shared/modules/mail/mail.module';

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('app.secretKey'),
                signOptions: { expiresIn: '30 days' },
            }),
            inject: [ConfigService],
        }),
        UsersDataModule,
        MailModule,
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, GoogleStrategy, AuthService],
    exports: [],
})
export class AuthModule {}
