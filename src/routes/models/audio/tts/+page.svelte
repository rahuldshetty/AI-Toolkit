<script lang="ts">  
  import { TextArea, Button, Column, Grid, Row } from "carbon-components-svelte";
  import { AiGenerate } from "carbon-icons-svelte";
  import { invoke } from '@tauri-apps/api/core';


  let text_value = $state('');

  const generateTTS = async () => {
    console.log("TTS Input:", text_value);
    invoke('stt_kokoro', { text: text_value });
    console.log("Done");
  }

</script>

<h1>Text-to-Speech (TTS)</h1>

<br/>

<p>
  Convert text into audio using voice synthesizer.
</p>

<br/>

<TextArea 
  bind:value={text_value}
  labelText="Enter text"
  placeholder="Enter text..." 
  rows={10}
/>

<br/>

<Button icon={AiGenerate} on:click={generateTTS}>
  Generate
</Button>