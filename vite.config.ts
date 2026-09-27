import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/lib/paraglide'
    }),
    sveltekit()
  ],
  ssr: {
    // fast-json-patch has no `exports` map, so SSR resolves its CommonJS `main`
    // and named imports (`compare`, `applyPatch`) fail at runtime even though
    // the bundler build is fine. Routing it through Vite picks up the ESM
    // `module` entry instead.
    noExternal: ['fast-json-patch']
  }
});
