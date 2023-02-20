import { IsNotEmpty } from 'class-validator';

export class CreateUserProfileDto {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
}
