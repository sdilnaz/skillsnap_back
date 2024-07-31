// src/utils/initializeUser.ts
import { User } from '../models/userModel';
import Lesson from '../models/lessonsModel';

const initializeUser = async (clerkId: string) => {
  try {
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return existingUser;
    }

   
    const levels = await Lesson.find();
    const allLessons: { lessonId: string; status: 'completed' | 'current' | 'uncompleted'; images: { url: string; evaluation: any }[] }[] = [];

    
    levels.forEach((level, index1) => {
      level.sublevels.forEach((sublevel,index2) => {
        sublevel.lessons.forEach((lesson, index3) => {
          allLessons.push({
            lessonId: lesson._id.toString(),
            status: index2 === 0 && index1 === 0 && index3 === 0 ? 'current' : 'uncompleted',
            images: []
          });
        });
      });
    });

    
    const newUser = new User({
      clerkId,
      lessons: allLessons,
      uploadedImages: []
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error initializing user:', error);
    throw new Error('Initialization failed');
  }
};

export default initializeUser;
