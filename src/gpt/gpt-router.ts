// backend/src/gpt/gpt-router.ts
import { Router, Request, Response } from 'express';
import GptService from './gpt-service';
import { User } from '../models/userModel';

const gptRouter = Router();
const gptService = new GptService();

gptRouter.post('/evaluate', async (req: Request, res: Response) => {
    const { imageUrl } = req.body; 

    try {
        if (!imageUrl) {
            return res.status(400).json({ error: 'imageUrl is required' });
        }

        const evaluation = await gptService.evaluateImage(imageUrl);
        console.log('OpenAI API response:', JSON.parse(evaluation));
        res.status(200).json(JSON.parse(evaluation));
    } catch (error) {
        console.error('Error evaluating image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




gptRouter.post('/generate-lesson', async (req: Request, res: Response) => {
    const { title, userId } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const generatedLesson = await gptService.generateLesson(title, userId);
        console.log('Generated photography lesson:', generatedLesson);
        
        res.status(200).json(generatedLesson);
    } catch (error) {
        console.error('Error generating photography lesson:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default gptRouter;
