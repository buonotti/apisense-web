import {createApp} from "vue";
import "./style.css";
import App from "./App.vue";
import {router} from "./plugins/router";
import {pinia, useStore} from "./plugins/pinia";

const app = createApp(App);
app.use(router);
app.use(pinia);

const store = useStore();
store.init();

const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

app.mount("#app");