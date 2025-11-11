import App from "./App.vue";
import { i18n } from "./i18n";
import { router } from "./router";
import "./styles/index.css";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { createApp } from "vue";

const pinia = createPinia();
pinia.use(createPersistedState());
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#root");
