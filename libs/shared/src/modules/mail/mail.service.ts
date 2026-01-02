import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('mail.host'),
            port: this.configService.get('mail.port'),
            secure: false,
            auth: {
                user: this.configService.get('mail.user'),
                pass: this.configService.get('mail.password'),
            },
        });
    }

    async sendActivationEmail(email: string, activationToken: string): Promise<void> {
        const frontendUrl = this.configService.get('app.frontendUrl');
        const activationLink = `${frontendUrl}/activate?token=${activationToken}`;

        await this.transporter.sendMail({
            from: this.configService.get('mail.from'),
            to: email,
            subject: 'Xác nhận đăng ký tài khoản',
            html: `
                <h1>Xác nhận đăng ký tài khoản</h1>
                <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng click vào link bên dưới để kích hoạt tài khoản của bạn:</p>
                <a href="${activationLink}">Kích hoạt tài khoản</a>
                <p>Hoặc copy và paste link sau vào trình duyệt:</p>
                <p>${activationLink}</p>
                <p>Link này sẽ hết hạn sau 24 giờ.</p>
            `,
        });
    }
}
