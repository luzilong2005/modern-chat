import "./styles/index.css";
import App from "./App.vue";
import { i18n } from "./i18n";
import { router } from "./router";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { setupVueGlobalErrorHandler, setupWindowGlobalErrorHandler } from "./utils/handler";

const pinia = createPinia();
pinia.use(createPersistedState());

const app = createApp(App);

setupVueGlobalErrorHandler(app);
setupWindowGlobalErrorHandler();

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#root");
