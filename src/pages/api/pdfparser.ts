import type { APIRoute } from 'astro';
// import pdf from 'pdf-parse-new';
import { errorHandler } from './utils/error-handling';
import { extractText, getDocumentProxy } from 'unpdf';

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

    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { totalPages, text } = await extractText(pdf, { mergePages: true });

    // const parsedData = parsePDF(arrayBuffer);

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
};
