// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { MotionPlugin } from "@vueuse/motion";

// Benar
const app = createApp(App);
app.use(MotionPlugin);
app.mount("#app");
