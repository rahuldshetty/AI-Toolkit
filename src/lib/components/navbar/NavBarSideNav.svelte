<script lang="ts">
    import {
        SideNav,
        SideNavItems,
        SideNavMenu,
        SideNavMenuItem,
        SideNavLink,
        SideNavDivider,
    } from "carbon-components-svelte";
    import { page } from "$app/state";

    import { SideNavItemsData } from "./SideNavData";

    let {isSideNavOpen} = $props();

    const checkSelected = (url2match:String | undefined) => {
        if(url2match){
            return page.url.pathname === url2match;
        }
        return false;
    }
</script>

<SideNav bind:isOpen={isSideNavOpen} rail>
    <SideNavItems>
        {#each SideNavItemsData as nav_item }
            {#if nav_item.type == "item"}
                <SideNavLink 
                    text={nav_item.name}
                    href={nav_item.link}
                    icon={nav_item.icon}
                    isSelected={checkSelected(nav_item.link)}
                />
            {:else if nav_item.type == "group" && nav_item.children}
                <SideNavMenu text={nav_item.name} icon={nav_item.icon}>
                {#each nav_item.children as nav_group_item }
                    <SideNavMenuItem 
                        text={nav_group_item.name}
                        href={nav_group_item.link}
                        isSelected={checkSelected(nav_group_item.link)} 
                    />
                {/each}
                </SideNavMenu>
            {/if}
        {/each}
    </SideNavItems>
</SideNav>
