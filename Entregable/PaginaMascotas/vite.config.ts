import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No necesitas importar tailwind aquí directamente, se configura con postcss
export default defineConfig({
  plugins: [react()],
})
