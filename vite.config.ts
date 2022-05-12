import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Components from 'unplugin-vue-components/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'
import Pages from 'vite-plugin-pages'
import { configManualChunk } from './config/vite/optimizer'

const resolve = dir => path.resolve(process.cwd(), dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Components({
    //   resolvers: [AntDesignVueResolver()],
    // }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),
    vueJsx(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve('src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    Pages({
      dirs: [
        { dir: 'src/views', baseRoute: '' },
      ],
      // extendRoute(route, parent) {
      //   // if (route.path === "/") {
      //     // return route;
      //   // }
      //   // Augment the route with meta that indicates that the route requires authentication.
      //   // return {
      //     // ...route,
      //     // meta: { auth: true },
      //   // };
      // },
      exclude: ['**/components/*.vue'],
    }),
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
			'@': resolve('src'),
      "@Views": resolve("src/views"),
      "@Utils": resolve("src/utils"),
      "@Store": resolve("src/store"),
      "@Com": resolve("src/components"),
		}
	},
  build: {
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // globals: {
        //   vue: 'Vue'
        // },

        // chunkFileNames: 'assets/chunkjs/[name]-[hash].js',
        // entryFileNames: 'assets/entryjs/[name]-[hash].js',
        // assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',

        manualChunks: configManualChunk, // 手动拆分代码
      },
    },
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位），默认500
  }
})
