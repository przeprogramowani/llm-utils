import type { APIRoute } from 'astro';
import OpenAI from 'openai';
import {
  STORYTELLING_BASE_MESSAGES,
  STORYTELLING_PROMPT,
} from '@/features/storytelling/storytelling-prompts';

export const prerender = false;

interface RequestBody {
  modelName: string;
  inputText: string;
  apiKey: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { inputText, apiKey, modelName }: RequestBody = await request.json();

    const client = new OpenAI({
      apiKey,
    });

    const storytellingMessages = STORYTELLING_BASE_MESSAGES(inputText);

    const keyQuestionsResponse = await client.chat.completions.create({
      model: modelName,
      stream: false,
      messages: storytellingMessages,
    });

    const result = keyQuestionsResponse.choices[0].message.content;

    storytellingMessages.push({
      role: 'assistant',
      content: result,
    });

    storytellingMessages.push({
      role: 'user',
      content: STORYTELLING_PROMPT,
    });

    const response = await client.chat.completions.create({
      model: modelName,
      stream: false,
      messages: storytellingMessages,
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in summarize-article:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your request.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
