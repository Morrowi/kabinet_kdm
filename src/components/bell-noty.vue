<template>
  <div class="noty" @click="showNoty=!showNoty;" :class="{'open':showNoty}">
    <a href="javascript:void(0)">
      <div class="d-flex align-items-center massageTopWrap" :class="{'active':viewedBell}" >
        <div class="bellBlock me-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_250_45995)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 6.79633C16.7071 8.05226 17.039 8.79253 17.7695 9.64559C18.3231 10.2741 18.5 11.0808 18.5 11.956C18.5 12.8302 18.2128 13.6601 17.6373 14.3339C16.884 15.1417 15.8215 15.6573 14.7372 15.747C13.1659 15.8809 11.5937 15.9937 10.0005 15.9937C8.40634 15.9937 6.83505 15.9263 5.26375 15.747C4.17846 15.6573 3.11602 15.1417 2.36367 14.3339C1.78822 13.6601 1.5 12.8302 1.5 11.956C1.5 11.0808 1.6779 10.2741 2.23049 9.64559C2.98384 8.79253 3.29392 8.05226 3.29392 6.79633V6.3703C3.29392 4.68834 3.71333 3.58852 4.577 2.51186C5.86106 0.941697 7.91935 0 9.95577 0H10.0452C12.1254 0 14.2502 0.987019 15.5125 2.62466C16.3314 3.67916 16.7071 4.73265 16.7071 6.3703V6.79633ZM7.07367 18.0608C7.07367 17.5573 7.53582 17.3266 7.96318 17.2279C8.46309 17.1222 11.5093 17.1222 12.0092 17.2279C12.4366 17.3266 12.8987 17.5573 12.8987 18.0608C12.8738 18.5402 12.5926 18.9653 12.204 19.2352C11.7001 19.628 11.1088 19.8767 10.4906 19.9664C10.1487 20.0107 9.81276 20.0117 9.48279 19.9664C8.86362 19.8767 8.27227 19.628 7.76938 19.2342C7.37978 18.9653 7.09852 18.5402 7.07367 18.0608Z" fill="#6A7686"/>
            </g>
            <defs>
              <clipPath id="clip0_250_45995">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="f-14 fw-400  messOn" v-if="viewed!==0">
          Новых уведомлений <span>{{viewed}}</span>
        </div>
        <div class="f-14 fw-400 " v-if="viewed===0">
          Нет новых уведомлений
        </div>
        <div class="close"></div>
      </div>
    </a>
  </div>
  <div class="noty-body" :class="{'open':showNoty}"><Noty/></div>
  <Toast position="bottom-right" group="chat">
    <template #message="slotProps">
      <div  role="alert" aria-live="assertive" aria-atomic="true">
        <div class="p-toast-message-text">
              <span class="p-toast-summary">{{slotProps.message.summary}}</span>
              <div class="p-toast-detail"><router-link to="/dashboard/marketer">{{slotProps.message.detail}}</router-link></div>
        </div>
      </div>

    </template>
  </Toast>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
import Toast from 'primevue/toast';
import Noty from '@/views/user/component/index/Notifications'

import {Howl} from 'howler';
import {io} from "socket.io-client";
const socket = io('http://panel.kdm1.biz/', {  path: "/api/chat" });


export default {
  name: "Tasks user",
  props: {
    isShowHead:{
      type: Boolean,
      default: true,
    },
  },
  components: {
    Toast,
    Noty
  },
  created: function () {
    window.addEventListener('focus',this.hiddenToas);
  },

  data() {

    return{
      showNoty:false,
      viewed:0,
      viewedBell:false
    }
  },
  watch: {},
  methods: {
    hiddenToas(){
      setTimeout(()=>{
        this.$toast.removeAllGroups();
      },3000);
    },
    notySound(){
      let sound = new Howl({
        src: ['http://panel.kdm1.biz/sound/notification.mp3']
      });
      sound.play();
    },
    subscribeSocekt(){
      let data = {
        user_id: this.$store.state.auth.user.id,
        room: this.$store.state.auth.user.room,
      }
      socket.emit("subscribe_noty", data);
    },
    getMsg(){
      socket.on("message_m", data => {
        console.log(data);
        //let msg_c = this.kitcut(data.msg.content, 200);
        //this.$toast.add({summary: 'Новое сообщение', detail:msg_c, styleClass:'message-chat', group:'chat'});
        this.notySound();
      });
    },

    initNoty(){

      axios.post( this.hostapi+'notifications/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        let viewedTmp=0;
        for(let i in resp.data){
          if(resp.data[i].viewed === 0){
            viewedTmp ++;

          }
        }
        if(viewedTmp>0){
          this.viewedBell=true;
        } else {
          this.viewedBell=false;
        }
        this.viewed = viewedTmp;
        setTimeout(()=>{
          this.initNoty();
        },5000);
      }).catch(function(error){
        console.log(error);

      }).finally(() => (this.loading = false));
    },
    dateToYMD(date) {
      var d = date.getDate();
      var m = date.getMonth() + 1; //Month from 0 to 11
      var y = date.getFullYear();
      return ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y ;
    },
    kitcut( text, limit) {
      text = text.trim();
      if( text.length <= limit) return text;
      text = text.slice( 0, limit); // тупо отрезать по лимиту
      let lastSpace = text.lastIndexOf(" ");
      if( lastSpace > 0) { // нашлась граница слов, ещё укорачиваем
        text = text.substr(0, lastSpace);
      }
      return text + "...";
    }




  },
  mounted() {
    this.subscribeSocekt();
    this.getMsg();
    this.initNoty();


  },
};
</script>
