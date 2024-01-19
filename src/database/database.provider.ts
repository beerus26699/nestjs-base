import { Sequelize } from 'sequelize-typescript';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.interface';
import { UserModel } from 'src/entities/user.entity';
import configuration from 'src/config/configuration';
import databaseConfig from 'src/config/database.config';

const models = [UserModel];

const config = databaseConfig();
const sequelize = new Sequelize({
    ...config,
    dialect: 'mysql',
    dialectOptions: {
        supportBigNumbers: true,
    },
    logging: false,
});

const databaseProviders: Provider[] = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            initDatabase().catch((err) => {
                console.log('can not init database', err);
                process.abort();
            });
        },
    },
];

async function initDatabase() {
    // sequelize model
    sequelize.addModels(models);

    console.log('Init database done');

    //   return await sequelize.sync().then(async () => {
    //     console.log('generate database done');
    //   });
}

export { databaseProviders, sequelize };
