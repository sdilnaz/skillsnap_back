import GptService from './gpt-service';
import { Request, Response } from 'express';

class GptController {
  private gptService: GptService;

  constructor(gptService: GptService) {
    this.gptService = gptService;
  }

  getEvaluation = async (req: Request, res: Response) => {
    const { filePath } = req.body;
    try {
      const response = await this.gptService.evaluateImage(filePath);
      console.log('OpenAI API response:', JSON.parse(response));
      res.status(201).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default GptController;
