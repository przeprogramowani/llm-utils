<script lang="ts">
  import { onMount } from 'svelte';
  import {
    LS_OPENAI_KEY,
    LS_ANTHROPIC_KEY,
  } from '@/features/generic/constants';

  let openAIKey = '';
  let anthropicKey = '';

  onMount(() => {
    openAIKey = localStorage.getItem(LS_OPENAI_KEY) || '';
    anthropicKey = localStorage.getItem(LS_ANTHROPIC_KEY) || '';
  });

  function saveKeys() {
    localStorage.setItem(LS_OPENAI_KEY, openAIKey);
    localStorage.setItem(LS_ANTHROPIC_KEY, anthropicKey);
  }
</script>

<div class="bg-white rounded-xl shadow-sm p-4 mt-8">
  <form on:submit|preventDefault={saveKeys}>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Klucze do API
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          Wpisz klucze do API poniżej. Zostaną one przechowane w Local Storage
          twojej przeglądarki.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label
              for="openai-key"
              class="block text-sm font-medium leading-6 text-gray-900"
              >OpenAI Key</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="openai-key"
                id="openai-key"
                bind:value={openAIKey}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="anthropic-key"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Anthropic Key</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="anthropic-key"
                id="anthropic-key"
                bind:value={anthropicKey}
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Save</button
      >
    </div>
  </form>
</div>
