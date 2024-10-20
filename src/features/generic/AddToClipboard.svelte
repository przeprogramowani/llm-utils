<script lang="ts">
  import clipboard from 'clipboardy';

  export let content: string = '';
  let isCopied = false;

  async function copyToClipboard() {
    try {
      await clipboard.write(content);
      isCopied = true;
      setTimeout(() => {
        isCopied = false;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }
</script>

<button
  type="button"
  on:click={copyToClipboard}
  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
  {#if isCopied}
    Skopiowano!
  {:else}
    Skopiuj do schowka
  {/if}
</button>
