import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    UseGuards,
    Req,
    Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { Public } from './set-meta-data';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
    ActivateEmailDto,
    ResendActivationDto,
} from './dto/activate-email.dto';
import { ExchangeCodeDto } from './dto/exchange-code.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { User } from '@app/core/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {}

    @Public()
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Public()
    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Public()
    @Get('activate')
    activateEmail(@Query() dto: ActivateEmailDto) {
        return this.authService.activateEmail(dto.token);
    }

    @Public()
    @Post('resend-activation')
    resendActivation(@Body() dto: ResendActivationDto) {
        return this.authService.resendActivationEmail(dto.email);
    }

    @Public()
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    googleAuth() {
        // Guard sẽ redirect đến Google
    }

    @Public()
    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        const result = await this.authService.googleLogin(req.user as any);
        const frontendUrl = this.configService.get<string>('app.frontendUrl');

        // Tạo exchange code và redirect về frontend
        const exchangeCode =
            await this.authService.generateExchangeCode(result);

        res.redirect(`${frontendUrl}?code=${exchangeCode}`);
    }

    @Public()
    @Post('exchange')
    exchangeCode(@Body() dto: ExchangeCodeDto) {
        return this.authService.exchangeCodeForToken(dto.code);
    }

    @Get('me')
    @ApiOperation({ summary: 'Get current user info from JWT' })
    getMe(@User('userId') userId: number) {
        return this.authService.getMe(userId);
    }
}
