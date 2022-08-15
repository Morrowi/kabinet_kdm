<template>
  <div class="col-12 mb-20">

    <div class="b-radius bg-white">
      <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
        <div class="f-18 fw-600">
          Мой маркетолог
        </div>
<!--        <div class="blockHeaderButton">
          <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.3">
              <path d="M13.4874 0.512567C12.804 -0.170848 11.696 -0.170848 11.0126 0.512567C10.3291 1.19598 10.3291 2.30402 11.0126 2.98744C11.696 3.67085 12.804 3.67085 13.4874 2.98744C14.1709 2.30405 14.1709 1.19601 13.4874 0.512567Z" fill="#030229"/>
              <path d="M8.23744 0.512567C7.55402 -0.170848 6.44598 -0.170848 5.76257 0.512567C5.07915 1.19598 5.07915 2.30402 5.76257 2.98744C6.44598 3.67085 7.55402 3.67085 8.23744 2.98744C8.92085 2.30405 8.92085 1.19601 8.23744 0.512567Z" fill="#030229"/>
              <path d="M2.98744 0.512567C2.30402 -0.170848 1.19598 -0.170848 0.512564 0.512567C-0.170852 1.19598 -0.170852 2.30402 0.512564 2.98744C1.19598 3.67085 2.30402 3.67085 2.98744 2.98744C3.67085 2.30405 3.67085 1.19601 2.98744 0.512567Z" fill="#030229"/>
            </g>
          </svg>
        </div>-->
      </div>
      <div class="border-bottom  p-3">
        <transition name="fade" >
        <div class="position-absolute" v-if="loading">Loading...</div>
        <div v-else class="d-flex justify-content-between me-0 ml-0 align-items-start">
          <div class="d-flex align-items-center">

            <div class="avaBlock me-3">
              <router-link  to="/dashboard/marketer">
                <Avatar size="xlarge"  shape="circle" :image="'http://panel.kdm1.biz/uploads/'+marketolog.id+'/'+marketolog.avatar" />
              </router-link>
            </div>
            <div class="d-flex flex-column warp_username">
              <router-link  class="f-16 mb-1" to="/dashboard/marketer">
                {{ marketolog.username }}
              </router-link>
              <div class="f-18 fw-600 d-flex align-items-center lh-1">
                <div class="me-1 d-flex align-items-center">
                  <star-rating :rating="marketolog.rating"  :read-only="true" :round-start-rating="false" :star-size="18" :rounded-corners="false" :border-width="0" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :padding="7" :show-rating="false" inactive-color="#B2BAC6" active-color="#EE735A" ></star-rating> <div class="ms-1">{{marketolog.rating}}</div>
                </div>

              </div>
            </div>
          </div>
          <div class="tabletInfo online" v-if="online"> Онлайн </div>
          <div class="tabletInfo" v-else> Оффлайн </div>
        </div>
        </transition>
      </div>
      <div class="pe-3 ps-3 pt-2 pb-2">
        <div class="d-flex justify-content-center justify-content-lg-end">
          <div class="button buttonBorder"  @click="showChat">
            Написать в чат
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'primevue/avatar';
import axios from "axios";
import authHeader from "@/services/auth-header";
import StarRating from 'vue-star-rating'

export default {
  name: "Marketer",
  components: {
    Avatar,
    StarRating
  },
  data() {
    return{
      loading:true,
      marketolog:null,
      online:false
    }
  },
  watch:{

  },
  methods: {
    async initMarketolog(){
      axios.post( 'http://panel.kdm1.biz/api/marketolog/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        console.log(resp.data);
        this.marketolog = resp.data;
      }).catch(function(error){
        console.log(error);
      }).finally(() => (this.loading = false));
    },
    async initOnline(){
      axios.post( 'http://panel.kdm1.biz/api/user/online',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        if(resp.data === 'online'){
          this.online = true;
        } else {
          this.online = false;
        }
        setTimeout(()=>{
          this.initOnline();
        },30000);
      }).catch(function(error){
        console.log(error);

      }).finally(() => (this.loading = false));
    },
    showChat() {
      if(this.$store.state.showChat){
        this.$store.dispatch('showChat', false );
      } else {
        this.$store.dispatch('showChat', true );
      }

    }
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  async  mounted() {


   await this.initMarketolog();
   await this.initOnline();
    //console.log(this.$store.state.auth.user.manager);
  },
  created() {

    //console.log(this.currentUser.manager)
  },

};
</script>
<style>
.warp_username a {
  color: #171717;
}
.warp_username a:hover {
  color: #EE735A;
}
</style>