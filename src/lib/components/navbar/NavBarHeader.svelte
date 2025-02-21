<script>
    import {
        Header,
        SkipToContent,
        HeaderUtilities,
        HeaderGlobalAction,
    } from "carbon-components-svelte";

    import { 
        SettingsAdjust,
        Information
    } from "carbon-icons-svelte";
    import { modal_status } from "$lib/store";
    import { MODAL_STATUS } from "$lib/constants";

    let {isSideNavOpen} = $props();
</script>

<Header
    platformName="AI-Toolkit"
    bind:isSideNavOpen
>
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
    <HeaderUtilities>
        <HeaderGlobalAction
            iconDescription="Settings"
            tooltipAlignment="start"
            icon={SettingsAdjust}
        />
        <HeaderGlobalAction iconDescription="About" icon={Information} 
            on:click={()=>{ $modal_status = MODAL_STATUS.INFO }}
        />
    </HeaderUtilities>
</Header>
