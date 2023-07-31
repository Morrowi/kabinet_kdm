<template>
  <div class="contentBlock">
    <transition name="fade" >
    <div class="position-absolute" v-if="loading"></div>
    <div class="row"  v-else>
      <div class="col-12">
          <div class="messBlockWrap">
            <div class="bessBlockItem f-14 border-bottom d-flex flex-column" v-for="noty in arrNoty" :key="noty.id" :class="{'active':noty.viewed}" @click="showNoty(noty.id, $event);">
              <div class="w-100 d-flex justify-content-between" >
                <div class="titleBlock cropBlock"><span>{{ noty.text }}</span></div>
                <div class="infoBlock">{{ noty.data_insert }}</div>
              </div>
              <div class="bessBlockItem__body border-top w-100">
                <div class="date_time">{{noty.data_insert}} в {{noty.data_insert_time}}</div>
                <div class="bessBlockItem__body-text-full">
                {{ noty.text_full }}
                </div>
              </div>
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

</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
export default {
  name: "Index notification",
  components: {

  },
  data() {
    return{
      arrNoty:[],
      loading:true,
      displayNoty: false,
      viewed:0,
    }
  },
  watch:{

  },
  methods: {
    initNoty(){
      axios.post( this.hostapi+'notifications/',
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
          let h = date.getHours();
           h = ("0" + h).slice(-2);
           let mm = date.getMinutes();
           mm = ("0" + mm).slice(-2);
          resp.data[i].data_insert = ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y;
          resp.data[i].data_insert_time = h+':'+mm;
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
    showNoty(id, e){
      e.currentTarget.classList.toggle('show');
      e.currentTarget.classList.remove('active');

      axios.post( this.hostapi+'notifications/show/'+id,
      '',
          {
            headers: authHeader()
          }
      ).then(()=>{

        // let date = new Date(resp.data.data_insert);
        // let d = date.getDate();
        // let m = date.getMonth(); //Month from 0 to 11
        // let y = date.getFullYear();
        // let h = date.getHours();
        // h = ("0" + h).slice(-2);
        // let mm = date.getMinutes();
        // mm = ("0" + mm).slice(-2);
        // resp.data.data_insert = ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y+' в '+ h+':'+mm;


        // this.showNotyOne=resp.data;
        // this.displayNoty = true;

        // for (let i in  this.arrNoty){
        //   if( this.arrNoty[i].id === id){
        //     if( this.arrNoty[i].viewed){
        //       this.viewed --;
        //     }
        //     this.arrNoty[i].viewed=false;
        //
        //   }
        // }



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
.bessBlockItem__body{
  display: none;
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 25px;
}

.bessBlockItem__body .date_time{
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 160%;
  color: #94A2AB;
  padding-bottom: 5px;
}
.bessBlockItem__body-text-full{
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #171717;
}
.show .bessBlockItem__body{
  display: block;
}


.show .infoBlock{
  display: none;
}
.bessBlockItem.show{
  padding-left: 0;
  padding-right: 0;
}
.bessBlockItem.show .titleBlock{
  padding-left: 20px;
  padding-right: 25px;
  padding-bottom: 10px;
}

</style>
