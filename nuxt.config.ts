// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {},
  css: ["~/assets/css/main.css"],
  imports: {
    autoImport: true,
    dirs: ["stores", "composables", "types"],
  },
  modules: ["nuxt-icon", "@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
