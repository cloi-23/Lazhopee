import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: [ '@pinia/nuxt',  ['cookie-universal-nuxt', { alias: 'cookiz' }]],
  publicRuntimeConfig: {
    BACKEND_URL: process.env.BACKEND_URL
  }
})
