import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor<T = any> {
    new (...args: any[]): T;
}

class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
                const serializedData = plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
                console.log(serializedData);
                return serializedData;
            }),
        );
    }
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}
