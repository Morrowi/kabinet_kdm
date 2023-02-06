<template>
  <div class="b-radius bg-white">
    <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
      <router-link to="/dashboard/reports" ><div class="f-18 fw-600 color-black">Данные по рекламе</div> </router-link>
    </div>
    <div class="row p-3">
      <div class="col-lg-6 pr-2 pl-2 mb-3">
        <div class="border p-2 b-radius d-flex flex-column align-items-center justify-content-center">
          <div class="f-14 color-1 mb-2">
            Клики
          </div>
          <div class="f-18 fw-600 mb-2">
            17 050 шт
          </div>
          <div class="d-flex align-items-center color-green f-14">
            <div class="me-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3332 4L8.99984 10.3333L5.6665 7L0.666504 12" stroke="#29B147" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.3335 4H15.3335V8" stroke="#29B147" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span>
                                            32,1%
                                        </span>
          </div>
        </div>
      </div>
      <div class="col-lg-6 pr-2 pl-2 mb-3">
        <div class="border p-2 b-radius d-flex flex-column align-items-center justify-content-center">
          <div class="f-14 color-1 mb-2">
            Расходы
          </div>
          <div class="f-18 fw-600 mb-2">
            2 144 965 ₽
          </div>
          <div class="d-flex align-items-center color-red f-14">
            <div class="me-1">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3332 12.5L8.99984 6.16667L5.6665 9.5L0.666504 4.5" stroke="#F26464" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.3335 12.5H15.3335V8.5" stroke="#F26464" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span>
                                            8%
                                        </span>
          </div>
        </div>
      </div>
      <div class="col-lg-6 pr-2 pl-2 mb-3">
        <div class="border p-2 b-radius d-flex flex-column align-items-center justify-content-center">
          <div class="f-14 color-1 mb-2">
            Средняя цена клика
          </div>
          <div class="f-18 fw-600 mb-2">
            31 ₽
          </div>
          <div class="d-flex align-items-center color-green f-14">
            <div class="me-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3332 4L8.99984 10.3333L5.6665 7L0.666504 12" stroke="#29B147" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.3335 4H15.3335V8" stroke="#29B147" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span>
                                            3%
                                        </span>
          </div>
        </div>
      </div>
      <div class="col-lg-6 pr-2 pl-2 mb-3">
        <div class="border p-2 b-radius d-flex flex-column align-items-center justify-content-center">
          <div class="f-14 color-1 mb-2">
            Конверсии
          </div>
          <div class="f-18 fw-600 mb-2">
            13,3 %
          </div>
          <div class="d-flex align-items-center color-red f-14">
            <div class="me-1">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3332 12.5L8.99984 6.16667L5.6665 9.5L0.666504 4.5" stroke="#F26464" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.3335 12.5H15.3335V8.5" stroke="#F26464" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span>
                                            18,79 %
                                        </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";


export default {
  name: "Report",
  components: {

  },
  data() {
    return{
     arrReport:null
    }
  },
  watch:{

  },
  methods: {
    async initReport(){
      axios.post( 'http://panel.kdm1.biz/api/marketolog/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        this.arrReport = resp.data;

      }).catch(function(error){
        console.log(error);
      }).finally(() => (this.loading = false));
    },
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  async  mounted() {
   await this.initReport();
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
.result-add-riv{
  display: none;
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
