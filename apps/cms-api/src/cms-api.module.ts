import appConfig from '@app/core/config/app.config';
import databaseConfig from '@app/core/config/database.config';
import googleConfig from '@app/core/config/google.config';
import redisConfig from '@app/core/config/redis.config';
import { TransformInterceptor } from '@app/core/middleware/interceptors/transform.interceptor';
import { DatabaseModule } from '@app/shared/database/database.module';
import { RedisModule } from '@app/shared/modules/redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { AllExceptionsFilter } from '@app/core/middleware/exception/exception.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig, googleConfig, redisConfig],
        }),
        DatabaseModule,
        RedisModule,
    ],
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
export class CmsApiModule {}
