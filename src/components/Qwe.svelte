<script>
  import { onMount, afterUpdate, tick } from "svelte";
  import { fade, scale, slide, fly } from "svelte/transition";
  import { flip } from "svelte/animate";

  import Child from "./Child";

  let a = 1;

  let todos = [],
    todoinput = "bla",
    input;
  $: isvalid = todoinput.length;

  onMount(() => {
    //repl doesn't support localstorage
    const storedtodos = ["thing", "bla", "la", "da"];
    todos = storedtodos.map((el) => {
      return { input: el, id: Math.random() };
    });
  });

  function addtodo() {
    todos = [...todos, { input: todoinput, id: Math.random() }];
    tick().then(() => {
      input.select();
    });
  }

  function removetodo(i) {
    todos.splice(i, 1);
    todos = todos;
  }
</script>

<div>
  <button on:click={() => a++}>{a}</button>
  <form on:submit|preventDefault={addtodo}>
    <input
      bind:this={input}
      bind:value={todoinput}
      on:focus={(e) => e.target.select()}
      class:invalid={!isvalid}
    />
    <input type="submit" value="Add todo" disabled={!isvalid} />
  </form>

  <ul>
    {#each todos as todo, i (todo.id)}
      <li
        on:click={() => removetodo(i)}
        animate:flip={{ duration: 200 }}
        transition:fly|local={{ y: 200 }}
      >
        <react:Child text={todo.input} />
      </li>
    {/each}
  </ul>
</div>

<style>
  div {
    display: grid;
    place-items: center;
  }
</style>
