import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // This will enable JSX in .js files
    include: '**/*.{js,jsx,ts,tsx}'
  })],
  esbuild: {
    // This will enable JSX in .js files
    loader: 'jsx',
    include: /.*\.jsx?$/,
    exclude: []
  },
  server: {
    port: 3000,
    open: true
  }
})
