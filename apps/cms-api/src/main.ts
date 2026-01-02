import { NestFactory } from '@nestjs/core';
import { CmsApiModule } from './cms-api.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(CmsApiModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('app.port');

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    )
        .setGlobalPrefix('cms')
        .enableCors();
    await app.listen(port);
    console.log(`Server is running on port ${port}`);
}
bootstrap();
