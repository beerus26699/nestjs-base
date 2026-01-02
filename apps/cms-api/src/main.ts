import { NestFactory } from '@nestjs/core';
import { CmsApiModule } from './cms-api.module';

async function bootstrap() {
  const app = await NestFactory.create(CmsApiModule);
  await app.listen(3000);
}
bootstrap();
