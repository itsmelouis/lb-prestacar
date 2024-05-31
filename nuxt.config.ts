export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    'nuxt-primevue'
  ],
  primevue: {
    options: {
      unstyled: true
    },
    importPT: { from: '~/presets/prestacar/' }
  },
  devtools: { enabled: false },
  tailwindcss: 
  {
    exposeConfig: true,
    config: {
      content: ["presets/**/*.{js,vue,ts}", "pages/**/*.{js,vue,ts}", "components/**/*.{js,vue,ts}, layouts/**/*.{js,vue,ts}"]
    }
  },
  runtimeConfig: {
    auth: {
      name: "nuxt-session",
      password: process.env.NUXT_AUTH_PASSWORD || "",
    },
  },
  nitro: {
    storage: {
      ".data:auth": { driver: "fs", base: "./.data/auth" },
    },
  },
})
