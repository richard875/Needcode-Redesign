import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  if (!runtimeConfig) runtimeConfig.googleAnalyticsId = null;

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
  });
});
