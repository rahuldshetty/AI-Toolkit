<script>
      import {
        Select,
        SelectItem,
        SelectItemGroup,
    } from "carbon-components-svelte";
    let { value = $bindable() } = $props();
</script>

<Select labelText="Quantization" bind:selected={value}>
    <SelectItemGroup label="Precisions">
        <SelectItem value="fp32" text="fp32" />
        <SelectItem value="fp16" text="fp16" />
    </SelectItemGroup>
    <SelectItemGroup label="8-bit">
        <SelectItem value="q8" text="q8" />
        <SelectItem value="int8" text="int8" />
        <SelectItem value="uint8" text="uint8" />
    </SelectItemGroup>
    <SelectItemGroup label="4-bit">
        <SelectItem value="q4" text="q4" />
        <SelectItem value="bnb4" text="bnb4" />
        <SelectItem value="q4f16" text="q4f16" />
    </SelectItemGroup>
</Select>
