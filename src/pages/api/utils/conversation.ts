import type { ChatCompletionMessage } from './chat-completions';

export class Conversation {
  private messages: ChatCompletionMessage[];

  constructor(initialMessages: ChatCompletionMessage[]) {
    this.messages = initialMessages;
  }

  extend(messages: ChatCompletionMessage[]) {
    this.messages.push(...messages);
  }

  toMessages(): ChatCompletionMessage[] {
    return this.messages;
  }
}
