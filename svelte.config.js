import { vitePreprocess } from "@astrojs/svelte";
import preprocessReact from "svelte-preprocess-react/preprocessReact";

export default {
  preprocess: preprocessReact({
    preprocess: vitePreprocess(),
  }),
};
