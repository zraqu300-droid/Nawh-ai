import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 هذا السطر لحل مشكلة الصفحة البيضاء في الـ APK
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer], // 👈 لضمان عمل تيلويند بثبات داخل الأكشن
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
});
