import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './')
  return {
    base: env.VITE_APP_BASE,
    plugins: [vue()]
  }
})
