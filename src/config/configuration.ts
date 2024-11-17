import { AppConfig, configureApp } from './app';
import { DBConfig, configureDB } from './db';
import { configureRedis, RedisConfig } from './redis';

interface Config {
  app: AppConfig;
  db: DBConfig;
  redis: RedisConfig;
}

export default (): Config => ({
  app: configureApp(),
  db: configureDB(),
  redis: configureRedis(),
});
