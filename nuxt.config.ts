import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // app
  app: {
    head: {
      title: "A better way to prepare for coding interviews - Neetcode.io",
      titleTemplate:
        "%s - A better way to prepare for coding interviews - Neetcode.io",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        // {
        //   hid: "description",
        //   name: "description",
        //   content: "A better way to prepare for coding interviews - Neetcode.io",
        // },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "assets/images/assembly_icon.svg",
        },
      ],
    },
  },
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
          "bx-data-table",
          "bx-table",
          "bx-table-head",
          "bx-table-header-row",
          "bx-table-header-cell",
          "bx-table-body",
          "bx-table-row",
          "bx-table-cell",
          "bx-modal",
          "bx-modal-header",
          "bx-modal-close-button",
          "bx-modal-label",
          "bx-modal-heading",
          "bx-modal-body",
          "bx-checkbox",
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
