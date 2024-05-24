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
import { InjectModel } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ValidationPipe } from '../validation/validation.pipe';
import { TaskModel } from '../schema/task.schema';
import { UserModel, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';

@Controller()
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    ) {}

    @Get('user/:userId')
    async getUserTasks(
        @Param('userId') userId: string,
        @Res() res,
    ): Promise<TaskModel[]> {
        try {
            await this.userModel.findById(userId).exec();
            const response = await this.taskService.getUserTasks(userId);

            const task = this.idInsteadOf_Id(response);
            return res.status(HttpStatus.OK).json(task);
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
    async addTask(
        @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
        @Res() res,
    ): Promise<TaskModel> {
        try {
            const { name, userId, priority } = createTaskDto;

            if (!userId) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'UserId is not valid',
                });
                return;
            }
            const priorityInt = +priority;
            const task = await this.taskService.addTask(
                name,
                userId,
                priorityInt,
            );
            res.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                message: 'Task has been created',
                task: {
                    name: task.name,
                    userId: task.userId,
                    priority: task.priority,
                },
            });
            return task;
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

    private idInsteadOf_Id(tasks) {
        return tasks.map(
            ({ _id: id, name, userId: user_id, priority, __v }) => ({
                id,
                name,
                user_id,
                priority,
                __v,
            }),
        );
    }
}
