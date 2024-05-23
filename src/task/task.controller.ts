import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ValidationPipe } from '../validation/validation.pipe';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('user/:userId')
  async getUserTasks(@Param('userId') userId: string) {
    try {
      const tasks = await this.taskService.getUserTasks(userId);
      return {
        status: HttpStatus.OK,
        tasks,
      };
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
  async create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    try {
      const { name, userId, priority } = createTaskDto;
      await this.taskService.addTask(name, userId, priority);
      return {
        status: HttpStatus.CREATED,
        message: 'Task has been created',
      };
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
