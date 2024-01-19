import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerModule,
} from '@nestjs/swagger';
import { SWAGGER_ACCESS_TOKEN_KEY } from './shared/constants/app.constant';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('app.port');

    app.setGlobalPrefix('api').enableCors();

    const config = new DocumentBuilder()
        .setTitle('HT Core')
        .setDescription('HT Core API')
        .setVersion('1.0')
        .addBearerAuth(
            {
                description: `Please enter token in following format: Bearer <JWT>`,
                name: 'Authorization',
                scheme: 'Bearer',
                type: 'http',
                in: 'Header',
            },
            SWAGGER_ACCESS_TOKEN_KEY,
        )
        .build();

    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
    };

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, customOptions);

    await app.listen(port);
}
bootstrap();
