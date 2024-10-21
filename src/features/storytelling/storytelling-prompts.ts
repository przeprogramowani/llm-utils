import type { ChatCompletionMessage } from '../../pages/api/utils/chat-completions';

const SYSTEM_PROMPT = `
You are a best-selling author tasked with creating engaging content for a technology-focused podcast about artificial intelligence. Your audience primarily consists of developers and managers who want to stay updated on new developments and apply AI in their work. Maintain a neutral tone and an objective viewpoint, avoiding promotion of specific companies, products, or services.
`;

const START_PROMPT = `
In the next message, you will receive a text that you need to summarize.
`;

const ASSISTANT_ACKNOWLEDGE_PROMPT = `Please provide the text to summarize.`;
const ASSISTANT_ASK_QUESTIONS_PROMPT = `What tasks do I need to perform?`;

const KEY_QUESTIONS_PROMPT = `
Summarize the text by generating and answering essential questions. Follow these steps:

1. Analyze the input text thoroughly.
2. Generate 5 essential questions that capture the main points and fundamental meaning of the text. Ensure these questions:
   a. Refer to the main topic or argument
   b. Identify key supporting ideas
   c. Highlight important facts or evidence
   d. Reveal the author's purpose or perspective
   e. Clarify any significant implications or conclusions
3. For each question:
   - Provide an answer in 4-5 clear and concise sentences.
   - Include a concrete example to illustrate your point.

Then, present your questions and answers in the following format:

1. [Question 1]
   a. [Answer to Question 1]
   b. [Concrete example for Question 1]

2. [Question 2]
   a. [Answer to Question 2]
   b. [Concrete example for Question 2]

(Continue this pattern for all 5 questions)
`;

export const STORYTELLING_PROMPT = `
Given the following text, generate a scenario that adheres to the following structure. Use the provided information to create an engaging narrative that could be used in a podcast discussion. Follow the steps closely to ensure coherence and depth in the scenario.

1. Broader Context
   - Provide short answer to whom the topic is relevant (subject, audience, etc.).
   - Present 4 intriguing observations about the audience (one economic, one political, one social, one technological) that the main topic is relevant to.
   Observations should follow this structure:
    a. Type of observation
    b. Observation - detailed and specific explanation in a single sentence, referencing the broader impact or context.
   - Avoid general statements like "AI is changing the world" or "AI is the future."
   - Do not try to sell the main topic - the goal is to widen the listeners' perspective.

2. Key Issue
   - Identify the main challenge or issue that the event/discovery/achievement addresses.
   - Connect this issue to the broader context.

3. Brief Summary (WHAT, SO WHAT, NOW WHAT)
   - WHAT: Summarize the event, discovery, or achievement. Mention relevant entities involved.
   - SO WHAT: Explain why it matters within the broader context.
   - NOW WHAT: Address potential next steps, consequences, or future developments.

4. Extended Summary
   - Develop the topic in five paragraphs (2-3 sentences each).
   - Include relevant details and nuances to deepen the discussion.
   - Consider historical context, impacts, stakeholders, counterarguments, and supporting data if applicable.

5. Alternative viewpoints and counterarguments
   - List up to 3 key counterarguments and alternative viewpoints.

6. What's Next?
   - Briefly summarize future implications or next steps related to the topic.
   - Discuss potential developments or trends that could follow.

7. Follow-up Questions
   - Propose three open-ended questions for further discussion between podcast hosts.
   - These questions should explore deeper aspects of the topic and encourage diverse viewpoints.

8. Valuable quotes
   - List up to 3 critically important quotes from the text that support the key issue and extended summary.

Important: Generate podcast scenario as plaintext with Markdown formatting. Each section is a h2 heading, with content described as paragraphs or bullet lists where appropriate. Do not use "code" blocks. Avoid exaggerations and marketing words such as massive, revolutionary, groundbreaking, transformative, and paradigm-shifting. Prefer short and concise sentences such as those from Paul Graham essays.
`;

export const TRANSLATE_TO_POLISH_PROMPT = `
Translate the storytelling notes that you've just created into Polish - avoid any extra comments or remarks. Do not translate quotes (the last section).
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
