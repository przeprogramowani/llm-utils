import type { APIRoute } from 'astro';
import OpenAI from 'openai';
import { SUMMARIZE_ARTICLE_MESSAGES } from '@/features/storytelling/storytelling-prompts';

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

    const response = await client.chat.completions.create({
      model: modelName,
      stream: false,
      messages: SUMMARIZE_ARTICLE_MESSAGES(inputText),
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
