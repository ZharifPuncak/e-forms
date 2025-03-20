import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

import path from 'path';

export default defineConfig({
    base: '/e-forms/', 
    server: {
        host: "127.0.0.1", // Force IPv4 instead of [::1]
        port: 5173
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/main.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: [{
            find: '../font',
            replacement: path.resolve(__dirname, 'resources/js/assets/fonts'), // replace this path with your actual path
        }],
    }
});
