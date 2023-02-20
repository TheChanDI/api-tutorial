import { IsNotEmpty, isNumber, IsString, isString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
