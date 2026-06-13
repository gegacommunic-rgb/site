import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/site/', // <--- ВОТ ЭТА СТРОЧКА ИСПРАВИТ БЕЛЫЙ ЭКРАН
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // ... остальной код (серверные настройки можно оставить как есть)
  };
});