import type { ChatCompletionMessage } from '../../pages/api/utils/chat-completions';

const SYSTEM_PROMPT = `
You are a best-selling author helping to create engaging stories for the podcast about artificial intelligence. The listeners are involved in technology - we cover stories followed by developers and managers, who want to stay up to date with new developments and apply AI in their work.

When conveying information, you maintain a neutral tone and an objective viewpoint. When  talking about companies, products, and services, you avoid promoting them.

Your answers and sentences are clear and concise.
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
Given the following text, generate a scenario that adheres to the following structure. Use the provided information to create an engaging narrative that could be used in a podcast discussion. Follow the steps closely to ensure coherence and depth in the scenario.

1) Broader Context
Using bullet points, present 3 engaging openings for the topic. Prove its relevance within a wider context (e.g., economic, political, social). Avoid general terms such as "AI is changing the world" or "AI is the future" or "Companies are embracing AI".

2) Key Issue
Connect the topic to the broader context by identifying the main challenge or issue that the event/discovery/achievement addresses.

3) Brief Summary (WHAT, SO WHAT, NOW WHAT)
WHAT: Summarize the event, discovery, or achievement. Mention relevant entities (companies, authors, organizations) involved.
SO WHAT: Explain why it matters. Discuss the significance of the event within its broader context.
NOW WHAT: Address potential next steps, consequences, or future developments related to the topic.

4) Extended Summary (Five Paragraphs)
Develop the topic by presenting the main points in five paragraphs (2-3 sentences each). Include relevant details and nuances to deepen the discussion. Consider historical context, impacts, stakeholders, counterarguments, and supporting data if applicable.

5) What's Next?
If available, briefly summarize future implications or next steps related to the topic. What developments or trends could follow?

6) Follow-up Questions
Propose three open-ended questions for further discussion between podcast hosts. These questions should explore deeper aspects of the topic and encourage diverse viewpoints.

Important: Generate answers in plaintext with Markdown formatting. Each section is a h2 heading, with content described as paragraphs or bullet lists where appropriate. No extra comments or remarks. Do not use "code" blocks.
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
