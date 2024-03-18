import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.interface';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (
                configService: ConfigService,
            ): MongooseModuleFactoryOptions => {
                return { ...configService.get<DatabaseConfig>('database') };
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
