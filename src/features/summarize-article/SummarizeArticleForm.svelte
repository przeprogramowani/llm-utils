<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';
  import ModelPicker from '@/features/generic/ModelPicker.svelte';
  import MarkdownRenderer from '@/features/generic/MarkdownRenderer.svelte';
  import AddToClipboard from '@/features/generic/AddToClipboard.svelte';

  import {
    LS_OPENAI_KEY,
    LS_ANTHROPIC_KEY,
  } from '@/features/generic/constants';

  let inputText = '';
  let selectedModel = 'gpt-4o';
  let apiKey = '';
  let summary = '';
  let isLoading = false;
  let error = '';

  onMount(() => {
    const openAIKey = localStorage.getItem(LS_OPENAI_KEY);
    const anthropicKey = localStorage.getItem(LS_ANTHROPIC_KEY);
    apiKey = selectedModel.startsWith('gpt') ? openAIKey : anthropicKey;
  });

  function handleModelChange(event) {
    selectedModel = event.detail.model;
    apiKey = selectedModel.startsWith('gpt')
      ? localStorage.getItem(LS_OPENAI_KEY)
      : localStorage.getItem(LS_ANTHROPIC_KEY);
  }

  async function handleSubmit() {
    if (!inputText || !apiKey) {
      error =
        'Please provide input text and ensure API key is set in settings.';
      return;
    }

    isLoading = true;
    error = '';

    try {
      const response = await axios.post('/api/summarize-article', {
        modelName: selectedModel,
        inputText,
        apiKey,
      });
      summary = response.data.choices[0].message.content;
    } catch (err) {
      error =
        'An error occurred while summarizing the article. Please try again.';
      console.error(err);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="bg-white rounded-xl shadow-sm p-4 mt-8">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Summarize Article
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          Paste your article text below and select a model to summarize it.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <ModelPicker on:modelChange={handleModelChange} />
          </div>
          <div class="col-span-full">
            <label
              for="input-text"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Article Text</label
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
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={isLoading}
      >
        {isLoading ? 'Generuję podsumowanie...' : 'Podsumuj artykuł'}
      </button>
    </div>

    {#if error}
      <p class="mt-2 text-sm text-red-600">{error}</p>
    {/if}

    {#if summary}
      <div class="mt-6">
        <MarkdownRenderer markdown={summary} />
        <AddToClipboard content={summary} />
      </div>
    {/if}
  </form>
</div>
