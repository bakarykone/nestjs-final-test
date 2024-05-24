import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../validation/validation.pipe';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
        @Res() res,
    ) {
        try {
            const { email } = createUserDto;
            await this.userService.addUser(email);
            res.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                message: 'User has been created',
            });
        } catch (error) {
            if (error.message === 'User already exists') {
                res.status(HttpStatus.CONFLICT).json({
                    status: HttpStatus.CONFLICT,
                    error: 'User already exists',
                });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'User could not be created',
                });
            }
        }
    }
    /*
    @Get()
    async getUserTasks() {
        try {
            const users = await this.userService.getUsers();
            return {
                status: HttpStatus.CREATED,
                users,
            };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'User could not be retrieved',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    */
}
