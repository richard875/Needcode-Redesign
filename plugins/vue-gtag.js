import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const id = config.public.googleAnalyticsId;

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: id,
    },
  });
});
