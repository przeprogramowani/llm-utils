import type { APIRoute } from 'astro';
import {
  STORYTELLING_BASE_MESSAGES,
  STORYTELLING_PROMPT,
  TRANSLATE_TO_POLISH_PROMPT,
  TRANSLATE_TO_POLISH_SYSTEM_PROMPT,
} from '@/features/storytelling/storytelling-prompts';

import { errorHandler } from './utils/error-handling';
import { createChatCompletion } from './utils/chat-completions';
import { Conversation } from './utils/conversation';
import { LLM } from '../../features/generic/models';

export const prerender = false;

interface RequestBody {
  modelName: LLM;
  inputText: string;
  apiKey: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { inputText, apiKey, modelName }: RequestBody = await request.json();

    const conversation = new Conversation(
      STORYTELLING_BASE_MESSAGES(inputText),
    );

    const keyQuestionsResponse = await createChatCompletion(
      apiKey,
      modelName,
      conversation.toMessages(),
    );

    conversation.extend([
      {
        role: 'assistant',
        content: keyQuestionsResponse,
      },
      {
        role: 'user',
        content: STORYTELLING_PROMPT,
      },
    ]);

    const storytellingResponse = await createChatCompletion(
      apiKey,
      modelName,
      conversation.toMessages(),
    );

    const translateConversation = new Conversation([
      {
        role: 'system',
        content: TRANSLATE_TO_POLISH_SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: TRANSLATE_TO_POLISH_PROMPT,
      },
      {
        role: 'user',
        content: storytellingResponse,
      },
    ]);

    const translatedResponse = await createChatCompletion(
      apiKey,
      modelName,
      translateConversation.toMessages(),
    );

    return new Response(JSON.stringify(translatedResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
};
