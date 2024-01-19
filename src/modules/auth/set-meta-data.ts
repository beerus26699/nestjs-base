import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { AuthInfo } from './interfaces/auth.interface';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Auth = createParamDecorator(async (data: any, ctx: any) => {
    ctx.switchToHttp();
    const request = ctx.getRequest();
    const auth: AuthInfo = request.user;
    return auth;
});
