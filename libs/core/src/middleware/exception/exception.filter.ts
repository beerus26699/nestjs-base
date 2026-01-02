import { ERR_CODE } from '@app/core/enums/exception.enum';
import { JwtAccessTokenClaims } from '@app/core/types/auth.interface';
import {
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

export class BusinessException extends HttpException {
    constructor(code: ERR_CODE, status: HttpStatus = HttpStatus.BAD_REQUEST) {
        super({ code, message: code }, status);
    }
}

export interface HttpExceptionResponse {
    status: number;
    code: string;
    errorString: string;
    errors?: string[];
    message?: string;
}

export interface IGetUserAuthInfoRequest extends Request {
    user: JwtAccessTokenClaims;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<IGetUserAuthInfoRequest>();

        const caller = request?.user;

        let errorCode: string = ERR_CODE.INTERNAL_SERVER_ERROR;
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string = exception?.message;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            const exceptionConvert = errorResponse as HttpExceptionResponse;
            errorCode = exceptionConvert.code || exception.message;
            message = exceptionConvert.message || exception.stack;
        }

        this.logger.error(`
      Method: ${request?.method}
      Url: ${request.url}
      User: ${JSON.stringify(caller)}
      Message: ${message}
      `);

        return response.status(status).json({
            status,
            code: errorCode,
            path: request.url,
            method: request.method,
            timeStamp: new Date(),
            message,
        });
    }
}
