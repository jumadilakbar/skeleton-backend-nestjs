import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getWelcomeMessage(): string {
    return 'Selamat datang di aplikasi super keren ini!';
  }

}
