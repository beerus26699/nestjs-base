import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.interface';
import { UserModel } from '../models';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const dbConfig = configService.get<DatabaseConfig>('database');
                const appConfig = configService.get<{ nodeEnv: string }>('app');

                if (!dbConfig || !appConfig) {
                    throw new Error('Database or App configuration is missing');
                }

                return {
                    dialect: 'postgres',
                    host: dbConfig.host,
                    port: dbConfig.port,
                    username: dbConfig.username,
                    password: dbConfig.password,
                    database: dbConfig.database,
                    models: [UserModel],
                    logging: false,
                    dialectOptions:
                        appConfig.nodeEnv === 'production'
                            ? {
                                  ssl: {
                                      require: true,
                                      rejectUnauthorized: false,
                                  },
                              }
                            : undefined,
                };
            },
        }),
    ],
    exports: [SequelizeModule],
})
export class DatabaseModule {}
