<script lang="ts">
    import { Content } from "carbon-components-svelte";
    import "carbon-components-svelte/css/all.css";
    
    import Navbar from "$lib/components/navbar.svelte";
    import InfoModal from "$lib/components/modals/infoModal.svelte";

    // Update UX theme
    let theme = "g100"; // "white" | "g10" | "g80" | "g90" | "g100"
    $effect(()=>{
        document.documentElement.setAttribute("theme", theme);
    })

    let { children } = $props();

</script>

<!-- Modal Boxes -->
<InfoModal/>

<Navbar/>

<Content>
    {@render children()}
</Content>
