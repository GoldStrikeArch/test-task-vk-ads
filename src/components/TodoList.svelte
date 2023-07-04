<script lang="ts">
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { Todo } from "../firebase";
  import TodoItem from "./TodoItem";
  export let todos: Todo[] = [];
</script>

<ul>
  {#each todos as todo (todo.id)}
    <li animate:flip={{ duration: 200 }} transition:fly|local={{ y: 200 }}>
      <react:TodoItem text={todo.text} id={todo.id} />
    </li>
  {/each}
</ul>

<style>
  li {
    list-style: none;
  }
</style>
