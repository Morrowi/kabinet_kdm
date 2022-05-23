<template>
  <div class="mx-n075">
    <chat-window
        :height="'calc(100vh - 10vh)'"
        :current-user-id="currentUserId"
        :rooms="rooms"
        :rooms-loaded="roomsLoaded"
        :loading-rooms="loadingRooms"
        :messages="messages"
        :messages-loaded="messagesLoaded"
        @fetch-messages="onFetchMessages"
        @send-message="sendMessage"
        @open-file ="openFile"
    />
    <button @click="testSound"></button>
  </div>

</template>

<script>
import authHeader from "@/services/auth-header";
import axios from "axios";

import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

import {Howl} from 'howler';


import {io} from "socket.io-client";
const socket = io('http://panel.kdm1.biz/', {  path: "/api/chat" });
export default {
  name: "Index admin",
  components: {
    ChatWindow

  },
  setup() {
    //События еслли уходит с сайта
    window.onbeforeunload = () => {
      socket.emit("leave", this.$store.state.auth.user.id);
    };
  },
  data() {
    let user = this.$store.state.auth.user;

    return{

      rooms: [],
      activeRoom:'',
      roomsLoaded: true,
      messagesLoaded: false,
      loadingRooms: false,
      messages: [],
      currentUserId: user.id
    }
  },
  watch:{

  },
  created() {

  },
  methods: {
    notySound(){
      var sound = new Howl({
        src: ['http://panel.kdm1.biz/sound/notification.mp3']
      });

      sound.play();
    },
    getRooms(){
      socket.on("get room", data => {
        this.rooms=data;
        //console.log(data);
      });
    },
    getMsg(){
      socket.on("message_m", data => {

        if(this.activeRoom === data.room ){
          this.messages.push(data.msg);
        } else {
          for (let i in this.rooms){
            if(data.room === this.rooms[i].roomId){
              this.rooms[i].unreadCount++;
            }
          }
          this.notySound();
          //console.log(this.rooms);
          //console.log(data);
        }
      });
    },
    loadRoom(){
      axios.post('http://panel.kdm1.biz/api/chat',
          '',
          {headers: authHeader()}
      ).then((resp)=>{
        //console.log(resp.data);
        let join ={
          is: 'marketolog',
          rooms:resp.data,
        }
        socket.emit("subscribe", join);
      }).catch(function(error){
        console.log(error);
      });
    },
    onFetchMessages(data) {
      socket.emit("get msg", data.room.roomId);
      this.activeRoom=data.room.roomId;
      for (let i in this.rooms){
        if(data.room.roomId === this.rooms[i].roomId){
          this.rooms[i].unreadCount=0;
        }
      }
      socket.on("load msg", data => {
        //console.log(data);
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
      /*socket.on("message_m", data => {
        //console.log('[message_m] line 125',data);

      });*/
      console.log(message);
      console.log(roomId);
      console.log(replyMessage);
      /*if (replyMessage) {
        message.replyMessage = {
          _id: replyMessage._id,
          content: replyMessage.content,
          sender_id: replyMessage.senderId
        }
        if (replyMessage.files) {
          message.replyMessage.files = replyMessage.files
        }
      }
      const { id } = await firestoreService.addMessage(roomId, message)
      if (files) {
        for (let index = 0; index < files.length; index++) {
          await this.uploadFile({ file: files[index], messageId: id, roomId })
        }
      }
      firestoreService.updateRoom(roomId, { lastUpdated: new Date() })*/
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
  },
  mounted() {
    this.loadRoom();
    this.getRooms();
    this.getMsg();
  },

};
</script>
