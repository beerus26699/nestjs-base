import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

const KEY_PREFIX = 'auth:';
const DEFAULT_CACHE_TTL = 7200; // 2 hours in seconds

@Injectable()
export class RedisService implements OnModuleDestroy {
    private client: Redis;

    constructor(private configService: ConfigService) {
        this.client = new Redis({
            host: this.configService.get<string>('redis.host'),
            port: this.configService.get<number>('redis.port'),
            password: this.configService.get<string>('redis.password'),
            db: this.configService.get<number>('redis.db'),
        });
        this.client.on('connect', () => {
            console.log(`✅ Redis connected`);
        });

        this.client.on('error', (err) => {
            console.error('❌ Redis connection error:', err);
        });
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    private buildKey(key: string): string {
        return `${KEY_PREFIX}${key}`;
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        const fullKey = this.buildKey(key);
        if (ttlSeconds) {
            await this.client.set(fullKey, value, 'EX', ttlSeconds);
        } else {
            await this.client.set(fullKey, value);
        }
    }

    async get(key: string): Promise<string | null> {
        const fullKey = this.buildKey(key);
        return this.client.get(fullKey);
    }

    async del(key: string): Promise<void> {
        const fullKey = this.buildKey(key);
        await this.client.del(fullKey);
    }

    async getOrSet<T>(
        key: string,
        callback: () => Promise<T> | T,
        options?: { ttl?: number }, // ttl in seconds, default: 2 hours
    ): Promise<T> {
        const fullKey = this.buildKey(key);

        // Try to get from cache first
        const cached = await this.client.get(fullKey);

        if (cached !== null) {
            try {
                return JSON.parse(cached) as T;
            } catch {
                // If parse fails, return as-is (for primitive types stored as strings)
                return cached as unknown as T;
            }
        }

        // Cache miss - execute callback
        const value = await Promise.resolve(callback());

        // Serialize value for storage
        const serialized = JSON.stringify(value);

        // Use SET NX (set if not exists) to avoid race conditions with default TTL
        const ttl = options?.ttl ?? DEFAULT_CACHE_TTL;
        await this.client.set(fullKey, serialized, 'EX', ttl, 'NX');

        return value;
    }
}
