import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<TaskModel>;

@Schema()
export class TaskModel {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'UserModel' })
    userId: { type: Types.ObjectId; ref: 'UserModel' };

    @Prop({ required: true })
    priority: number;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
