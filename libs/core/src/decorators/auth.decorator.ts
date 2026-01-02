import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthInfo } from '../types/auth.interface';

export const User = createParamDecorator(
    async (data: keyof AuthInfo, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const auth: AuthInfo = request.user;
        return data ? auth?.[data] : auth;
    },
);
