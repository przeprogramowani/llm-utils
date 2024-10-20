import OpenAI from 'openai';

const START_PROMPT = `
Twoim zadaniem jest podsumować tekst, który przekażę ci w kolejnej wiadomości. Zapoznaj się z jego treścią i wykonaj zadania, które przekażę ci poniżej.
`;

const ASSISTANT_ACKNOWLEDGE_PROMPT = `Zrozumiałem. Przekaż mi tekst do podsumowania.`;
const ASSISTANT_ASK_QUESTIONS_PROMPT = `Dziękuję za tekst. Jakie zadania muszę wykonać?`;

const ARTICLE_ANALYSIS_PROMPT = `
Wykonaj następujące czynności:

1.) Przeanalizuj tekst wejściowy i wygeneruj 5 zasadniczych pytań, które po udzieleniu odpowiedzi uchwycą główne punkty i podstawowe znaczenie tekstu.
2.) Podczas formułowania pytań:
a. Odnieś się do głównego tematu lub argumentu
b. Zidentyfikuj kluczowe pomysły wspierające
c. Podkreślenie ważnych faktów lub dowodów
d. Ujawnienie celu lub perspektywy autora
e. Wyjaśnienie wszelkich istotnych implikacji lub wniosków.
3.) Odpowiedz na każde pytanie w 4-5 zdaniach. Dołącz konkretny przykład, aby zilustrować swój punkt widzenia.

Wygeneruj odpowiedź z formatowaniem markdown - pytania to nagłówki h2, odpowiedzi to akapity p.`;

export const SUMMARIZE_ARTICLE_MESSAGES: (
  articleText: string,
) => OpenAI.ChatCompletionMessageParam[] = (articleText: string) => [
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
    content: articleText,
  },
  {
    role: 'assistant',
    content: ASSISTANT_ASK_QUESTIONS_PROMPT,
  },
  {
    role: 'user',
    content: ARTICLE_ANALYSIS_PROMPT,
  },
];
