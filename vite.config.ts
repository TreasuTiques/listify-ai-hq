import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.API_BASE_URL': JSON.stringify(env.VITE_APP_API_BASE_URL),
        'process.env.API_LOGIN_ENDPOINT': JSON.stringify(env.VITE_APP_LOGIN_ENDPOINT),
        'process.env.API_REGISTER_ENDPOINT': JSON.stringify(env.VITE_APP_REGISTER_ENDPOINT)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
