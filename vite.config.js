import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
plugins: [
    tailwindcss(),
],
  // base: '/poli-map/', <-- Remove or comment this out for Vercel
})