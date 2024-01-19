import {
    ExecutionContext,
    applyDecorators,
    createParamDecorator,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SWAGGER_ACCESS_TOKEN_KEY } from '../constants/app.constant';
import { AuthInfo } from 'src/modules/auth/interfaces/auth.interface';

export function AuthRequired() {
    return applyDecorators(
        ApiBearerAuth(SWAGGER_ACCESS_TOKEN_KEY),
        ApiBearerAuth(),
    );
}

export const User = createParamDecorator(
    async (data: keyof AuthInfo, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const auth: AuthInfo = request.user;
        return data ? auth?.[data] : auth;
    },
);
