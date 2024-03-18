import { registerAs } from '@nestjs/config';
import configuration from './configuration';
import { DatabaseConfig } from 'src/database/database.interface';

const config: DatabaseConfig = configuration().database;

export default registerAs('database', () => ({
    uri: config.uri,
    user: config.user,
    pass: config.pass,
    dbName: config.dbName,
}));
