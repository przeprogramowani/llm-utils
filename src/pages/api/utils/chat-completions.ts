import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

import { LLM } from '../../../features/generic/models';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages.mjs';

export interface ChatCompletionMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function createChatCompletion(
  apiKey: string,
  modelName: LLM,
  messages: ChatCompletionMessage[],
): Promise<string> {
  switch (modelName) {
    case LLM.GPT_4O:
      return await createOpenAIChatCompletion(apiKey, modelName, messages);
    case LLM.GPT_4O_MINI:
      return await createOpenAIChatCompletion(apiKey, modelName, messages);
    case LLM.CLAUDE_3_5_SONNET:
      return await createAnthropicChatCompletion(apiKey, modelName, messages);
  }
}

async function createOpenAIChatCompletion(
  apiKey: string,
  modelName: LLM,
  messages: ChatCompletionMessage[],
) {
  const client = new OpenAI({ apiKey });

  const response = await client.chat.completions.create({
    model: modelName,
    stream: false,
    temperature: 0.5,
    messages,
  });

  return response.choices[0].message.content ?? '';
}

async function createAnthropicChatCompletion(
  apiKey: string,
  modelName: LLM,
  messages: ChatCompletionMessage[],
) {
  const client = new Anthropic({ apiKey });

  const systemMessage = messages.find((message) => message.role === 'system');
  const appMessages = messages.filter(
    (message) => message.role === 'user' || message.role === 'assistant',
  );

  const response = await client.messages.create({
    model: modelName,
    system: systemMessage?.content,
    max_tokens: 4096,
    temperature: 0.5,
    stream: false,
    messages: appMessages as MessageParam[],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}
