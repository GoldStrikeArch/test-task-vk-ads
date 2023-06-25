<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  let uid = 1;

  let todos = [
    { id: uid++, done: false, description: "write some docs" },
    { id: uid++, done: false, description: "start writing blog post" },
    { id: uid++, done: true, description: "buy some milk" },
    { id: uid++, done: false, description: "mow the lawn" },
    { id: uid++, done: false, description: "feed the turtle" },
    { id: uid++, done: false, description: "fix some bugs" },
  ];

  function add(input: any) {
    const todo = {
      id: uid++,
      done: false,
      description: input.value,
    };

    todos = [todo, ...todos];
    input.value = "";
  }

  function remove(todo: any) {
    console.log("from here");
    todos = todos.filter((t) => t !== todo);
  }

  function mark(todo: any, done: any) {
    todo.done = done;
    remove(todo);
    todos = todos.concat(todo);
  }
</script>

<div>
  <input
    placeholder="what needs to be done?"
    on:keydown={(e) => e.key === "Enter" && add(e.target)}
  />

  <div>
    <h2>todo</h2>
    {#each todos.filter((t) => !t.done) as todo (todo.id)}
      <label
        in:receive={{ key: todo.id }}
        out:send={{ key: todo.id }}
        animate:flip
      >
        <input type="checkbox" on:change={() => mark(todo, true)} />
        {todo.description}
        <button on:click={() => remove(todo)}>remove</button>
      </label>
    {/each}
  </div>

  <div>
    <h2>done</h2>
    {#each todos.filter((t) => t.done) as todo (todo.id)}
      <label
        in:receive={{ key: todo.id }}
        out:send={{ key: todo.id }}
        animate:flip
      >
        <input type="checkbox" checked on:change={() => mark(todo, false)} />
        {todo.description}
        <button on:click={() => remove(todo)}>remove</button>
      </label>
    {/each}
  </div>
</div>
