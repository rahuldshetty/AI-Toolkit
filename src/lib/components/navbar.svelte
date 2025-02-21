<script lang="ts">
    import {
        Header,
        SideNav,
        SideNavItems,
        SideNavMenu,
        SideNavMenuItem,
        SideNavLink,
        SideNavDivider,
        SkipToContent,
        HeaderUtilities,
        HeaderGlobalAction,
    } from "carbon-components-svelte";
    import { 
        SettingsAdjust,
        Information,
        Home,
        VoiceActivate,
    } from "carbon-icons-svelte";

    import { modal_status } from "$lib/store";
    import { MODAL_STATUS } from "$lib/constants";

    import { page } from "$app/state";
    let isSideNavOpen = $state(false);

    const checkSelected = (url2match:String) => {
        return page.url.pathname === url2match;
    }

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

<SideNav bind:isOpen={isSideNavOpen} rail>
    <SideNavItems>
        <SideNavLink text="Home" href="/" icon={Home} isSelected={checkSelected("/")}/>
        <SideNavMenu text="Audio" icon={VoiceActivate}>
            <SideNavMenuItem href="/models/audio/stt" text="Speech-to-Text (STT)" isSelected={checkSelected("/models/audio/stt")} />
            <SideNavMenuItem href="/models/audio/tts" text="Text-to-Speech (TTS)" isSelected={checkSelected("/models/audio/tts")} />
        </SideNavMenu>
        <SideNavLink text="Link 2" href="/" />
        <SideNavLink text="Link 3" href="/" />
        <SideNavDivider />
        <SideNavLink text="Link 4" href="/" />
    </SideNavItems>
</SideNav>
