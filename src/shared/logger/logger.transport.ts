import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { customPrintFile } from './logger.util';

const { timestamp, json, ms, combine, label } = winston.format;

export const initConsoleTransport = () => {
    return new winston.transports.Console({
        level: 'debug',
        format: combine(
            timestamp(),
            ms(),
            nestWinstonModuleUtilities.format.nestLike('Base-NestJS', {
                colors: true,
                prettyPrint: true,
            }),
        ),
    });
};

export const initFileTransport = (filename: string = 'debug') => {
    return new winston.transports.File({
        filename: `logs/${filename}.log`,
        level: 'debug',
        maxsize: 10 * 1024 * 1024, // 10MB
        format: combine(
            timestamp({ /* format: 'YYYY-MM-DD HH:mm:ss' */ }),
            json(),
            label({ label: '12312' }),
            customPrintFile,
        ),
    });
};
