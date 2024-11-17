import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        const config = configuration().db;
        return {
          ...config,
          type: 'postgres',
          logging: false,
          synchronize: process.env.NODE_ENV !== 'production',
          entities: ['dist/**/*.entity{.ts,.js}'],
        };
      },
    }),
    ProductModule,
    UserModule,
    AuthModule,
    PublicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
