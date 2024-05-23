import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongooseUniqueValidator from 'mongoose-unique-validator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongooseUniqueValidator);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Types, HydratedDocument } from 'mongoose';
// import { Task } from './task.schema';

// export type UserDocument = HydratedDocument<User>;

// @Schema()
// export class User {
//     @Prop({ type: Types.ObjectId, required: true })
//     _id: Types.ObjectId;

//     @Prop({ required: true })
//     email: string;

//     @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
//     tasks: Task[];
// }

// export const UserSchema = SchemaFactory.createForClass(User);
