<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';
  import ModelPicker from '@/features/generic/ModelPicker.svelte';
  import MarkdownRenderer from '@/features/generic/MarkdownRenderer.svelte';
  import AddToClipboard from '@/features/generic/AddToClipboard.svelte';
  import LoadingIndicator from '@/features/generic/LoadingIndicator.svelte';

  import {
    LS_OPENAI_KEY,
    LS_ANTHROPIC_KEY,
  } from '@/features/generic/constants';

  const API_URL = '/api/storytelling';
  const PDF_PARSER_URL = '/api/pdfparser';
  const SCRAPER_URL = '/api/urlscraper';

  let selectedModel = 'gpt-4o';

  let inputText = '';
  let pdfText = '';
  let urlText = '';
  let url = '';
  let apiKey = '';
  let summary = '';
  let isLoading = false;
  let error = '';
  let pdfFile: File | null = null;

  onMount(() => {
    const openAIKey = localStorage.getItem(LS_OPENAI_KEY) || '';
    const anthropicKey = localStorage.getItem(LS_ANTHROPIC_KEY) || '';
    apiKey = selectedModel.includes('gpt') ? openAIKey : anthropicKey;
  });

  function handleModelChange(event: CustomEvent<{ model: string }>) {
    selectedModel = event.detail.model;
    apiKey = selectedModel.includes('gpt')
      ? localStorage.getItem(LS_OPENAI_KEY)
      : localStorage.getItem(LS_ANTHROPIC_KEY);
  }

  async function extractFromPDF(pdfFile: File) {
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    const pdfResponse = await axios.post(PDF_PARSER_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    pdfText = pdfResponse.data.text;
  }

  async function extractFromURL(url: string) {
    const urlResponse = await axios.post(SCRAPER_URL, { url });
    urlText = urlResponse.data.text;
  }

  async function handleSubmit() {
    if ((!inputText && !pdfFile && !url) || !apiKey) {
      error =
        'Please provide source text (raw, PDF or URL) and ensure API key is set in settings.';
      return;
    }

    isLoading = true;
    error = '';

    try {
      if (pdfFile) {
        await extractFromPDF(pdfFile);
      }

      if (url) {
        await extractFromURL(url);
      }

      const response = await axios.post(API_URL, {
        modelName: selectedModel,
        inputText: inputText || pdfText || urlText,
        apiKey,
      });
      summary = response.data;
    } catch (err) {
      error =
        'An error occurred while processing your request. Please try again.';
      console.error(err);
    } finally {
      isLoading = false;
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      pdfFile = file;
    } else {
      pdfFile = null;
      error = 'Please upload a valid PDF file.';
    }
  }
</script>

<div>
  {#if isLoading}
    <LoadingIndicator />
  {/if}
  <form
    on:submit|preventDefault={handleSubmit}
    class="bg-white rounded-xl shadow-sm p-4 mt-8"
  >
    <div class="grid grid-cols-2 mb-4">
      <div class="col-span-1">
        <ModelPicker on:modelChange={handleModelChange} />
      </div>
    </div>
    <div
      class="grid grid-cols-2 space-x-4 border border-gray-100 rounded-md p-4"
    >
      <div>
        <label
          for="input-text"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Tekst do opracowania</label
        >
        <div class="mt-2">
          <textarea
            id="input-text"
            bind:value={inputText}
            rows="5"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Paste your article text here..."
          ></textarea>
        </div>
      </div>

      <div>
        <label
          for="pdf-upload"
          class="block text-sm font-medium leading-6 text-gray-900"
          >PDF do opracowania</label
        >
        <div class="mt-2">
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            on:change={handleFileChange}
            class="block w-full text-sm text-gray-900 cursor-pointer focus:outline-none"
          />
        </div>
        <label
          for="pdf-upload"
          class="block text-sm font-medium leading-6 text-gray-900 mt-4"
          >URL do opracowania</label
        >
        <div class="mt-2">
          <input
            type="text"
            id="url-input"
            bind:value={url}
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={isLoading}
      >
        {isLoading ? 'Generuję...' : 'Wygeneruj'}
      </button>
    </div>

    {#if error}
      <p class="mt-2 text-sm text-red-600">{error}</p>
    {/if}
  </form>
  {#if summary}
    <div class="bg-white rounded-xl shadow-sm p-4 mt-8">
      <MarkdownRenderer markdown={summary} />
      <AddToClipboard content={summary} />
    </div>
  {/if}
</div>
