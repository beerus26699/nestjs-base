import * as dotenv from 'dotenv';
import { DatabaseConfig } from 'src/database/database.interface';

dotenv.config();

export const DATABASE_CONFIG: DatabaseConfig = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    logging: process.env.DATABASE_LOGGING == 'true',
};
