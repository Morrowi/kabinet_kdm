<template>

    <div class="contentBlock mb-5">
      <div class="row mr-0 ml-0 justify-content-between align-items-center mb-3">
        <div class="f-24 fw-600">
          Мой маркетолог
        </div>
      </div>
      <div class="row justify-content-between h-100">
        <div class="col-lg-6">
          <div class="d-flex flex-column justify-content-between h-100">
            <div class="b-radius bg-white">
              <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
                <div class="f-18 fw-600">
                  Маркетолог
                </div>
                <div class="blockHeaderButton">
                  <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.3">
                      <path d="M13.4874 0.512567C12.804 -0.170848 11.696 -0.170848 11.0126 0.512567C10.3291 1.19598 10.3291 2.30402 11.0126 2.98744C11.696 3.67085 12.804 3.67085 13.4874 2.98744C14.1709 2.30405 14.1709 1.19601 13.4874 0.512567Z" fill="#030229"/>
                      <path d="M8.23744 0.512567C7.55402 -0.170848 6.44598 -0.170848 5.76257 0.512567C5.07915 1.19598 5.07915 2.30402 5.76257 2.98744C6.44598 3.67085 7.55402 3.67085 8.23744 2.98744C8.92085 2.30405 8.92085 1.19601 8.23744 0.512567Z" fill="#030229"/>
                      <path d="M2.98744 0.512567C2.30402 -0.170848 1.19598 -0.170848 0.512564 0.512567C-0.170852 1.19598 -0.170852 2.30402 0.512564 2.98744C1.19598 3.67085 2.30402 3.67085 2.98744 2.98744C3.67085 2.30405 3.67085 1.19601 2.98744 0.512567Z" fill="#030229"/>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="border-bottom p-3">
                <div class="d-flex justify-content-between me-0 ml-0 align-items-start">
                  <div class="d-flex align-items-center">
                    <div class="avaBlock me-3 d-flex align-items-center flex-column">
                      <Avatar size="xlarge"  shape="circle" :image="'http://panel.kdm1.biz/uploads/'+marketolog.id+'/'+marketolog.avatar" />
                      <div class="f-18 fw-600 d-flex align-items-center lh-1">
                        <div class="me-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.15076 1.36588C7.54204 0.736562 8.45796 0.73656 8.84924 1.36587L10.8006 4.50441C10.9383 4.72583 11.157 4.88472 11.4101 4.94723L14.9981 5.83325C15.7175 6.01091 16.0005 6.882 15.5229 7.4486L13.141 10.2743C12.973 10.4737 12.8894 10.7308 12.9082 10.9908L13.1743 14.677C13.2276 15.4161 12.4866 15.9544 11.8002 15.6753L8.37669 14.2832C8.13517 14.185 7.86483 14.185 7.62331 14.2832L4.19982 15.6753C3.51337 15.9544 2.77238 15.4161 2.82573 14.677L3.0918 10.9908C3.11057 10.7308 3.02704 10.4737 2.859 10.2743L0.477088 7.4486C-0.000513792 6.882 0.282519 6.01091 1.00194 5.83325L4.58988 4.94723C4.843 4.88472 5.06171 4.72583 5.19937 4.50441L7.15076 1.36588Z" fill="#EE735A"/>
                          </svg>
                        </div>
                        <span class="pt-1">{{marketolog.rating}}</span>
                      </div>
                    </div>

                    <div class="d-flex flex-column">
                      <div class="f-16 mb-1">
                        {{marketolog.username}}
                      </div>
                      <div class="f-14 color-2 pr-5">
                        {{marketolog.description}}
                      </div>
                    </div>

                  </div>
                  <div class="tabletInfo online"> Онлайн </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <div class="d-flex justify-content-center justify-content-lg-start">
                  <div class="button buttonBorder" @click="showModa">
                    Оценить работу
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <div class="f-16 color-2 mb-3">
                На вашем тарифе вы можете заменить маркетолога
              </div>
              <div class="d-flex">
                <div class="button buttonBorder">
                  Заменить
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
<!--          <chat-window-->
<!--              :height="'calc(100vh - 40vh)'"-->
<!--              :current-user-id="currentUserId"-->
<!--              :rooms="room"-->
<!--              :rooms-list-opened ="roomsListOpened"-->
<!--              :rooms-loaded="roomsLoaded"-->
<!--              :show-add-room="showAddRoom"-->
<!--              :show-search="showSearch"-->
<!--              :show-reaction-emojis="showReactionEmojis"-->
<!--              :loading-rooms="loadingRooms"-->
<!--              :single-room="singleRoom"-->
<!--              :show-footer="true"-->
<!--              :messages="messages"-->
<!--              :messages-loaded="messagesLoaded"-->
<!--              @fetch-messages="onFetchMessages"-->
<!--              @send-message="sendMessage"-->
<!--              @open-file ="openFile"-->
<!--          />-->
        </div>
      </div>
      <div :class="{show: open}" :style="[open?'display: block':'display: none']"  class="modal fade " @keydown.esc="open = false">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header p-3">
              <div class="f-24 fw-600">Оценка работы </div>
              <button type="button" class="close" @click="open = false">&times;</button>
            </div>
            <div class="modal-body">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <star-rating @update:rating ="setRating" :rating="rating" :show-rating="false" v-bind:star-size="35"></star-rating>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-3">
                      <textarea ref="contentTextArea" id="contentTextArea" class="p-inputtextarea" rows="5" cols="30" placeholder="Отзыв о работе маркетолога" v-model="valueEditor"></textarea>
                    </div>
                  </div>
                </div>

            </div>
            <div class="d-flex justify-content-start px-3 pb-3 justify-content-between">

              <button @click="submitForm" type="button" class="button buttonBorder">Оценить</button>
            </div>

          </div>
        </div>
      </div>
      <Toast />
    </div>


</template>


<script>

import Avatar from 'primevue/avatar';
import axios from "axios";
import authHeader from "@/services/auth-header";
import StarRating from 'vue-star-rating'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Toast from 'primevue/toast';

//import ChatWindow from 'vue-advanced-chat'
// import 'vue-advanced-chat/dist/vue-advanced-chat.css'
//
// import {io} from "socket.io-client";
// const socket = io('http://panel.kdm1.biz/', {  path: "/api/chat" });

export default {
  name: "Marketer",
  components: {
    Avatar,
    StarRating,
    //ChatWindow,
    Toast
  },
  data() {
    let user = this.$store.state.auth.user;
    //console.log(this.$store.state.auth.user);
    let loading = true;
    return{
      loading,
      marketolog:{},
      open: false,
      valueEditor:null,
      rating:2,

      //chat
      room: [],
      roomsLoaded: true,
      showSearch:true,
      roomsListOpened: false,
      showAddRoom:false,
      showReactionEmojis:true,
      singleRoom:true,
      messagesLoaded: false,
      loadingRooms: false,
      messages: [],
      currentUserId: user.id



    }
  },
  watch:{

  },
  methods: {
    showModa(){
      this.open = true;
      this.$nextTick(() => {

        this.$refs.contentTextArea.focus();
      })
    },
    setRating(rating){
      this.rating= rating;
    },
    submitForm(){
      console.log(this.valueEditor);
      console.log(this.rating);
      let date={
        marketolog: this.$store.state.auth.user.manager.id,
        rating:this.rating,
        text: this.valueEditor
      }

      axios.post( 'http://panel.kdm1.biz/api/reviews/add/',
          date,
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        if(resp.data === 'saccess'){
          this.valueEditor='';
          this.rating='';
          this.open= false;
          this.$toast.add({severity:'success', summary: 'Спасибо за оценку.', detail:'', life: 3000});
        }
        console.log(resp.data);

        //this.openTask=true;
      }).catch(function(error){
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:error, life: 3000});
        console.log(error);
      });

    },

    //chat
    /*
    getRooms(){
      socket.on("get room", data => {
        this.room=[data];
        //console.log('151 - lime ',data);
      });
    },
    getMsg(){
      socket.on("message_m", data => {
        //console.log('[line 63]',data);
        this.messages.push(data.msg);
        //console.log('[this.messages]',this.messages);
      });
    },
    loadRoom(){
      let join ={
        is: 'user',
        rooms:{
          room: this.$store.state.auth.user.room,
          id: this.$store.state.auth.user.id,
          manager: this.$store.state.auth.user.manager.id
        },
      }
      //console.log(join);
      socket.emit("subscribe", join);
    },
    onFetchMessages(data) {
      //console.log('178 line', data);


      socket.emit("get msg", data.room.roomId);

      socket.on("load msg", data => {
       // console.log(data);
        setTimeout(() => {
          this.messages= data;
          this.messagesLoaded = true;
        })
      });

    },
    async sendMessage({ content, roomId, files, replyMessage }) {
      const message = {
        sender_id: this.currentUserId,
        content,
        timestamp: new Date()
      }
      if (files) {
        message.files = await this.formattedFiles(files)
      }
      let dataMsg = {
        room: roomId,
        message:message
      }
      console.log(message)
      socket.emit("message_m", dataMsg);

      console.log(message);
      console.log(roomId);
      console.log(replyMessage);

    },
    async formattedFiles(files) {
      const formattedFiles = []
      console.log(files);

      for (let i in files){
        let file =files[i];
        const messageFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          extension: file.extension || file.type,
          url: file.url || file.localUrl
        }
        if (file.audio) {
          messageFile.audio = true
          messageFile.duration = file.duration
        }
        const blobFile = await fetch(file.localUrl).then(res => res.blob());
        console.log(blobFile);
        messageFile.b64 = await this.blobToBase64(blobFile);

        formattedFiles.push(messageFile)
      }

      return formattedFiles
    },
    async blobToBase64(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
    openFile({ file }) {
      window.open(file.file.url, '_blank')
    },
    */
    //chat - end
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.$toast.removeAllGroups();
      axios.post( 'http://panel.kdm1.biz/api/marketolog/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        //console.log(resp.data);
        this.marketolog = resp.data;
      }).catch(function(error){
        console.log(error);
      }).finally(() => (this.loading = false));

    //this.loadRoom();
    //this.getRooms();
    //this.getMsg();
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        this.open = false;
      }
    });

  },
  created() {

    //console.log(this.currentUser.manager)
  },

};
</script>
<style>
  .p-inputtextarea{
    width: 100%;
    border: 1px solid #ced4da !important;
    outline:none;
  }
  .p-inputtextarea:focus,
  .p-inputtextarea:active{
    border: 1px solid #ced4da !important;
    outline:1px solid #ced4da;
  }
</style>