// gpt-types.ts

export type EvaluationResult = {
  evaluation: string;
};

export const systemPromptJsonExample = `
{
  "evalution": {
    "composition": {
      "feedback": "",
      "suggestions_for_improvement": "",
      "score": 0
    },
    "lighting": {
      "feedback": "",
      "suggestions_for_improvement": "",
      "score": 0
    },
    "exposure": {
      "feedback": "",
      "suggestions_for_improvement": "",
      "score": 0
    },
    "placement_of_objects": {
      "feedback": "",
      "suggestions_for_improvement": "",
      "score": 0
    },
    "rule_of_thirds": {
      "feedback": "",
      "suggestions_for_improvement": "",
      "score": 0
    },
    "strong_sides_of_photo": {
      "feedback": ""
    },
    "suggestions_for_improvement": {
      "feedback": ""
    }
  }
}
`

export const lessonPrompt = `
{
  "title": "",
  "content": "",
  "tasks": [
    {
      "taskNumber": 1,
      "description": "",
      "maxPhotos": 
    },
    {
      "taskNumber": 2,
      "description": "",
      "maxPhotos": 
    }
  ]
}
`