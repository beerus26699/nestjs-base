import * as winston from 'winston';

export class LoggerService {
    private logger: any;

    constructor(logger: winston.Logger) {
        this.logger = logger;
    }

    /**
     * Write a 'critical' level log.
     */
    critical(message: any, ...optionalParams: any[]) {
        this.logger.critical(message);
    }

    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]) {
        this.logger.warning(message);
    }

    /**
     * Write a 'info' level log.
     */
    info(message: any, ...optionalParams: any[]) {
        this.logger.info(message);
    }

    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]) {
        this.logger.info(message);
    }

    /**
     * Write a 'error' level log.
     */
    error(message: any, ...optionalParams: any[]) {
        this.logger.error(message);
    }

    /**
     * Write a 'debug' level log.
     */
    debug?(message: any, ...optionalParams: any[]) {
        this.logger.debug(message, '1231');
    }
}
