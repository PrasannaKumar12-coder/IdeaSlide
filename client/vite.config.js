// Force lightningcss to use the WASM implementation during build
// This avoids requiring platform-specific native binaries on CI (Vercel)
process.env.CSS_TRANSFORMER_WASM = process.env.CSS_TRANSFORMER_WASM || '1';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
})
