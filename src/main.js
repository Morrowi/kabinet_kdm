import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DropZone from 'dropzone-vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import { FontAwesomeIcon } from './plugins/font-awesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "./assets/css/style.css";

//import SocketIO from 'socket.io-client'


import Chat from 'vue3-beautiful-chat'


library.add(faUserSecret)


createApp(App)
    .use(router)
    .use(store)
    .use(DropZone)
    .use(Chat)
    /*.use(new VueSocketIO({
      debug: true,
      connection: SocketIO('http://panel.kdm1.biz:8001', { path: "/api/chat" }),
      vuex: {
          store,
          actionPrefix: 'SOCKET_',
          mutationPrefix: 'SOCKET_'
      },
       //Optional options
  }))*/
  /*.use(Socketio, {
      connection: 'http://panel.kdm1.biz:8001',
      options: {
            // Your Socket.io options here
      }
  })*/
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount("#app");
