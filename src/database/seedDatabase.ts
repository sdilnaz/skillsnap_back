//run -->     ts-node src/database/seedDatabase.ts   -->to update lessons db 


import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Lesson from '../models/lessonsModel'; 
import connectToMongoDB from './connect'; 


const jsonFilePath = path.resolve(__dirname, '../data/lessons.json');
const lessonsData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));


const seedDatabase = async () => {
  try {
    await connectToMongoDB(); 
    await Lesson.deleteMany(); 
    console.log("All lessons deleted")
    await Lesson.insertMany(lessonsData); 
    console.log('Lessons inserted successfully');
  } catch (error) {
    console.error('Error inserting lessons:', error);
  } finally {
    mongoose.connection.close(); // Close connection
  }
};

seedDatabase();
