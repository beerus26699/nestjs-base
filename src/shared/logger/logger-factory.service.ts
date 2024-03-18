import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { LoggerService } from './logger.service';
import { initConsoleTransport, initFileTransport } from './logger.transport';

@Injectable()
export class LoggerFactoryService {
    private logger: winston.Logger;
    private caller: string

    constructor() {
        this.logger = winston.createLogger({
            level: 'debug',
            transports: [initConsoleTransport()],
        });
    }

    createLogger(caller: string): LoggerService {
        this.caller = caller;
        return new LoggerService(this.logger.child({ caller }));
    }

    logFile(filename?: string): LoggerService {
        return new LoggerService(
            winston.createLogger({
                transports: [initFileTransport(filename)],
            }),
        );
    }
}
