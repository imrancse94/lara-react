import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.join(process.cwd(), 'src') },
      { find: '@lib', replacement: path.join(process.cwd(), 'src/lib') },
      { find: '@tiptap', replacement: path.join(process.cwd(), 'src/lib/tiptap') },
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  },
})
