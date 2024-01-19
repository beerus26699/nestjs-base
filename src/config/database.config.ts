import { registerAs } from '@nestjs/config';
import configuration from './configuration';
import { DatabaseConfig } from 'src/database/database.interface';

const config: DatabaseConfig = configuration().database;

export default registerAs('database', () => ({
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
}));
