import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset URLs so the build also works from a sub-directory.
  base: './',
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    // Source maps ship the full unminified source to a public URL, which both
    // bloats the deploy and makes the source trivially readable. The maps are
    // still generated for local debugging via `npm run build -- --sourcemap`.
    sourcemap: false,
  },
})
