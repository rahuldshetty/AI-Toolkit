<script lang="ts">
  import { getVersion } from "@tauri-apps/api/app";

  import { Modal } from "carbon-components-svelte";
  import { Link  } from "carbon-components-svelte";

  import { modal_status } from "$lib/store";
  import { MODAL_STATUS } from "$lib/constants";
</script>

<Modal
  size="xs"
  passiveModal
  modalHeading="About"
  open={$modal_status == MODAL_STATUS.INFO}
  on:close={() => ($modal_status = MODAL_STATUS.CLOSE)}
>
  <p>
    AI-Toolkit is a desktop application that brings together multiple AI-powered tools in one place.
  </p>
  <br />
  

  {#await getVersion() then version}
    <p>Version <strong>{version}</strong></p>
  {/await}
  
  <Link target="_blank" on:click={()=>{}}  href="https://www.carbondesignsystem.com/">Github</Link>

</Modal>
