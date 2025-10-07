import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  // Use /ride_safe/ as the default base path
  const basePath = '/ride_safe/'

  console.log('Base path:', basePath)

  return {
    base: basePath,
    plugins: [
      react(),
    ],
    server: {
      host: env.VITE_HOST || '127.0.0.1',
      port: parseInt(env.VITE_PORT || '5173'),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  }
})

