import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ["@nuxtjs/tailwindcss"],
  build: {
    transpile: ["vaadin"],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) =>
        [
          "bx-tooltip-icon",
          "bx-btn",
          "bx-search",
          "bx-tag",
          "bx-side-nav-divider",
          "bx-side-nav-link",
        ].includes(tag),
    },
  },
  css: [
    "/src/style/fonts.scss",
    "/src/style/style.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  watch: ["*"],
});
