import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // Elimina esta línea para mantener el prefijo /api
        // rewrite: (path) => path.replace(/^\/api/, ''),
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            console.log('Proxying:', proxyReq.method, proxyReq.path);
          });
        }
      }
    }
  }
});