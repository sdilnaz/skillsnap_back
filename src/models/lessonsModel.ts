//models/lessonsModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IExample extends Document {
  description: string;
  imageUrl: string;
}

interface ITask extends Document {
  taskNumber: number;
  description: string;
  maxPhotos: number;
}

interface ILesson extends Document {
  lessonNumber: number;
  title: string;
  content: string;
  examples: IExample[];
  tasks: ITask[];
}

interface ISublevel extends Document {
  title: string;
  lessons: ILesson[];
  tasks: ITask[];
}

interface ILevel extends Document {
  level: string;
  sublevels: ISublevel[];
}

const exampleSchema = new Schema<IExample>({
  description: String,
  imageUrl: String
});

const taskSchema = new Schema<ITask>({
  taskNumber: Number,
  description: String,
  maxPhotos: Number
});

const lessonSchema = new Schema<ILesson>({
  lessonNumber: Number,
  title: String,
  content: String,
  examples: [exampleSchema],
  tasks: [taskSchema]
});

const sublevelSchema = new Schema<ISublevel>({
  title: String,
  lessons: [lessonSchema],
  tasks: [taskSchema]
});

const levelSchema = new Schema<ILevel>({
  level: String,
  sublevels: [sublevelSchema]
});

const Lesson = mongoose.models.Lesson || mongoose.model<ILevel>('Lesson', levelSchema);

export default Lesson;
