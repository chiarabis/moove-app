import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: './',
    base: './',
    resolve: {
        alias: {
        '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        emptyOutDir: true,
        rollupOptions: {
            input: './index.html',
        },
    },
    server: {
        open: true,
    },
});
