import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: 1 })
  priority: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Types, HydratedDocument } from 'mongoose';

// export type TaskDocument = HydratedDocument<Task>;

// @Schema()
// export class Task {
//     @Prop({ type: Types.ObjectId, required: true })
//     _id: Types.ObjectId;

//     @Prop({ required: true })
//     name: string;

//     @Prop({ required: true })
//     priority: string;

//     @Prop()
//     user_id: string;
// }

// export const TaskSchema = SchemaFactory.createForClass(Task);
