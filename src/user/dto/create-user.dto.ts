import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

// export class createUserDto {
//     readonly email: string;
//     readonly tasks: [];
// }