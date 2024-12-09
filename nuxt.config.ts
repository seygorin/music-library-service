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
      apiBaseUrl: process.env.NUXT_API_BASE_URL || 'http://localhost:4000',
    },
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        prependPath: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  plugins: ['~/plugins/auth.client.ts', '~/plugins/toast.client.ts'],

  app: {
    head: {
      titleTemplate: '%s - Home Music Library',
      title: 'Home Music Library',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'A modern music library application for managing your favorite artists, albums and tracks',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})
