import { registerAs } from "@nestjs/config";

export default registerAs('cache', () => ({
    port: process.env.APP_PORT,
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    }
}));