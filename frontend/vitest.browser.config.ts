/// <reference types="vitest" />
/// <reference types="@vitest/browser/providers/playwright" />
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    server: {
        port: 3000,
        strictPort: true,
        hmr:{
            clientPort: 3000,
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
    plugins: [react(), tailwindcss(), viteTsconfigPaths()],
    build: {
        outDir: 'build',
    },
    test: {
        include: ['**/*.browser.{ts,tsx}'],
        browser: {
            enabled: true,
            provider: 'playwright',
            headless: false,
            instances: [
                {browser: 'webkit'},
            ]
        },
        resolve: {
            conditions: ['browser'],
        },
    },
});
