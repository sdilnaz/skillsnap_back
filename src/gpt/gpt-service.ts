
import openai from './openai';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';
import { lessonPrompt, systemPromptJsonExample } from './gpt-types';
import Lesson from '../models/lessonsModel';
import GeneratedLesson from '../models/generatedLessonModel';

const systemPrompt = `
Вы профессиональный фотограф. 
Оцените изображение на основе композиции, освещения, экспозиции, расположения объектов и соблюдения правила третей.
Вы получите изображение, сделанное пользователем.
Определите сильные стороны фотографии и области, требующие улучшения.
Предоставьте конструктивную обратную связь о том, как фотограф может улучшить изображение.
Убедитесь, что ваш анализ подробный и включает конкретные предложения по улучшению в каждой категории.
Не описывайте, что изображено на фотографии, дайте конструктивную обратную связь. 
Provide the feedback in russian in JSON format with categories "composition", "lighting", "exposure", "placement_of_objects", "rule_of_thirds", "strong sides of photo", "suggestion to improve".
Highlight the most importnt parts. For each categorie put score from 0 to 100. Without any delimeters such as commas or quotes return JSON format (also do not print in your response \n's)
The JSON format should be as follows:
${systemPromptJsonExample}
`;



class GptService {
    async evaluateImage(imageUrl: string) {
        try {
            console.log('Attempting to evaluate image');

            const base64Image = await this.convertImageUrlToBase64(imageUrl);
            let imageDataUrl = `data:image/jpeg;base64,${base64Image}`;
            
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                response_format: {
                  type: 'json_object'
                },
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt,
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: "text",
                                text: "Analyze the following image:"
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imageDataUrl
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 3000
            });
            if (!response || !response.choices || !response.choices[0].message || !response.choices[0].message.content) {
                throw new Error('Invalid response format from OpenAI');
            }

            const resJson: string = response.choices[0].message.content;
            
            return resJson;
        } catch (error: any) {
            console.error('Error evaluating image:', error.message);
            throw new Error('Failed to evaluate image using OpenAI');
        }
    }

    private async convertImageUrlToBase64(imageUrl: string): Promise<string> {
        try {
            const response = await fetch(imageUrl);
            const buffer = await response.buffer();
            return buffer.toString('base64');
        } catch (error) {
            console.error('Error fetching image from URL:', error);
            throw new Error('Failed to fetch image from URL');
        }
    }


    private async getAllLessonTitles(): Promise<string[]> {
        
        return [
            "Основаныйе Настройки Камеры: Диафрагма, Выдержка, ISO, Баланс белого",
            "Композиция: Правило третей , ведущие линии, симметрия и паттерны, обрамление ,фон, Спираль фибоначчи",
            "Техники фокусировки: Ручная фокусировка vs автофокус, режимы фокусировки и точки фокусировки",
            "Движение в фотографии: замораживание движения",
           
        ];
    }

    private generateSystemPromptWithLessons(lessons: string[]): string {
        const lessonTitlesString = lessons.map((title) => `"${title}"`).join(', ');
        console.log(lessonTitlesString)
        return `
            You are a professional photographer.
            User requests a lesson titled: [TITLE].
            
            Lessons we already have: ${lessonTitlesString}.
            Generate a photography lesson . The lesson should provide comprehensive guidance on given topic, 
            covering key concepts, techniques, and practical tips.
            Generate only those lessons that are related to photography. If user requests something not related to photography , 
            return "please enter valid topic"
            
            Ensure the lesson is structured logically, starting with fundamental concepts and progressing to more advanced topics. 
            Provide clear explanations, step-by-step instructions, and 
            practical exercises to reinforce learning and skill development. Aim to inspire creativity and encourage exploration 
            in given topic through real-world applications and expert insights.
            Whole lesson except title and tasks, should be in 'content' part 
           return JSON format 
            indicate bold text with '###', do not use '**'
            indicate new linel with \n

            Change title (if needed) to make it more readable. If it is too long or does not represent topic shortly, replace it with name that suits the most. 
           The JSON format should be as follows:
            ${lessonPrompt}

        `;
    }


    async generateLesson(lessonTitle: string, userId: string) {
        try {
            const existingLessons = await this.getAllLessonTitles();
            const systemPromptWithLessons = this.generateSystemPromptWithLessons(existingLessons);

            const response = await openai.chat.completions.create({
                model: 'gpt-4o', 
                response_format: {
                    type: 'json_object'
                },
                messages: [
                    {
                        role: 'system',
                        content: systemPromptWithLessons,
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: "text",
                                text: `Create a lesson titled: ${lessonTitle}`
                            }
                        ]
                    }
                ],
                max_tokens: 1500
            });

            if (!response || !response.choices || !response.choices[0].message || !response.choices[0].message.content) {
                throw new Error('Invalid response format from OpenAI');
            }

            // const resJson: string = response.choices[0].message.content;
            // console.log(resJson)
            // return resJson;

            const resJson: string = response.choices[0].message.content;

            if (resJson.includes("please enter valid topic")) {
                console.log('Invalid topic');
                throw new Error('Invalid topic');
                
            }


            const lessonData = JSON.parse(resJson);
            lessonData.userId = userId;
            
            const newLesson = new GeneratedLesson(lessonData);
            await newLesson.save();
            
            console.log('Generated lesson saved to database:', newLesson);
            return newLesson;
        } catch (error: any) {
            console.error('Error generating lesson:', error.message);
            if (error.message === 'Invalid topic') {
                throw new Error('Invalid topic. Please enter a valid photography-related topic.');
            }
            throw new Error('Failed to generate lesson using OpenAI');
        }
    }
}

export default GptService;
