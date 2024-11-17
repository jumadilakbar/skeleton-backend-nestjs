import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class LoginResponse {
  constructor(
    public token: string,
    public type: string,
    public user: { username: string },
  ) {}
}
