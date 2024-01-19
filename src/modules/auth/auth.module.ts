import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

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
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService, UsersService],
    exports: [],
})
export class AuthModule {}
