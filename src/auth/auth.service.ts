import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';
import { responseMessages, successResponse } from 'src/helpers/api-response';
import { RegisterRequest, RegisterResponse } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cacheService: RedisCacheService,
  ) {}

  public async login(input: LoginRequest) {
    const { username, password } = input;
    const user = await this.userService.findByUsername(username);

    if (!user) {
      const error = Error('invalid credentials');
      error.name = 'INVALID_CREDENTIALS';
      throw error;
    }

    const isMatch = bcrypt.compareSync(password, bcrypt.hashSync(password, 12));
    if (!isMatch) {
      const error = Error('invalid credentials');
      error.name = 'INVALID_CREDENTIALS';
      throw error;
    }

    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    await this.cacheService.set(`token:${token}`, user.id + '');

    return successResponse({
      code: 200,
      message: responseMessages.success,
      data: new LoginResponse(token, 'Bearer', {
        username: user.username,
      }),
    });
  }

  public async register(input: RegisterRequest) {
    const { username, password } = input;

    const user = await this.userService.findByUsername(username);

    if (user) {
      const error = Error('user already exist');
      error.name = 'USER_ALREADY_EXIST';
      throw error;
    }
    const newUser = await this.userService.create({ username, password });
    const payload = { sub: newUser.data.id };
    const token = this.jwtService.sign(payload);
    await this.cacheService.set(`token:${token}`, newUser.data.id + '');

    return successResponse({
      code: 200,
      message: responseMessages.success,
      data: new RegisterResponse(token, 'Bearer', {
        username: newUser.data.username,
      }),
    });
  }

  public async checkUserLoggedIn(token) {
    const isLoggedIn = await this.cacheService.get(`token:${token}`);

    if (!isLoggedIn) {
      const error = Error('User Forbidden');
      error.name = 'USER_FORBIDDEN';
      throw error;
    }
    const decode = this.jwtService.verify(token, token);
    const user = await this.userService.findOne(decode.sub);
    return successResponse({
      code: 200,
      message: responseMessages.success,
      data: {
        user: {
          username: user.data.username,
        },
      },
    });
  }

  public async logout(token) {
    const isLoggedIn = await this.cacheService.get(`token:${token}`);

    if (!isLoggedIn) {
      const error = Error('User Forbidden');
      error.name = 'USER_FORBIDDEN';
      throw error;
    }
    await this.cacheService.del(`token:${token}`);

    return successResponse({
      code: 200,
      message: responseMessages.success,
      data: '',
    });
  }
}
