import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../validation/validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      await this.userService.addUser(email);
      console.log(email)
      return {
        status: HttpStatus.CREATED,
        message: 'User has been created',
      };
    } catch (error) {
      console.log(error)
      if (error.message === 'User already exists') {
        console.log(HttpStatus.CONFLICT)
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'User already exists',
          },
          HttpStatus.CONFLICT,
        );
      } else {
        console.log(HttpStatus.BAD_REQUEST)
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'User could not be created',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}