import type { ChatCompletionMessage } from '../../pages/api/utils/chat-completions';

const SYSTEM_PROMPT = `
You are a tech industry reporter helping to create engaging stories for the Opanuj.AI podcast about artificial intelligence. The listeners are people involved in technology, including developers and managers, who want to stay up to date with new developments and apply AI in their work. When conveying information, you maintain a neutral tone and an objective viewpoint. You avoid promoting the companies, products, and services discussed.
`;

const START_PROMPT = `
Your task is to summarize a text that I will provide in the next message. Review its content and perform the tasks that I will outline below.
`;

const ASSISTANT_ACKNOWLEDGE_PROMPT = `I understand. Please provide the text to summarize.`;
const ASSISTANT_ASK_QUESTIONS_PROMPT = `Thank you for the text. What tasks do I need to perform?`;

const KEY_QUESTIONS_PROMPT = `
Complete the following steps:

1.) Analyze the input text and generate 5 essential questions that, when answered, will capture the main points and fundamental meaning of the text. 2.) When formulating the questions:
a. Refer to the main topic or argument
b. Identify key supporting ideas
c. Highlight important facts or evidence
d. Reveal the author's purpose or perspective
e. Clarify any significant implications or conclusions.
3.) Answer each question in 4-5 sentences. Include a concrete example to illustrate your point.`;

export const STORYTELLING_PROMPT = `
Based on the provided text, key questions, and answers, create an engaging storytelling notes for a podcast. Aim for key points and main ideas.

Use the following structure:

1) Introduce the listener to the topic by showing a broader perspective on the subject, which is not directly related to AI (e.g., economic, political, social).
2) Highlight the key issue or challenge – what makes the discussed topic current and relevant?
3) Present the main event, achievement, or discovery – if possible, mention the company, author, or entity related to the topic.
4) Develop the topic by presenting the main points in the form of five paragraphs to deepen the discussion.
5) Identify three potential directions for the development of the topic.
6) Propose three open-ended questions for further reflection.

Important: Generate answers in the form of notes with markdown formatting – use bullet points and bold headings.
`;

export const TRANSLATE_TO_POLISH_PROMPT = `
Translate the storytelling notes that you've just created into Polish - avoid any extra comments or remarks.
`;

export const STORYTELLING_BASE_MESSAGES: (
  inputText: string,
) => ChatCompletionMessage[] = (inputText: string) => [
  {
    role: 'system',
    content: SYSTEM_PROMPT,
  },
  {
    role: 'user',
    content: START_PROMPT,
  },
  {
    role: 'assistant',
    content: ASSISTANT_ACKNOWLEDGE_PROMPT,
  },
  {
    role: 'user',
    content: inputText,
  },
  {
    role: 'assistant',
    content: ASSISTANT_ASK_QUESTIONS_PROMPT,
  },
  {
    role: 'user',
    content: KEY_QUESTIONS_PROMPT,
  },
];
