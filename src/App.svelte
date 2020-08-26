<script lang="ts">
  import { format, isSameMonth } from "date-fns";
  import AddHabit from "./AddHabit.svelte";
  import Day from "./Day.svelte";
  import { send, state } from "./HabitMachine";

  $: currentDate = $state.context.currentDate;
  $: currentMonth = $state.context.currentMonth;
  $: habits = $state.context.habits;

  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowLeft":
        send({ type: "NAVIGATE", direction: "BACK" });
        break;
      case "ArrowRight":
        send({ type: "NAVIGATE", direction: "FORWARD" });
        break;
      case "Home":
        send({ type: "NAVIGATE", direction: "HOME" });
        break;
      case "Space":
        send("EDIT");
        break;
      case "Escape":
        send("CANCEL_EDIT");
        break;
    }
  });
</script>

<main class="h-full text-white bg-gradient-to-b from-indigo-200 to-indigo-900">
  <div
    class="p-4 text-4xl leading-tight text-center bg-gradient-to-r from-orange-400 to-red-700">
    <h1 class="text-6xl font-bold">HaBit Control</h1>
    <h2>{format(currentDate, 'MMMM - yyyy')}</h2>

    <div class="flex justify-center p-4 space-x-4">
      <button on:click={() => send({ type: 'NAVIGATE', direction: 'BACK' })}>
        👈
      </button>
      <button on:click={() => send({ type: 'NAVIGATE', direction: 'HOME' })}>
        🏡
      </button>
      <button on:click={() => send({ type: 'NAVIGATE', direction: 'FORWARD' })}>
        👉
      </button>
    </div>

    <button on:click={() => send('EDIT')} class="p-4 bg-red-400 rounded">
      Add HaBit
    </button>
    <button on:click={() => send('RESET')}>🗑</button>
  </div>

  <div class="grid grid-cols-7 gap-2 p-4">
    {#each currentMonth as day (day.toDateString())}
      <Day {day} {habits} enabled={isSameMonth(day, currentDate)} />
    {/each}
  </div>

  {#if $state.matches('edit')}
    <AddHabit />
  {/if}
</main>
