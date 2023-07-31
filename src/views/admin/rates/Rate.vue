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
    <div v-else class="d-flex justify-content-between me-0 ms-0 align-items-start">
      <div class="contentBlock mb-5">
        <div class="row mb-3">
          <div class="col-lg-6 mb-3" v-for="rate in rates" :key="rate.id">
            <div class="b-radius bg-white h-100 d-flex justify-content-between flex-column">
              <div>
                <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
                  <div class="f-18 fw-600">
                    {{ rate.name }}
                  </div>
                  <div class="f-24 fw-600 color-orange">
                    {{rate.price}} ₽/месяц
                  </div>
                </div>
                <div class="tarifItem p-3 border-bottom" v-for="(prop, index) in rate.props" :key="index" >
                  {{prop}}
                </div>
              </div>
              <div class="d-flex me-0 ms-0 p-3">
                <router-link class="button blueButton px-5" :to="'/admin/rates/edit/'+ rate.id+'/'">Изменить</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import axios from "axios";
import authHeader from "@/services/auth-header";


export default {
  name: "Rate",
  components: {

  },
  data() {

    return{
      displayPolit:false,
      displayConfirmation: false,
      selectRates:{},
      rates:[],
      loading:true,
      changeTarifId:null,
      displayPay:false,
    }
  },
  watch:{

  },
  methods: {
    async initRates(){
      axios.post( this.hostapi+'rates/list',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        let tmprates = resp.data;
        let k=0;
        for (let i in tmprates){
          this.rates[k]={
            'id':tmprates[i].id,
            'name':tmprates[i].name,
            'price':tmprates[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
            'props':JSON.parse(tmprates[i].props),
            'sort':tmprates[i].sort,
          }
          k++;
        }


        setTimeout(()=>{
          this.loading = false
        },1000);

      }).catch(function(error){
        console.log(error);
      });
    },

  },
  mounted() {
    this.initRates();
  },
};
</script>
<style>
.form-group{
  margin-bottom: 1rem;
}
</style>