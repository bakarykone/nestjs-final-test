import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskModel, TaskDocument } from '../schema/task.schema';
import { UserModel, UserDocument } from '../schema/user.schema';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(TaskModel.name) private taskModel: Model<TaskDocument>,
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    ) {}

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<TaskModel> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new Error('User not found');
        }
        const task = await this.taskModel.create({ name, userId, priority });
        return task;
    }

    async getTaskByName(name: string): Promise<TaskModel> {
        const task = await this.taskModel.findOne({ name }).exec();
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    }

    async getUserTasks(userId: string): Promise<TaskModel[]> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new Error('User not found');
        }
        const tasks = await this.taskModel.find({ userId }).exec();
        return tasks;
    }

    async resetData(): Promise<void> {
        await this.taskModel.deleteMany({});
    }
}
