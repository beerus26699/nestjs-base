import { Global, Module } from '@nestjs/common';
import { LoggerFactoryService } from './logger-factory.service';

@Global()
@Module({
  providers: [LoggerFactoryService],
  exports: [LoggerFactoryService]
})
export class LoggerFactoryModule {}
