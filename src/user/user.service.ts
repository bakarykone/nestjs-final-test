import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    ) {}

    async addUser(email: string): Promise<UserModel> {
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        const user = await this.userModel.create({ email });
        return user;
    }

    async getUser(email: string): Promise<UserModel> {
        const user = await this.userModel.findOne({ email }).exec();
        return user;
    }

    async getUserById(userId: string): Promise<UserModel> {
        return await this.userModel.findById(userId);
    }

    async getUsers(): Promise<UserModel[]> {
        const users = await this.userModel.find().exec();
        console.log(users);
        return users;
    }

    async resetData(): Promise<void> {
        await this.userModel.deleteMany({});
    }
}
