import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Для Tailwind v4

export default defineConfig({
    plugins: [
        tailwindcss(),
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // Важно: разрешает внешние подключения
        hmr: {
            host: 'localhost', // Браузер будет стучаться сюда
        },
        watch: {
            usePolling: true, // Помогает, если WSL2 не подхватывает изменения файлов
        },
    },
});
