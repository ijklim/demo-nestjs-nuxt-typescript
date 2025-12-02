const app = {
  title: 'Retro Console Explorer',
  version: '1.1.0',
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: app.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover the golden age of gaming. Explore classic consoles and their legendary titles.' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
      env: process.env.NODE_ENV,
      title: app.title,
      version: app.version,
    },
  },

  // Enable file watching with polling for Docker on Windows
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
})
