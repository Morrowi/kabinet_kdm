<template>
  <div class="contentBlock">
    <transition name="fade" >
    <div class="position-absolute" v-if="loading">Loading...</div>
    <div class="row"  v-else>
      <div class="col-12">
          <div class="messBlockWrap">
            <div class="bessBlockItem f-14 border-bottom d-flex justify-content-between" v-for="noty in arrNoty" :key="noty.id" :class="{'active':noty.viewed}" @click="showNoty(noty.id);">
              <div class="titleBlock cropBlock"><span>{{ noty.text }}</span></div>
              <div class="infoBlock">{{ noty.data_insert }}</div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="warp_link_all_noty">
              <div class="colMessBlock f-14 color-blue">
                <router-link to="/dashboard/notifications">Все уведомления</router-link>
              </div>
            </div>
          </div>
      </div>
    </div>
    </transition>
  </div>
  <Dialog header="Уведомление" v-model:visible="displayNoty" position="center" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
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
  name: "Index notification",
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
        setTimeout(()=>{
          this.initNoty();
        },5000);

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
.warp_link_all_noty{
  padding-left: 20px;
  padding-top: 10px;
}
</style>
