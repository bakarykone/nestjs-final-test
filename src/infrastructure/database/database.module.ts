import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schema/user.schema';
import { DATABASE_URL } from '../configuration/model/database-configuration';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:24000/nestjs-final-test-db'), 
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      exports: [MongooseModule],
})
export class DatabaseModule {}
