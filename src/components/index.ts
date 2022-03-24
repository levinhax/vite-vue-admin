import type { App } from 'vue'

export default {
  install(app: App) {
    const modules = import.meta.globEager('./**/*.{vue,ts,tsx}')

    Object.keys(modules).forEach((key: string) => {
      const name = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1')
      app.component(`Com${name}`, modules[key]?.default || modules[key])
    })
  },
}
