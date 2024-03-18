import * as winston from 'winston';

const { printf } = winston.format;

export const customPrintFile = printf(
    ({ level, message, label, timestamp }) =>
        `[${timestamp}] [${level.toUpperCase()}]: ${message}`,
);
