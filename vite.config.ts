import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as path from 'node:path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            react(),
            tailwindcss()
        ],
        resolve: {
            alias: {
                '@app': path.resolve(__dirname, 'src/app'),
                '@pages': path.resolve(__dirname, 'src/pages'),
                '@widgets': path.resolve(__dirname, 'src/widgets'),
                '@features': path.resolve(__dirname, 'src/features'),
                '@entities': path.resolve(__dirname, 'src/entities'),
                '@shared': path.resolve(__dirname, 'src/shared'),
            },
        },
        define: {
            __API_URL__: JSON.stringify(env.VITE_API_URL),
        },
    }
})
