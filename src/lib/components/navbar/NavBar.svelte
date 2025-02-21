<script lang="ts">
    import NavBarHeader from "./NavBarHeader.svelte";
    import NavBarSideNav from "./NavBarSideNav.svelte";
    let isSideNavOpen = $state(false);
</script>

<NavBarHeader isSideNavOpen={isSideNavOpen}/>
<NavBarSideNav isSideNavOpen={isSideNavOpen}/>
