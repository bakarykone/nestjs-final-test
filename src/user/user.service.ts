import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async addUser(email: string): Promise<User> {
        const user = await this.userModel.create({ email });
        return user;
    }

    async getUser(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        return user;
    }

    async resetData(): Promise<void> {
        await this.userModel.deleteMany({});
    }
    // Ajoutez les autres méthodes du service nécessaires ici
}

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from '../schema/user.schema';

// @Injectable()
// export class UserService {
//     constructor(
//         @InjectModel(User.name) private userModel: Model<UserDocument>,
//     ) {}

//     async addUser(email: string): Promise<User> {
//         const createdUser = new this.userModel({ email });
//         return createdUser.save();
//     }

//     async getUser(email: string): Promise<User> {
//         return this.userModel.findOne({ email }).exec();
//     }

//     async resetData(): Promise<void> {
//         await this.userModel.deleteMany({});
//     }
// }
