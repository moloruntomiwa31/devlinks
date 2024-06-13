// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  imports: {
    autoImport: true,
    dirs: ["stores", "composables", "types"],
  },
  modules: ["nuxt-icon", "@pinia/nuxt"],
  // plugins: ["~/plugins/supa.ts"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
