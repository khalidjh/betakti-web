import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib'
    },
    prerender: {
      // `*` keeps crawling the Arabic (root) marketing pages. The /en entries
      // force the English variants of the prerendered marketing pages to be
      // generated too, since the prerender crawler won't otherwise discover
      // them (they live behind the /en reroute).
      entries: ['*', '/en', '/en/pricing', '/en/privacy', '/en/terms'],
      handleHttpError: 'warn'
    }
  }
};

export default config;
