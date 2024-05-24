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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ValidationPipe } from '../validation/validation.pipe';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string, @Res() res) {
      try {
        if (!userId) {
          res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            error: 'UserId is not valid',
          });
          return;
        }
        const tasks = await this.taskService.getUserTasks(userId);
        res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          tasks,
        });
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Tasks could not be retrieved',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    @Post()
    async create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto, @Res() res) {
      try {
        const { name, userId, priority } = createTaskDto;
        if (!userId) {
          res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            error: 'UserId is not valid',
          });
          return;
        }
        const task = await this.taskService.addTask(name, userId, priority);
        res.status(HttpStatus.CREATED).json({
          status: HttpStatus.CREATED,
          message: 'Task has been created',
          task,
        });
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Task could not be created',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
}
// import { Controller } from '@nestjs/common';

// @Controller()
// export class TaskController {
//     constructor() {}
// }
