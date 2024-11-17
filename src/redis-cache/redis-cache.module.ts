import { Module, CacheModule, CacheModuleOptions } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisConfig } from 'src/config/redis';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<CacheModuleOptions> => {
        const config = configService.get<RedisConfig>('redis');
        return {
          store: redisStore,
          host: config.host,
          port: config.port,
          ttl: 1 * 60 * 60, // 1 hour
        };
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
