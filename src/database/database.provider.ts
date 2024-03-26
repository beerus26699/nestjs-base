import { Sequelize } from 'sequelize-typescript';
import { Provider } from '@nestjs/common';
import { UserModel } from 'src/entities/user.entity';
import { DATABASE_CONFIG } from 'src/config/dotenv';

const models = [UserModel];

const sequelize = new Sequelize({
    ...DATABASE_CONFIG,
    dialectOptions: {
        supportBigNumbers: true,
    },
    dialect: 'mysql'
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
