<template>
  <div class="b-radius-top bg-white">
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
              <div class="f-18 fw-600 d-flex align-items-center flex-column">
                <div class="me-1">
                  {{marketolog.rating}}
                </div>
                <span class="pt-1">
                          <star-rating :rating="marketolog.rating"  :read-only="true" :round-start-rating="false" :star-size="18" :rounded-corners="false" :border-width="0" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :padding="5" :show-rating="false" inactive-color="#B2BAC6" active-color="#EE735A" ></star-rating>
                        </span>
              </div>

            </div>
          </div>
          <div class="d-flex flex-column warp_username">
            <div class="f-16">
              {{ marketolog.username}}
            </div>
            <div class="d-flex warp_prop_marketolog">
              <div>
                <span>7</span>
                <br>
                лет опыта
              </div>
              <div>
                <span>160</span>
                <br>
                успешных проектов
              </div>
            </div>
            <div class="f-14 color-2 lh-22" v-html="marketolog.description">

            </div>
            <div class="tabletInfo online" v-if="online"> Онлайн </div>
            <div class="tabletInfo" v-else> Оффлайн </div>
          </div>
        </div>

        </transition>
      </div>
    <div class="btn_add_review">
      <a class="button buttonBorder" href="javascript: void(0);" @click="displayReviews = true;">Оставить отзыв</a>
    </div>
  </div>

  <Dialog header="Оценка работы" v-model:visible="displayReviews"  position="top" :modal="true" :closeOnEscape="true"  :draggable="false" :breakpoints="{'960px': '75vw', '640px': '100vw'}" style="max-width: 360px; width: 100%;" class="warp_modal" :class="{'success': success}">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        {{textRaiting}}
      </div>
      <div class="col-12 d-flex justify-content-center mb-3">
        <star-rating @update:rating ="setRating" @hover:rating ="setRatingText" :rating="rating" :star-size="27" :rounded-corners="false" :border-width="0" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]" :padding="7" :show-rating="false" inactive-color="#EFF0F6" active-color="#EE735A" ></star-rating>
      </div>
      <div class="col-12">
        <textarea ref="contentTextArea" id="contentTextArea" class="p-inputtextarea"  style="height: 135px;" placeholder="Ваш комментарий..." v-model="valueEditor"></textarea>
      </div>
    </div>
    <div class="result-add-riv">Спасибо за оценку</div>
    <template #footer>
      <button @click="submitForm" type="button" class="button blueButton">Готово</button>
    </template>

  </Dialog>
</template>

<script>
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import axios from "axios";
import authHeader from "@/services/auth-header";
import StarRating from 'vue-star-rating'

export default {
  name: "Marketer",
  components: {
    Avatar,
    StarRating,
    Dialog
  },
  data() {
    return{
      success:false,
      displayReviews:false,
      textRaiting:'Отлично',
      rating:5,
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
          this.success=true;

        }
        console.log(resp.data);

        //this.openTask=true;
      }).catch(function(error){
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:error, life: 3000});
        console.log(error);
      });

    },
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
.warp_modal.success .p-dialog-content > .row,
.warp_modal.success .p-dialog-footer{
  display: none;
}

.p-dialog.warp_modal.success .p-dialog-content{
  padding: 0 0 20px !important;
  overflow:visible;

}

.warp_modal.success .result-add-riv{
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #171717;
  background-color: #EAF7ED;
  display: block;
  margin: 0 -15px -16px;
  padding: 15px 0;
}
.btn_add_review{
  display: flex;
  justify-content: flex-end;
  padding: 9px 1rem;
}

.warp_username a {
  color: #171717;
}
.warp_username a:hover {
  color: #EE735A;
}

.warp_username{
  position: relative;
}
.warp_username .tabletInfo{
  position: absolute;
  top: 0;
  right: 0;
}

.warp_username .warp_prop_marketolog{
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  color: #6A7686;
  margin-bottom: 20px;
  margin-top: 12px;
}
.warp_username .warp_prop_marketolog > div{
  margin-right: 60px;
}

.warp_username .warp_prop_marketolog span{
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #171717;
}
.warp_modal .p-dialog-footer button{
  width: 100% !important;
  height: auto !important;
  padding: 15px !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
}
.p-dialog.warp_modal .p-dialog-content{
  padding-left: 20px !important;
  padding-right: 20px !important;
  padding-bottom: 9px !important;
}

</style>