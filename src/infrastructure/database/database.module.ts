import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../../schema/user.schema';
import { DATABASE_URL } from '../configuration/model/database-configuration';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb://127.0.0.1:24000/nestjs-final-test-db',
        ),
        MongooseModule.forFeature([
            { name: UserModel.name, schema: UserSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
