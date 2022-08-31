<template>
  <transition name="fade" >
  <div class="loading" v-if="loading">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100"  xml:space="preserve">
        <circle fill="none" stroke="#fff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
      <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
          <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite" />
        </line>
      <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
          <animateTransform
              attributeName="transform"
              dur="15s"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite" />
        </line>
      </svg>
  </div>
  <div class="contentBlock mb-5" v-else>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="b-radius bg-white">
          <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
            <div class="f-18 fw-600">
              У вас <span class="color-orange">{{viewed}}</span> непрочитанных уведомления
            </div>
          </div>
          <div class="myTable border-bottom pb-3">
            <div class="topBlock">
              <div class="titleBlock">Описание</div>
              <div class="infoBlock">Дата создания</div>
            </div>
            <div class="contentBlock">
              <div class="itemBlock bessBlockItem" v-for="noty in arrNoty" :key="noty.id" :class="{'active':noty.viewed}" @click="showNoty(noty.id);">
                <div class="titleBlock cropBlock"><span>{{ noty.text }}</span></div>
                <div class="infoBlock">{{ noty.data_insert }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
  <Dialog header="Уведомление" v-model:visible="displayNoty" position="center" :modal="true"  :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
    <div class="f-12 color-1 mb-3">
      {{ showNotyOne.data_insert }}
    </div>
    <div class="f-16">
      {{ showNotyOne.text }}
    </div>
  </Dialog>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
import Dialog from 'primevue/dialog';
export default {
  name: "Notification",
  components: {
    Dialog

  },
  data() {
    return{
      arrNoty:[],
      loading:true,
      displayNoty: false,
      viewed:0,
      showNotyOne:null
    }
  },
  watch:{

  },
  methods: {
    initNoty(){
      axios.post( 'http://panel.kdm1.biz/api/notifications/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{

        for(let i in resp.data){
          let date = new Date(resp.data[i].data_insert);
          let d = date.getDate();
          let m = date.getMonth(); //Month from 0 to 11
          let y = date.getFullYear();
          resp.data[i].data_insert = ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y;
          if(resp.data[i].viewed === 0){
            resp.data[i].viewed = true;
            this.viewed ++;
          } else {
            resp.data[i].viewed = false;
          }
        }
        this.arrNoty =resp.data;


      }).catch(function(error){
        console.log(error);

      }).finally(() => (this.loading = false));
    },
    showNoty(id){

      axios.post( 'http://panel.kdm1.biz/api/notifications/show/'+id,
      '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{

        let date = new Date(resp.data.data_insert);
        let d = date.getDate();
        let m = date.getMonth(); //Month from 0 to 11
        let y = date.getFullYear();
        let h = date.getHours();
        h = ("0" + h).slice(-2);
        let mm = date.getMinutes();
        mm = ("0" + mm).slice(-2);
        resp.data.data_insert = ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y+' в '+ h+':'+mm;


        this.showNotyOne=resp.data;
        this.displayNoty = true;
        console.log(resp.data);
        for (let i in  this.arrNoty){
          if( this.arrNoty[i].id === id){
            if( this.arrNoty[i].viewed){
              this.viewed --;
            }
            this.arrNoty[i].viewed=false;

          }
        }

      }).catch(function(error){
        console.log(error);
      });



    },
  },
  mounted() {
    this.initNoty();
  }
};
</script>
<style>

</style>