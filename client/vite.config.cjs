// Use CommonJS config so we can set env before requiring plugins.
// This ensures lightningcss sees CSS_TRANSFORMER_WASM during config load on CI.
process.env.CSS_TRANSFORMER_WASM = process.env.CSS_TRANSFORMER_WASM || '1';

const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const tailwindcss = require('@tailwindcss/vite');

module.exports = defineConfig({
  plugins: [react(), tailwindcss()],
});
