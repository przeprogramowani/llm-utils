export function errorHandler(error: unknown) {
  console.error('Error:', error);
  return new Response(
    JSON.stringify({
      error: 'An error occurred while processing your request.',
      message: error instanceof Error ? error.message : String(error),
    }),
    {
      status: 500,
    },
  );
}
