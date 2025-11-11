// Ensure the environment variable is set before any native modules can load.
// Then delegate the actual config to the CommonJS file which Vite will accept.
process.env.CSS_TRANSFORMER_WASM = process.env.CSS_TRANSFORMER_WASM || '1';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Require the CommonJS config we added earlier. This keeps all plugin requires
// and the potential lightningcss load inside the CJS file after the env var is set.
const config = require('./vite.config.cjs');
export default config;
