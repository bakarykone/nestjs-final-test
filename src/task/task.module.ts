import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskModel, TaskSchema } from '../schema/task.schema';
import { UserModel, UserSchema } from '../schema/user.schema';
import { UserService } from '../user/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TaskModel.name, schema: TaskSchema },
        ]),
        MongooseModule.forFeature([
            { name: UserModel.name, schema: UserSchema },
        ]),
    ],
    controllers: [TaskController],
    providers: [TaskService, UserService],
    exports: [TaskService],
})
export class TaskModule {}
