import type { APIRoute } from 'astro';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { errorHandler } from './utils/error-handling';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url } = await request.json();

    if (!url) {
      return new Response(JSON.stringify({ error: 'Invalid URL' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const mainContent = $(
      'article, main, #content, .content, .main-content',
    ).first();

    let extractedText = '';
    if (mainContent.length) {
      extractedText = mainContent.text();
    } else {
      const body = $('body');
      body.find('header, nav, footer, script, style').remove();
      extractedText = body.text();
    }

    const cleanText = extractedText.replace(/\s+/g, ' ').trim();

    return new Response(JSON.stringify({ text: cleanText }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
};
