export class RedisConfig {
  host: string;
  port: number;
}

export const configureRedis = (): RedisConfig => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
});
