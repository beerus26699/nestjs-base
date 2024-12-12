import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './middleware/interceptors/transform.interceptor';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AllExceptionsFilter } from './middleware/exception/exception.filter';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { RedisModule } from './libs/redis/redis.module';
import { RedisConfig } from './libs/redis/redis.type';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig],
        }),
        DatabaseModule,
        UsersModule,
        AuthModule,
        RedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                return configService.get<RedisConfig>('cache.redis');
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
