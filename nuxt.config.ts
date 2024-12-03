// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-11',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  css: ['~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/styles/variables" as *;',
        },
      },
    },
  },

  imports: {
    dirs: ['stores'],
  },

  components: {
    dirs: ['~/components', '~/components/modals'],
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:4000/api',
    },
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  plugins: ['~/plugins/auth.client.ts'],
})
