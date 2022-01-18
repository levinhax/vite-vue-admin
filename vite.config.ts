import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

const resolve = dir => path.resolve(process.cwd(), dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),
    vueJsx(),
  ],
  server: {
    // port: 3000,
    // open: true,
    proxy: {
			// '/api': 'http://localhost:3001',
			'/api': {
        changeOrigin: true,
        secure: false,
        target: 'https://10.50.2.59:8080/',
        rewrite: (path) => path.replace(/^\/api/, '/asset')
      },
      '/api/test': {
        changeOrigin: true,
        target: 'http://10.11.32.173:8080/',
        rewrite: (path) => path.replace(/^\/api\/test/, '')
      }
		}
  },
  // 配置Dep优化行为
  optimizeDeps: {
    include: ['vue', 'ant-design-vue', '@ant-design/icons-vue'],
  },
  resolve: {
		alias: {
			'@': resolve('src')
		}
	}
})
