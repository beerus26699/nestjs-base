import { Provider } from '@nestjs/common';
import * as IORedis from 'ioredis';
import { Redis } from 'ioredis';

import { REDIS_CONFIG } from './redis.constant';
import { RedisConfig } from './redis.type';

export const REDIS_CLIENT = Symbol('IORedis.Redis');

export const RedisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: (redisConfig: RedisConfig): Redis => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new IORedis(redisConfig);
  },
  inject: [REDIS_CONFIG],
};
