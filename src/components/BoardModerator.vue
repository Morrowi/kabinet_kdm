<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <div class="col-lg-2 bg-black mobMenuWrap">
        <div class="p-2 h-100">
          <div class="d-flex flex-column justify-content-between leftMenuBlockH  h-100">
            <div class="mb-5 stickyTop">
              <div class="d-flex mb-3 align-items-center mb-4">
                <div class="kdmLogo me-2">
                  <img src="./../assets/image/kdm-logo.svg" alt="logo">
                </div>
                <div class="f-14 color-1">
                  Клиника доброго
                  <br>
                  <span class="color-white">маркетолога</span>
                </div>
              </div>
              <ul class="menuLinkBody">
                <li class="d-flex mb-4">
                  <router-link to="/mod" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_250_45956)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54 0H5.92C7.33 0 8.46 1.15 8.46 2.561V5.97C8.46 7.39 7.33 8.53 5.92 8.53H2.54C1.14 8.53 0 7.39 0 5.97V2.561C0 1.15 1.14 0 2.54 0ZM2.54 11.4697H5.92C7.33 11.4697 8.46 12.6107 8.46 14.0307V17.4397C8.46 18.8497 7.33 19.9997 5.92 19.9997H2.54C1.14 19.9997 0 18.8497 0 17.4397V14.0307C0 12.6107 1.14 11.4697 2.54 11.4697ZM17.4601 0H14.0801C12.6701 0 11.5401 1.15 11.5401 2.561V5.97C11.5401 7.39 12.6701 8.53 14.0801 8.53H17.4601C18.8601 8.53 20.0001 7.39 20.0001 5.97V2.561C20.0001 1.15 18.8601 0 17.4601 0ZM14.0801 11.4697H17.4601C18.8601 11.4697 20.0001 12.6107 20.0001 14.0307V17.4397C20.0001 18.8497 18.8601 19.9997 17.4601 19.9997H14.0801C12.6701 19.9997 11.5401 18.8497 11.5401 17.4397V14.0307C11.5401 12.6107 12.6701 11.4697 14.0801 11.4697Z" fill="#6A7686"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_250_45956">
                              <rect width="20" height="20" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Главная
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/mod/tasks" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.47489 0.304838C8.11746 -0.101613 11.8825 -0.101613 15.5251 0.304838C16.8927 0.457438 18.0932 1.1958 18.8527 2.26811L9.41014 11.6953L6.49652 8.78643C6.15098 8.44145 5.59074 8.44145 5.2452 8.78643C4.89965 9.13141 4.89965 9.69074 5.2452 10.0357L8.78448 13.5693C9.13002 13.9143 9.69026 13.9143 10.0358 13.5693L19.6101 4.01052C19.6366 4.13957 19.6577 4.27062 19.6733 4.40343C20.1089 8.12181 20.1089 11.8782 19.6733 15.5966C19.4198 17.7602 17.6798 19.4547 15.5251 19.6952C11.8825 20.1016 8.11746 20.1016 4.47489 19.6952C2.3202 19.4547 0.580173 17.7602 0.326703 15.5966C-0.108901 11.8782 -0.108901 8.12181 0.326703 4.40343C0.580173 2.23977 2.3202 0.545267 4.47489 0.304838Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Задачи
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/mod/chat" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.47489 0.304838C8.11746 -0.101613 11.8825 -0.101613 15.5251 0.304838C16.8927 0.457438 18.0932 1.1958 18.8527 2.26811L9.41014 11.6953L6.49652 8.78643C6.15098 8.44145 5.59074 8.44145 5.2452 8.78643C4.89965 9.13141 4.89965 9.69074 5.2452 10.0357L8.78448 13.5693C9.13002 13.9143 9.69026 13.9143 10.0358 13.5693L19.6101 4.01052C19.6366 4.13957 19.6577 4.27062 19.6733 4.40343C20.1089 8.12181 20.1089 11.8782 19.6733 15.5966C19.4198 17.7602 17.6798 19.4547 15.5251 19.6952C11.8825 20.1016 8.11746 20.1016 4.47489 19.6952C2.3202 19.4547 0.580173 17.7602 0.326703 15.5966C-0.108901 11.8782 -0.108901 8.12181 0.326703 4.40343C0.580173 2.23977 2.3202 0.545267 4.47489 0.304838Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Чат
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/mod/reports" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.2336 0.208852C9.2336 0.0858126 9.12818 -0.0112936 9.00577 0.00106776C3.94783 0.51181 0 4.78234 0 9.97495C0 15.5116 4.48837 20 10.025 20C12.8075 20 15.3254 18.866 17.1411 17.0363C17.2279 16.9489 17.2183 16.8061 17.1225 16.7287L9.52757 10.5905C9.34164 10.4402 9.2336 10.214 9.2336 9.97495V0.208852Z" fill="#6A7686"/>
                          <path d="M18.1184 15.4983C18.2141 15.5756 18.3556 15.5551 18.4229 15.4521C19.2767 14.1456 19.834 12.6273 19.9989 10.9937C20.0113 10.8713 19.9141 10.7664 19.7911 10.7664H12.8604C12.6614 10.7664 12.573 11.0165 12.7277 11.1416L18.1184 15.4983Z" fill="#6A7686"/>
                          <path d="M19.7911 9.18349C19.9142 9.18349 20.0113 9.07813 19.9989 8.95571C19.522 4.23289 15.7671 0.477939 11.0443 0.0010623C10.9219 -0.0112984 10.8165 0.0858128 10.8165 0.208852V8.86691C10.8165 9.04175 10.9582 9.18349 11.1331 9.18349H19.7911Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Отчет по рекламе
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/mod/inpayac" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.81 0H14.191C17.28 0 19 1.78 19 4.83V15.16C19 18.26 17.28 20 14.191 20H5.81C2.77 20 1 18.26 1 15.16V4.83C1 1.78 2.77 0 5.81 0ZM6.08 4.66V4.65H9.069C9.5 4.65 9.85 5 9.85 5.429C9.85 5.87 9.5 6.22 9.069 6.22H6.08C5.649 6.22 5.3 5.87 5.3 5.44C5.3 5.01 5.649 4.66 6.08 4.66ZM6.08 10.74H13.92C14.35 10.74 14.7 10.39 14.7 9.96C14.7 9.53 14.35 9.179 13.92 9.179H6.08C5.649 9.179 5.3 9.53 5.3 9.96C5.3 10.39 5.649 10.74 6.08 10.74ZM6.08 15.31H13.92C14.319 15.27 14.62 14.929 14.62 14.53C14.62 14.12 14.319 13.78 13.92 13.74H6.08C5.78 13.71 5.49 13.85 5.33 14.11C5.17 14.36 5.17 14.69 5.33 14.95C5.49 15.2 5.78 15.35 6.08 15.31Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Счета, оплаты, акты
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <router-link to="/mod/profile" >
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9023 11.58C18.26 11.77 18.536 12.07 18.7301 12.37C19.1083 12.99 19.0776 13.75 18.7097 14.42L17.9943 15.62C17.6162 16.26 16.911 16.66 16.1855 16.66C15.8278 16.66 15.4292 16.56 15.1022 16.36C14.8365 16.19 14.5299 16.13 14.2029 16.13C13.1911 16.13 12.3429 16.96 12.3122 17.95C12.3122 19.1 11.372 20 10.1968 20H8.80692C7.62145 20 6.68125 19.1 6.68125 17.95C6.66081 16.96 5.81259 16.13 4.80085 16.13C4.46361 16.13 4.15702 16.19 3.90153 16.36C3.5745 16.56 3.16572 16.66 2.81825 16.66C2.08245 16.66 1.37729 16.26 0.99917 15.62L0.29402 14.42C-0.0841044 13.77 -0.104544 12.99 0.273581 12.37C0.437094 12.07 0.743681 11.77 1.09115 11.58C1.37729 11.44 1.56125 11.21 1.73498 10.94C2.24596 10.08 1.93937 8.95 1.07071 8.44C0.0589696 7.87 -0.268057 6.6 0.314459 5.61L0.99917 4.43C1.59191 3.44 2.85913 3.09 3.88109 3.67C4.77019 4.15 5.925 3.83 6.4462 2.98C6.60972 2.7 6.70169 2.4 6.68125 2.1C6.66081 1.71 6.77323 1.34 6.9674 1.04C7.34553 0.42 8.03024 0.02 8.77627 0H10.2172C10.9735 0 11.6582 0.42 12.0363 1.04C12.2203 1.34 12.3429 1.71 12.3122 2.1C12.2918 2.4 12.3838 2.7 12.5473 2.98C13.0685 3.83 14.2233 4.15 15.1226 3.67C16.1344 3.09 17.4118 3.44 17.9943 4.43L18.679 5.61C19.2718 6.6 18.9447 7.87 17.9228 8.44C17.0541 8.95 16.7475 10.08 17.2687 10.94C17.4322 11.21 17.6162 11.44 17.9023 11.58ZM6.60979 10.01C6.60979 11.58 7.90767 12.83 9.51215 12.83C11.1166 12.83 12.3838 11.58 12.3838 10.01C12.3838 8.44005 11.1166 7.18005 9.51215 7.18005C7.90767 7.18005 6.60979 8.44005 6.60979 10.01Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Профиль
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="d-flex mb-4">
                  <a href="javascript:void(0);"  @click="logOut">
                    <div class="menuLinkBlock">
                      <div class="me-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9023 11.58C18.26 11.77 18.536 12.07 18.7301 12.37C19.1083 12.99 19.0776 13.75 18.7097 14.42L17.9943 15.62C17.6162 16.26 16.911 16.66 16.1855 16.66C15.8278 16.66 15.4292 16.56 15.1022 16.36C14.8365 16.19 14.5299 16.13 14.2029 16.13C13.1911 16.13 12.3429 16.96 12.3122 17.95C12.3122 19.1 11.372 20 10.1968 20H8.80692C7.62145 20 6.68125 19.1 6.68125 17.95C6.66081 16.96 5.81259 16.13 4.80085 16.13C4.46361 16.13 4.15702 16.19 3.90153 16.36C3.5745 16.56 3.16572 16.66 2.81825 16.66C2.08245 16.66 1.37729 16.26 0.99917 15.62L0.29402 14.42C-0.0841044 13.77 -0.104544 12.99 0.273581 12.37C0.437094 12.07 0.743681 11.77 1.09115 11.58C1.37729 11.44 1.56125 11.21 1.73498 10.94C2.24596 10.08 1.93937 8.95 1.07071 8.44C0.0589696 7.87 -0.268057 6.6 0.314459 5.61L0.99917 4.43C1.59191 3.44 2.85913 3.09 3.88109 3.67C4.77019 4.15 5.925 3.83 6.4462 2.98C6.60972 2.7 6.70169 2.4 6.68125 2.1C6.66081 1.71 6.77323 1.34 6.9674 1.04C7.34553 0.42 8.03024 0.02 8.77627 0H10.2172C10.9735 0 11.6582 0.42 12.0363 1.04C12.2203 1.34 12.3429 1.71 12.3122 2.1C12.2918 2.4 12.3838 2.7 12.5473 2.98C13.0685 3.83 14.2233 4.15 15.1226 3.67C16.1344 3.09 17.4118 3.44 17.9943 4.43L18.679 5.61C19.2718 6.6 18.9447 7.87 17.9228 8.44C17.0541 8.95 16.7475 10.08 17.2687 10.94C17.4322 11.21 17.6162 11.44 17.9023 11.58ZM6.60979 10.01C6.60979 11.58 7.90767 12.83 9.51215 12.83C11.1166 12.83 12.3838 11.58 12.3838 10.01C12.3838 8.44005 11.1166 7.18005 9.51215 7.18005C7.90767 7.18005 6.60979 8.44005 6.60979 10.01Z" fill="#6A7686"/>
                        </svg>
                      </div>
                      <div class="menuLinkName fw-500 f-14">
                        Выйти
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-10 px-0">
        <div class="vh-100 overflow-auto">
          <div class="d-flex bg-white p-3 justify-content-between align-items-center mb-3 sticky-top">
            <bellNoty/>
            <div class="d-flex align-items-center userTopWrap me-0 me-lg-5">
              <div class="imgUserTop me-2">
                <Avatar shape="circle" :image="'http://panel.kdm1.biz/uploads/'+currentUser.id+'/'+currentUser.avatar" />
              </div>
              <div class="f-14 fw-400">
                {{ currentUser.username }}
              </div>
            </div>
            <div class="mobMenuButton">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
//import UserService from "../services/user.service";
//import SocketioService from '../services/socketio.service.js';
import Avatar from 'primevue/avatar';
import bellNoty from "./bell-noty"

import UserService from "@/services/user.service";
//import { io } from 'socket.io-client';
//const socket = io('http://panel.kdm1.biz/', {  path: "/api/chat" });

export default {
  name: "Moderator",

  components:{
    Avatar,
    bellNoty
  },
  setup() {



  },


  data() {
    //let user = this.$store.state.auth.user;
    //let client = this.$store.state.auth.user.client;
    //console.log(this.$store.state.auth.user);

    return {
      content: "",


    };
  },
  created() {

  },

  methods:{


    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },

  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },

  },
  mounted() {

    UserService.getUserBoard().then(
        (response) => {
          console.log('[role]',response.data.roles);
          if(response.data.roles === 1){
            this.$router.push("/admin");
          }

          //socket.emit("subscribe", this.currentUser.room);
          //socket.emit("get msg", this.currentUser.room);



          this.content = response.data;
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
    //this.getMsg();
  },
};
</script>
