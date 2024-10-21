export function errorHandler(error: unknown) {
  console.error('Error:', error);
  return new Response(JSON.stringify(error), {
    status: 500,
  });
}
