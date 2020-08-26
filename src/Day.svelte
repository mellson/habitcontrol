<script lang="ts">
  import { format, isToday } from "date-fns";
  import type { Habit } from "./Habit";

  export let day: Date;
  export let habits: Habit[];
  export let enabled: boolean;

  const key = day.toDateString();

  $: today = isToday(day);
  $: localHabits = habits;
  $: completedHabits = (JSON.parse(localStorage.getItem(key)) ?? []) as Habit[];

  const sameHabits = (habit1: Habit, habit2: Habit) =>
    JSON.stringify(habit1) === JSON.stringify(habit2);

  const isHabitCompleted = (habit: Habit) =>
    completedHabits.some((ch) => sameHabits(ch, habit));

  const toggleHabit = (habit: Habit) => {
    if (isHabitCompleted(habit)) {
      completedHabits = completedHabits.filter((ch) => !sameHabits(ch, habit));
      if (completedHabits.length > 0)
        localStorage.setItem(key, JSON.stringify(completedHabits));
      else localStorage.removeItem(key);
    } else {
      completedHabits = completedHabits.concat([habit]);
      localStorage.setItem(key, JSON.stringify(completedHabits));
    }
    localHabits = habits;
  };
</script>

<style>

</style>

{#if enabled}
  <main
    class={`p-4 transition duration-500 ease-in-out transform ${today ? 'bg-indigo-700' : 'bg-indigo-900'} rounded-lg cursor-pointer hover:shadow-xl hover:bg-orange-400 hover:text-gray-900 hover:scale-110`}>
    <div class="text-xs">{format(day, 'EEE. do')}</div>
    <div class="grid gap-2">
      {#each localHabits as habit}
        <div
          class={`select-none ${isHabitCompleted(habit) ? 'italic line-through text-gray-500' : ''}`}
          on:click={() => toggleHabit(habit)}>
          {habit.name}
        </div>
      {/each}
    </div>
  </main>
{:else}
  <main class="p-4 bg-indigo-900 rounded-lg opacity-50" />
{/if}
