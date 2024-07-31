
// // import { Router, Request, Response } from 'express';
// // import connectToMongoDB from '../database/connect';
// // import Image from '../models/imageModel';

// // const imageRouter = Router();

// // imageRouter.post('/', async (req: Request, res: Response) => {
// //     const { imageUrl } = req.body;

// //     try {
// //         await connectToMongoDB();

// //         const newImage = new Image({ imageUrl });
// //         const result = await newImage.save();

// //         res.status(201).json({ message: 'Image URL saved', imageId: result._id });
// //     } catch (error: any) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // export default imageRouter;
// import { Router, Request, Response } from 'express';
// import connectToMongoDB from '../database/connect';
// import Image from '../models/imageModel';
// import { User } from '../models/userModel';

// const imageRouter = Router();

// imageRouter.post('/', async (req: Request, res: Response) => {
//     const { imageUrl, userId, lessonId } = req.body;

//     try {
//         await connectToMongoDB();
    

//         if (!userId) {
           
//             const newImage = new Image({ imageUrl });
//             const result = await newImage.save();
//             return res.status(201).json({ message: 'Image URL saved', imageId: result._id });
//         }

//         const user = await User.findOne({ clerkId: userId });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const uploadedImage = { url: imageUrl, evaluation: null };

//         if (!lessonId) {
            
//             user.uploadedImages.push(uploadedImage);
//             console.log("image uploaded into uploadImages")
//         } else {
          
//             const lesson = user.lessons.find(lesson => lesson.lessonId === lessonId);
//             if (lesson) {
//                 lesson.images.push(uploadedImage);
//                 console.log("image uploaded by lessonId")
//             } else {
//                 return res.status(404).json({ error: 'Lesson not found' });
//             }
//         }

//         await user.save();
//         res.status(201).json({ message: 'Image URL saved for user' });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });


// // DELETE request to remove an image with its evaluation
// imageRouter.delete('/', async (req: Request, res: Response) => {
//     const { userId, imageUrl, lessonId } = req.body;

//     try {
//         await connectToMongoDB();

//         // Find the user by clerkId (userId)
//         const user = await User.findOne({ clerkId: userId });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         if (!lessonId) {
//             // Remove image from user's uploadedImages
//             user.uploadedImages = user.uploadedImages.filter(img => img.url !== imageUrl);
//             console.log("Image removed from uploadedImages");
//         } else {
//             // Remove image from specific lesson's images array
//             const lesson = user.lessons.find(lesson => lesson.lessonId === lessonId);
//             if (lesson) {
//                 lesson.images = lesson.images.filter(img => img.url !== imageUrl);
//                 console.log("Image removed from lesson's images");
//             } else {
//                 return res.status(404).json({ error: 'Lesson not found' });
//             }
//         }

//         await user.save();
//         res.status(200).json({ message: 'Image and evaluation removed' });
//     } catch (error: any) {
//         res.status(500).json({ error: error.message });
//     }
// });

// export default imageRouter;

import { Router, Request, Response } from 'express';
import connectToMongoDB from '../database/connect';
import Image from '../models/imageModel';
import { User } from '../models/userModel';
import GptService from '../gpt/gpt-service'; // Adjust the import based on your project structure

const imageRouter = Router();
const gptService = new GptService();


imageRouter.post('/', async (req: Request, res: Response) => {
    const { imageUrl, userId, lessonId } = req.body;

    try {
        await connectToMongoDB();

        // Get evaluation from GPT service
        const evaluation = await gptService.evaluateImage(imageUrl);
        const parsedEvaluation = JSON.parse(evaluation);
        console.log('OpenAI API response:', parsedEvaluation);

        const evaluatedImage = { url: imageUrl, evaluation: parsedEvaluation.evaluation };

        if (!userId) {
            // Save image directly if there's no userId
            const newImage = new Image({ url: imageUrl, evaluation: parsedEvaluation });
            const result = await newImage.save();
            return res.status(201).json({ message: 'Image URL and evaluation saved', imageId: result._id, evaluation: parsedEvaluation });
        }

        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!lessonId) {
            // Save image in user's uploadedImages
            user.uploadedImages.push(evaluatedImage);
            console.log("Image uploaded into uploadedImages");
        } else {
            // Save image in a specific lesson's images array
            const lesson = user.lessons.find(lesson => lesson.lessonId === lessonId);
            if (lesson) {
                lesson.images.push(evaluatedImage);
                console.log("Image uploaded by lessonId");
            } else {
                return res.status(404).json({ error: 'Lesson not found' });
            }
        }

        await user.save();
        res.status(201).json({ message: 'Image URL and evaluation saved for user', evaluation: parsedEvaluation });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE request to remove an image with its evaluation
imageRouter.delete('/', async (req: Request, res: Response) => {
    const { userId, imageUrl, lessonId } = req.body;

    try {
        await connectToMongoDB();

        // Find the user by clerkId (userId)
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!lessonId) {
            // Remove image from user's uploadedImages
            user.uploadedImages = user.uploadedImages.filter(img => img.url !== imageUrl);
            console.log("Image removed from uploadedImages");
        } else {
            // Remove image from specific lesson's images array
            const lesson = user.lessons.find(lesson => lesson.lessonId === lessonId);
            if (lesson) {
                lesson.images = lesson.images.filter(img => img.url !== imageUrl);
                console.log("Image removed from lesson's images");
            } else {
                return res.status(404).json({ error: 'Lesson not found' });
            }
        }

        await user.save();
        res.status(200).json({ message: 'Image and evaluation removed' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default imageRouter;
