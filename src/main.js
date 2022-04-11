import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DropZone from 'dropzone-vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'
import "./assets/css/style.css";


createApp(App)
  .use(router)
  .use(store)
  .use(DropZone)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
