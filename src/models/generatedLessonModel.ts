//models/generatedLessonModel.ts
import mongoose, { Schema, Document } from 'mongoose';

// interface IExample extends Document {
//   description: string;
//   imageUrl: string;
// }

interface ITask extends Document {
  taskNumber: number;
  description: string;
  maxPhotos: number;
}

export interface ILesson extends Document {
  lessonNumber: number;
  userId: string;
  title: string;
  content: string;
//   examples: IExample[];
  tasks: ITask[];
}


const taskSchema = new Schema<ITask>({
  taskNumber: Number,
  description: String,
  maxPhotos: Number
});

const lessonSchema = new Schema<ILesson>({
  userId: { type: String, required: true },
  lessonNumber: Number,
  title: String,
  content: String,
//   examples: [exampleSchema],
  tasks: [taskSchema]
});



const GeneratedLesson = mongoose.model<ILesson>('GeneratedLesson', lessonSchema);

export default GeneratedLesson;
