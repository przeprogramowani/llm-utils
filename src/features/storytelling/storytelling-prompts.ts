import OpenAI from 'openai';

const SYSTEM_PROMPT = `
Jesteś przyjaznym asystentem, który pomaga w tworzeniu angażujących historii do podcastu Opanuj.AI o sztucznej inteligencji. Słuchacze to osoby związane z technologią, w tym programiści i managerowie, którzy chcą być na bieżąco z nowościami i móc stosować AI w swojej pracy.
`;

const START_PROMPT = `
Twoim zadaniem jest podsumować tekst, który przekażę ci w kolejnej wiadomości. Zapoznaj się z jego treścią i wykonaj zadania, które przekażę ci poniżej.
`;

const ASSISTANT_ACKNOWLEDGE_PROMPT = `Zrozumiałem. Przekaż mi tekst do podsumowania.`;
const ASSISTANT_ASK_QUESTIONS_PROMPT = `Dziękuję za tekst. Jakie zadania muszę wykonać?`;

const KEY_QUESTIONS_PROMPT = `
Wykonaj następujące czynności:

1.) Przeanalizuj tekst wejściowy i wygeneruj 5 zasadniczych pytań, które po udzieleniu odpowiedzi uchwycą główne punkty i podstawowe znaczenie tekstu.
2.) Podczas formułowania pytań:
a. Odnieś się do głównego tematu lub argumentu
b. Zidentyfikuj kluczowe pomysły wspierające
c. Podkreślenie ważnych faktów lub dowodów
d. Ujawnienie celu lub perspektywy autora
e. Wyjaśnienie wszelkich istotnych implikacji lub wniosków.
3.) Odpowiedz na każde pytanie w 4-5 zdaniach. Dołącz konkretny przykład, aby zilustrować swój punkt widzenia.`;

export const STORYTELLING_PROMPT = `
Na podstawie przekazanego tekstu, kluczowych pytań i odpowiedzi przygotuj angażujący storytelling do podcastu.

Zastosuj następujący schemat:

1. Wprowadź słuchacza do tematu pokazując szerszą perspektywę na omawiany temat, która nie jest bezpośrednio związana z AI (np. ekonomiczna, polityczna, społeczna).
2. Zaznacz kluczowy problem lub wyzwanie - co sprawia, że omawiany temat jest aktualny i istotny?
3. Przedstaw główne wydarzenie, osiągnięcie lub odkrycie - jeśli to możliwe, wymień firmę, autora lub podmiot związany z tematem.
4. Rozwiń temat prezentując główne punkty w formie pięciu akapitów do pogłębenia tematu.
5. Wskaż trzy potencjalne kierunki rozwoju omawianego tematu.
6. Zaproponuj trzy pytania otwarte do dalszej refleksji.

Generuj odpowiedzi w formie notatek z formatowaniem markdown - stosuj listy punktowane i pogrubione nagłówki.
`;

export const STORYTELLING_BASE_MESSAGES: (
  inputText: string,
) => OpenAI.ChatCompletionMessageParam[] = (inputText: string) => [
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
