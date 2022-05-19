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

    <div v-else class="d-flex justify-content-between me-0 ml-0 align-items-start">
      <div class="contentBlock mb-5">
        <div class="row mr-0 ml-0 justify-content-between mb-3 flex-column">
          <div class="f-24 fw-600">
            Ваш тариф
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-lg-6 mb-3" >
            <div class=" b-radius bg-white formTarifItem mx-3"   >
              <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
                <div class="f-18 fw-600">
                  {{selectRates.name}}
                </div>
                <div class="f-24 fw-600 color-orange">
                  {{selectRates.price}} ₽/месяц
                </div>
              </div>
              <div class="tarifItem p-3 border-bottom" v-for="prop in selectRates.props" :key="prop" >
                {{prop}}
              </div>
              <div class="d-flex mr-0 ml-0 p-3">
                <div class="button blueButton px-5">Выбрать тариф</div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-3">
            <div class="bgTarif"></div>
            <!--<img class="w-100" src="image/tarifImg1.png" alt="">-->
          </div>
        </div>
        <div class="row mr-0 ml-0 justify-content-between mb-3 flex-column">
          <div class="f-24 fw-600">
            Сменить тариф
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-lg-6 mb-3">
            <div class="b-radius bg-white">
              <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
                <div class="f-18 fw-600">
                  Тариф «Минимальный»
                </div>
                <div class="f-24 fw-600 color-orange">
                  19 990 ₽/месяц
                </div>
              </div>
              <div class="tarifItem p-3 border-bottom">
                Разработка и поддержка рекламных кампаний
                <br>
                (Яндекс.Директ, Google Adwords, Instagram+Facebook) с общим бюджетом до 200 000 ₽/мес
              </div>
              <div class="tarifItem p-3 border-bottom">
                Детальные отчеты, аналитика и рекомендации — 1 раз в месяц
              </div>
              <div class="tarifItem p-3 border-bottom">
                Консультации маркетолога — 4 часа
              </div>
              <div class="tarifItem p-3 border-bottom">
                Правки веб-сайта или лендинга — 2 раза в месяц
              </div>
              <div class="tarifItem p-3 border-bottom">
                Разработка лендинга на Тильде в течение первых 2-ух месяцев
              </div>
              <div class="tarifItem p-3 border-bottom">
                Разработка лендинга или сайта на Тильде
                в течение первых 2-ух месяцев (3 месяца для сайта)
              </div>
              <div class="tarifItem p-3 border-bottom">
                А/В тестирование сайта или лендинга
              </div>
              <div class="tarifItem p-3 border-bottom">
                SMM — ведение Instagram, Facebook, ВКонтакте
                до 20 постов в месяц, ежедневные сторис, таргетированная
                реклама, контроль комментариев и сообщений
              </div>
              <div class="tarifItem p-3 border-bottom">
                Закрепленный специалист по рекламе и дизайнер
              </div>
              <div class="row mr-0 ml-0 p-3">
                <div class="button buttonBorder mr-3">Сменить тариф</div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-3">
            <div class="b-radius bg-white">
              <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
                <div class="f-18 fw-600">
                  Тариф «Максимальный»
                </div>
                <div class="f-24 fw-600 color-orange">
                  99 990 ₽/месяц
                </div>
              </div>
              <div class="tarifItem p-3 border-bottom">
                Разработка и поддержка рекламных кампаний
                <br>
                (Яндекс.Директ, Google Adwords, Instagram+Facebook) с общим бюджетом до 200 000 ₽/мес
              </div>
              <div class="tarifItem p-3 border-bottom">
                Детальные отчеты, аналитика и рекомендации — 1 раз в месяц
              </div>
              <div class="tarifItem p-3 border-bottom">
                Консультации маркетолога — 4 часа
              </div>
              <div class="tarifItem p-3 border-bottom">
                Правки веб-сайта или лендинга — 2 раза в месяц
              </div>
              <div class="tarifItem p-3 border-bottom">
                Разработка лендинга на Тильде в течение первых 2-ух месяцев
              </div>
              <div class="tarifItem p-3 border-bottom">
                Разработка лендинга или сайта на Тильде
                в течение первых 2-ух месяцев (3 месяца для сайта)
              </div>
              <div class="tarifItem p-3 border-bottom">
                А/В тестирование сайта или лендинга
              </div>
              <div class="tarifItem p-3 border-bottom">
                SMM — ведение Instagram, Facebook, ВКонтакте
                до 20 постов в месяц, ежедневные сторис, таргетированная
                реклама, контроль комментариев и сообщений
              </div>
              <div class="tarifItem p-3 border-bottom">
                Закрепленный специалист по рекламе и дизайнер
              </div>
              <div class="row mr-0 ml-0 p-3">
                <div class="button buttonBorder mr-3">Сменить тариф</div>
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
//import authHeader from "@/services/auth-header";

export default {
  name: "Index admin",
  components: {

  },
  data() {

    return{
      selectRates:{},
      rates:[],
      loading:true
    }
  },
  watch:{

  },
  methods: {

  },
  mounted() {
    this.loading=true;
    console.log(this.$store.state.auth.user);
    axios.get( 'http://panel.kdm1.biz/api/rates/list',).then((resp)=>{
      let tmprates = resp.data;

     for (let i in tmprates){
       if(tmprates[i].id === this.$store.state.auth.user.rate){
         this.selectRates = tmprates[i];
         this.selectRates={
           'id':tmprates[i].id,
           'name':tmprates[i].name,
           'price':tmprates[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
           'props':JSON.parse(tmprates[i].props),
         }
       } else {
         this.rates[tmprates[i].sort]={
           'id':tmprates[i].id,
           'name':tmprates[i].name,
           'price':tmprates[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
           'props':JSON.parse(tmprates[i].props),
         }
       }

     }
     console.log(this.selectRates);
      console.log(this.rates);

    }).catch(function(error){
      console.log(error);
    }).finally(() => (this.loading = false));
    //console.log(this.$store.state.auth.user.manager);
  },
};
</script>
