import { writable } from "svelte/store";
import { MODAL_STATUS }  from "$lib/constants";

export const modal_status = writable(MODAL_STATUS.CLOSE);
