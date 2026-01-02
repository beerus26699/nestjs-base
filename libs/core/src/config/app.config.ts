import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    port: process.env.APP_PORT,
    secretKey: process.env.APP_SECRET_KEY,
    frontendUrl: process.env.APP_FRONTEND_URL || 'http://localhost:3001',
}));