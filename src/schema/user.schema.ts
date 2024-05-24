import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongooseUniqueValidator from 'mongoose-unique-validator';

export type UserDocument = HydratedDocument<UserModel>;

@Schema()
export class UserModel {
    @Prop({ required: true, unique: true })
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.plugin(mongooseUniqueValidator);
