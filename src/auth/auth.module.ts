import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { JWTStrategy } from './jwt.strategy';
import { RedisCacheModule } from 'src/redis-cache/redis-cache.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (): Promise<JwtModuleOptions> => {
        const config = configuration().app;
        return {
          secret: config.secret,
          signOptions: { expiresIn: '3h' },
        };
      },
    }),
    RedisCacheModule,
  ],
  providers: [AuthService, UserService, JWTStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
