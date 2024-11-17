import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/app';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<AppConfig>('app').secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
