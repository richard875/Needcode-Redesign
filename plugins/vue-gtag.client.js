import VueGtag from "vue-gtag-next";
import { GOOGLE_ANALYTICS_ID } from "../key/googleAnalytics";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: GOOGLE_ANALYTICS_ID,
    },
  });
});
