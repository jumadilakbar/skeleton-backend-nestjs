import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.dto';
import { RegisterRequest } from './dto/register.dto';
import { JWT } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(@Body() input: LoginRequest): Promise<any> {
    try {
      const response = await this.authService.login(input);
      return response;
    } catch (error) {
      if (error.name === 'INVALID_CREDENTIALS') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw error;
    }
  }

  @Post('register')
  public async register(@Body() input: RegisterRequest): Promise<any> {
    try {
      const response = await this.authService.register(input);
      return response;
    } catch (error) {
      if (error.name === 'USER_ALREADY_EXIST') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      throw error;
    }
  }

  @UseGuards(JWT)
  @Get('me')
  public async me(@Req() req) {
    const token =
      typeof req.headers.authorization == 'string' &&
      req.headers.authorization.split(' ')[1];

    const response = await this.authService.checkUserLoggedIn(token);

    return response;
  }

  @UseGuards(JWT)
  @Post('logout')
  public async logout(@Req() req) {
    const token =
      typeof req.headers.authorization == 'string' &&
      req.headers.authorization.split(' ')[1];

    const response = await this.authService.logout(token);

    return response;
  }
}
