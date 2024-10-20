<script>
  import { createEventDispatcher } from 'svelte';

  const models = [
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  ];

  let selectedModel = models[0].value;
  const dispatch = createEventDispatcher();

  function handleModelChange(event) {
    selectedModel = event.target.value;
    dispatch('modelChange', { model: selectedModel });
  }
</script>

<div class="col-span-full">
  <label
    for="model-picker"
    class="block text-sm font-medium leading-6 text-gray-900"
  >
    Model językowy
  </label>
  <div class="mt-2">
    <select
      id="model-picker"
      bind:value={selectedModel}
      on:change={handleModelChange}
      class="block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      {#each models as model}
        <option value={model.value}>{model.label}</option>
      {/each}
    </select>
  </div>
</div>
