import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schema/task.schema';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async addTask(name: string, userId: string, priority: number): Promise<Task> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    const task = await this.taskModel.create({ name, userId, priority });
    return task;
  }

  async getTaskByName(name: string): Promise<Task> {
    const task = await this.taskModel.findOne({ name }).exec();
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ userId }).exec();
    return tasks;
  }

  async resetData(): Promise<void> {
    await this.taskModel.deleteMany({});
  }
}


// import { Injectable, NotImplementedException } from '@nestjs/common';

// @Injectable()
// export class TaskService {
//     constructor() {}

//     addTask(name: string, userId: string, priority: number): Promise<void> {
//         throw new NotImplementedException();
//     }

//     getTaskByName(name: string): Promise<unknown> {
//         throw new NotImplementedException();
//     }

//     getUserTasks(userId: string): Promise<unknown[]> {
//         throw new NotImplementedException();
//     }

//     resetData(): Promise<void> {
//         throw new NotImplementedException();
//     }
// }
