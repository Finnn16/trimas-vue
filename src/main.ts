// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { MotionPlugin } from "@vueuse/motion";
import router from "./router/index.js";
import { createI18n } from "vue-i18n";
import "leaflet/dist/leaflet.css";

import en from "./locales/en.json";
import ja from "./locales/ja.json";
import id from "./locales/id.json";

const savedLocale = localStorage.getItem("locale") || "en";
const i18n = createI18n({
  legacy: false, // Gunakan Composition API
  locale: savedLocale,
  fallbackLocale: "en",
  messages: {
    en,
    ja,
    id,
  },
});

const app = createApp(App);
app.use(MotionPlugin);
app.use(router);
app.use(i18n);
app.mount("#app");
