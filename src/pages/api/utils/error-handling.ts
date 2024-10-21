export function errorHandler(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : 'An unknown error occurred';

  return new Response(JSON.stringify({ data: { error: errorMessage } }), {
    status: 500,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
