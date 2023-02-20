import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  username: string;
  password: string;
}
