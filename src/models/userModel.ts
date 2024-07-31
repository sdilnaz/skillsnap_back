// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ILesson {
  lessonId: string;
  status: 'completed' | 'current' | 'uncompleted';
  images: IUploadedImage[];
}

interface IUploadedImage {
  url: string;
  evaluation: any; 
}

interface IUser extends Document {
  clerkId: string;
  lessons: ILesson[];
  uploadedImages: IUploadedImage[];
}

const UploadedImageSchema: Schema = new Schema({
    url: { type: String, required: true },
    evaluation: { type: Schema.Types.Mixed }
  });

  
const LessonSchema: Schema = new Schema({
  lessonId: { type: String, required: true },
  status: { type: String, enum: ['completed', 'current', 'uncompleted'], required: true },
  images: { type: [UploadedImageSchema], default: [] }
});


const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  lessons: { type: [LessonSchema], default: [] },
  uploadedImages: { type: [UploadedImageSchema], default: [] }
});

export const User = mongoose.model<IUser>('User', UserSchema);
