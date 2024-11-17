import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import Config from './config/configuration';
// import * as morgan from morgan;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({logger: true}),
  );
  app.enableCors();

  const config = Config();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.app.port, config.app.host);
  Logger.debug(`server runnning at port ${config.app.port}`)
}
bootstrap();
