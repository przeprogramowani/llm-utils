import type { APIRoute } from 'astro';
import pdf from 'pdf-parse-new';
import { errorHandler } from './utils/error-handling';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const file = data.get('pdf');

    if (!file || !(file instanceof Blob)) {
      return new Response(JSON.stringify({ error: 'Invalid file upload' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parsedData = await pdf(buffer);

    return new Response(JSON.stringify({ text: parsedData.text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
};
