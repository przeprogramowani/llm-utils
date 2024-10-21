<script lang="ts">
  import { marked } from 'marked';

  export let markdown: string = '';

  $: htmlContent = marked(markdown);
</script>

<div class="markdown-content">
  {@html htmlContent}
</div>

<style>
  .markdown-content :global(h1) {
    font-size: 2em;
    margin-bottom: 0.5em;
  }
  .markdown-content :global(h2) {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .markdown-content :global(p) {
    margin-bottom: 1em;
  }
  .markdown-content :global(ul),
  .markdown-content :global(ol) {
    list-style-type: disc;
    margin-bottom: 1em;
    padding-left: 2em;
  }
  .markdown-content :global(li) {
    margin-bottom: 0.5em;
  }
  .markdown-content :global(code) {
    background-color: #f0f0f0;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  .markdown-content :global(pre) {
    background-color: #f0f0f0;
    padding: 1em;
    overflow-x: auto;
    margin-bottom: 1em;
  }
</style>
