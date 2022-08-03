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
                  <div class="tabletInfo online" v-if="online"> Онлайн </div>
                  <div class="tabletInfo" v-else> Оффлайн </div>
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
                <div class="button buttonBorder" @click="showChangeMarketolog = !showChangeMarketolog">
                  Заменить
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">

        </div>
      </div>
      <div :class="{show: open}" :style="[open?'display: block':'display: none']"  class="modal fade warp_modal" @keydown.esc="open = false">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <div class="title">Оценка работы </div>
              <div class="close" @click="open = false"></div>
            </div>
            <div class="modal-body">
                <div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    {{textRaiting}}
                  </div>
                  <div class="col-12 d-flex justify-content-center">
                    <star-rating @update:rating ="setRating" @hover:rating ="setRatingText" :rating="rating" :star-size="27" :rounded-corners="false" :border-width="0" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :padding="7" :show-rating="false" inactive-color="#EFF0F6" active-color="#EE735A" ></star-rating>
                  </div>
                  <div class="col-12">
                      <textarea ref="contentTextArea" id="contentTextArea" class="p-inputtextarea"  placeholder="Ваш комментарий..." v-model="valueEditor"></textarea>
                  </div>
                </div>

            </div>
            <div class="d-flex justify-content-start justify-content-between">
              <button @click="submitForm" type="button" class="button blueButton">Готово</button>
            </div>

          </div>
        </div>
      </div>
      <Toast />
    </div>
    <Dialog v-model:visible="showChangeMarketolog" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '70vw'}" :modal="true">
    <template #header>
      <h4>Заменить маркетолога</h4>
    </template>
      <div class="col-lg-12 mb-4" v-for="marketolog in Marketologs" :key="marketolog.id" :id="marketolog.id">
        <div class="b-radius bg-white formTarifItem ml-3 mr-3">
          <div class="border-bottom p-3">
            <div class="row justify-content-between mr-0 ml-0 align-items-start position-relative">
              <div class="d-flex">
                <div class="avaBlock me-5 d-flex align-items-center flex-column">
                  <div class="bigAvaBlock mb-3">
                    <Avatar shape="circle" :image="marketolog.avatar" />
                  </div>
                  <div class="f-18 fw-600 d-flex align-items-center lh-1">
                    <div class="me-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.15076 1.36588C7.54204 0.736562 8.45796 0.73656 8.84924 1.36587L10.8006 4.50441C10.9383 4.72583 11.157 4.88472 11.4101 4.94723L14.9981 5.83325C15.7175 6.01091 16.0005 6.882 15.5229 7.4486L13.141 10.2743C12.973 10.4737 12.8894 10.7308 12.9082 10.9908L13.1743 14.677C13.2276 15.4161 12.4866 15.9544 11.8002 15.6753L8.37669 14.2832C8.13517 14.185 7.86483 14.185 7.62331 14.2832L4.19982 15.6753C3.51337 15.9544 2.77238 15.4161 2.82573 14.677L3.0918 10.9908C3.11057 10.7308 3.02704 10.4737 2.859 10.2743L0.477088 7.4486C-0.000513792 6.882 0.282519 6.01091 1.00194 5.83325L4.58988 4.94723C4.843 4.88472 5.06171 4.72583 5.19937 4.50441L7.15076 1.36588Z" fill="#EE735A"/>
                      </svg>
                    </div>
                    <span class="pt-1">{{ marketolog.rating}}</span>
                  </div>
                </div>

                <div class="d-flex flex-column">
                  <div class="f-18 fw-600 mb-3">
                    {{ marketolog.username}}
                  </div>
                  <div class="f-14 color-2 lh-22" v-html="marketolog.description">

                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="row justify-content-between">
            <div class="col-auto mx-2 my-3">
              <div v-if="marketolog.reviews_count > 0" class=" cursor-pointer px-5" @click="showReviews(marketolog.id);">Отзывы ({{marketolog.reviews_count}}) </div>
              <div v-else class=" px-5" >Отзывы ({{marketolog.reviews_count}}) </div>
            </div>
            <div class="col-auto mx-2 my-3">
              <div class="button blueButton px-5" @click="selectedManager(marketolog.id);">Выбрать</div>
            </div>
          </div>
        </div>
      </div>
  </Dialog>
  <Dialog header="Отзывы" v-model:visible="displayReviews" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
    <DataTable :value="reviews" :paginator="true" :rows="1" responsiveLayout="scroll">
      <Column field="moderation" >
        <template #body="{data}">
          <div>{{data.date_insert}}</div>
          <div v-html="data.text"></div>
        </template>
      </Column>
    </DataTable>
  </Dialog>

</template>


<script>

import Avatar from 'primevue/avatar';
import axios from "axios";
import authHeader from "@/services/auth-header";
import StarRating from 'vue-star-rating'
import Dialog from 'primevue/dialog';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: "Marketer",
  components: {
    Avatar,
    StarRating,
    Dialog,
    Toast,
    DataTable,
    Column
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
      rating:5,
      Marketologs:[],
      showChangeMarketolog:false,
      reviews:null,
      currentUserId: user.id,
      displayReviews: false,
      online:false,
      textRaiting:'Отлично'
    }
  },
  watch:{

  },
  methods: {
    initOnline(){
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
    showModa(){
      this.open = true;
      this.$nextTick(() => {

        this.$refs.contentTextArea.focus();
      })
    },
    setRating(rating){
      this.rating= rating;
    },
    setRatingText(rating){
      switch (rating) {
        case 1:
          this.textRaiting= 'Не то, что я ожидал';
          break;
        case 2:
          this.textRaiting= 'Можно лучше';
          break;
        case 3:
          this.textRaiting= 'Приемлемо';
          break;
        case 4:
          this.textRaiting= 'Хорошо';
          break;
        case 5:
          this.textRaiting= 'Отлично';
          break;
      }

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
    initMarketologs(){
      axios.get( 'http://panel.kdm1.biz/api/marketolog/').then((resp)=>{
        this.Marketologs = resp.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    showReviews(id){
      axios.post( 'http://panel.kdm1.biz/api/reviews/show/'+id).then((resp)=>{
        for ( const key in resp.data){
          resp.data[key].date_insert= this.dateToYMD(new Date(resp.data[key].date_insert));
        }
        this.reviews = resp.data;

        console.log(resp.data);
      }).catch(function(error){
        console.log(error);
      });
      console.log(id);

      this.displayReviews=true;
    },
    dateToYMD(date) {
      let d = date.getDate();
      let m = date.getMonth() + 1; //Month from 0 to 11
      let y = date.getFullYear();
      let h = date.getHours();
      h = ("0" + h).slice(-2);
      let mm = date.getMinutes();
      mm = ("0" + mm).slice(-2);
      let ss = date.getSeconds();
      ss = ("0" + ss).slice(-2);
      return  ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y +' '+ h+':'+mm+':'+ss;

    }
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.initMarketologs();

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
    height: 54px;
    background: #FFFFFF;
    border: 1px solid #94A2AB;
    border-radius: 6px;
    outline:none;
    padding: 14px;
  }
  .p-inputtextarea:focus,
  .p-inputtextarea:active{
    border: 1px solid #ced4da !important;
    outline:1px solid #ced4da;
  }

  .warp_modal .modal-dialog{
    max-width: 360px;
    border: 1px solid #EFF0F6;
    overflow: hidden;
    box-shadow: 0px 15px 50px rgba(160, 163, 189, 0.1);
    border-radius: 10px;
  }
  .warp_modal .modal-content{
    border: none;
  }

  .warp_modal .title{
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
    color: #171717;
    font-family: 'Inter', sans-serif;
  }
  .warp_modal .modal-header{
    padding: 11px 20px;
    position: relative;
    justify-content: center;
  }
  .warp_modal .modal-header .close{
    position: absolute;
    right: 23px;
    top: 20px;
    display: block;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
  .warp_modal .modal-header .close::before{
    content:'';
    width: 15px;
    height: 1px;
    background-color: #000000;
    display: block;
    position: absolute;
    top: 50%;
    left: calc(50% - 7px);
    transform: rotate(50grad);
  }
  .warp_modal .modal-header .close::after{
    content:'';
    width: 15px;
    height: 1px;
    background-color: #000000;
    display: block;
    position: absolute;
    top: 50%;
    left: calc(50% - 7px);
    transform: rotate(-50grad);
  }

  .warp_modal .button {
    width: 100%;
    padding: 15px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    margin: 0 20px 35px;
  }

  .warp_modal .modal-body{
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 9px;
  }

</style>