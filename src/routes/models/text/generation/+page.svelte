<script lang="ts">
  import {
    TextArea,
    Button,
    Loading,
    ButtonSet,
    TextInput,
    Grid, Row, Column,
    Accordion, AccordionItem,
    Toggle,
  } from "carbon-components-svelte";
  import { AiGenerate } from "carbon-icons-svelte";

  import {
    pipeline,
    PreTrainedTokenizer,
    TextGenerationPipeline,
    TextStreamer,
  } from "@huggingface/transformers";
    import QuantizationDropdown from "$lib/components/inputs/quantization_dropdown.svelte";

  // Model Params
  let text_generation_model = $state("onnx-community/Qwen2.5-0.5B-Instruct");
  let quantization = $state("q4");

  let temperature = $state(0.9);
  let max_tokens = $state(32);
  let repetition_penalty = $state(2.0);
  
  // State Variables
  let text_value = $state("");
  let loading = $state(false);
  let model_loaded = $state(false);

  let enable_system_prompt = $state(true);
  let system_prompt = $state("You are a helpful assistant.");

  let response = $state("");

  let generator:
    | TextGenerationPipeline
    | {
        (
          arg0: { role: string; content: string }[],
          arg1: { max_new_tokens: number },
        ): any;
        tokenizer: PreTrainedTokenizer;
      };
  let streamer: TextStreamer;

  const loadModel = async () => {
    loading = true;

    console.log("Loading Model:", text_generation_model)
    console.log("Quantization Set:", quantization)

    try{
      generator = await pipeline(
        "text-generation",
        text_generation_model,
        { dtype: quantization, device: "webgpu" },
      );

      streamer = new TextStreamer(generator.tokenizer, {
        skip_prompt: true,
        callback_function: (text) => {
          response += text;
        },
      });

      model_loaded = true;

    } catch(error){
      console.error("Unable to load model...")
      
    }
    

    loading = false;
  };

  const generateText = async () => {
    if (!generator) {
      return;
    }

    // Reset States
    loading = true;
    response = "";

    const params = {
      temperature: temperature,
      max_new_tokens: max_tokens,
      repetition_penalty: repetition_penalty,
      do_sample: false,
      streamer,
    }

    console.log("Generation Param:", params);

    if(enable_system_prompt){
      const messages = [
        { role: "system", content: system_prompt },
        { role: "user", content: text_value },
      ];
      console.log("Text Input:", messages);

      const output = await generator(messages, params);
      console.log(output);
      response = output[0].generated_text.at(-1).content;
    } else {
      console.log("Text Input:", text_value);

      const output = await generator(text_value, params);
      console.log(output);
      response = output[0].generated_text;
    }
  
    loading = false;
  };
</script>

<h1>Text Generation</h1>

<br />

<p>Generate text from initial prompt.</p>

<br />

<TextArea
  bind:value={text_value}
  labelText="Enter text"
  placeholder="Enter text..."
/>

<br />

<Accordion align="start">
  <AccordionItem title="Model Params">
    <Grid>
      <Row>
        <Column>
          <TextInput size="sm"  labelText="Model" type="text" bind:value={text_generation_model}/>
        </Column>
        <Column>
          <QuantizationDropdown bind:value={quantization}/>
        </Column>
      </Row>
      <Row>
          <Column>
            <TextInput size="sm"  labelText="Temperature" type="number" bind:value={temperature}/>
          </Column>
          <Column>
            <TextInput size="sm"  labelText="Max New Tokens" type="number" bind:value={max_tokens}/>
          </Column>
          <Column>
            <TextInput size="sm"  labelText="Repetition Penalty" type="number" bind:value={repetition_penalty}/>
          </Column>
      </Row>
      <Row>
        <Column>
          <Toggle labelText="Enable System Prompt" bind:toggled={enable_system_prompt} />
        </Column>
        <Column>
          <TextInput size="sm"  labelText="System Prompt" type="text" bind:value={system_prompt} disabled={!enable_system_prompt}/>
        </Column>
      </Row>
    </Grid>
  </AccordionItem>
</Accordion>

<br />



<ButtonSet>
  <Button disabled={loading} on:click={async () => await loadModel()}>Load Model</Button>

  <Button
    icon={AiGenerate}
    on:click={generateText}
    disabled={loading || !model_loaded}
  >
    Generate
  </Button>
</ButtonSet>

<br />

{#if loading}
  <Loading small withOverlay={false} />
{/if}

{#if response != ""}
  <h3>Result</h3>
  <br />
  <p>
    {response}
  </p>
{/if}
