import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { RedisConfig } from './redis.type';
import { REDIS_CONFIG } from './redis.constant';

export interface DynamicModuleAsyncOptions<T> {
  useFactory: (...args: any[]) => Promise<T> | T;
  inject: any[];
}

@Global()
@Module({
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {
  static forRootAsync(
    asyncOptions: DynamicModuleAsyncOptions<RedisConfig>,
  ): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_CONFIG,
          useFactory: asyncOptions.useFactory,
          inject: asyncOptions.inject,
        },
        RedisProvider,
      ],
      exports: [RedisProvider],
    };
  }
}
