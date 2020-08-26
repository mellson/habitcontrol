<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { send } from "./HabitMachine";

  let inputRef: HTMLElement;
  let habit = { name: "" };

  onMount(() => inputRef.focus());
</script>

<div
  class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-screen space-y-2 text-2xl bg-red-400"
  transition:fade>
  <div class="text-4xl font-bold">Add new HaBit</div>
  <input
    class="p-4 text-center text-gray-900"
    type="text"
    placeholder="Type habit here..."
    bind:value={habit.name}
    bind:this={inputRef}
    on:keyup|preventDefault={(evt) => {
      if (evt.code === 'Enter') {
        send({ type: 'ADD_HABIT', habit });
      }
    }} />
  <button on:click={() => send('CANCEL_EDIT')}>Cancel</button>
</div>
