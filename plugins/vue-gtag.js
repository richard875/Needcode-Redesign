import VueGtag from "vue-gtag-next";
// import { GOOGLE_ANALYTICS_ID } from "../key/googleAnalytics";

export default defineNuxtPlugin((nuxtApp) => {
  const id = process.env.GOOGLE_ANALYTICS_ID;
  console.log(`Say hello: ${id}`);
  console.log(process.env);
  console.log(process.env.NODE_VERSION);
  console.log(process.env.NODE_ENV);

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: id,
    },
  });
});
