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
                  <div class="button blueButton px-5 mr-4">Оплатить онлайн</div>
                  <div class="button buttonBorder px-5" @click="openPay" >Оплатить по счету</div>
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
          <div class="col-lg-6 mb-3" v-for="rate in rates" :key="rate.id">
            <div class="b-radius bg-white">
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
              <div class="d-flex mr-0 ml-0 p-3">
                <div class="button blueButton px-5" @click="openConfirmation(rate.id)">Сменить тариф</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <Dialog header="Подтверждение" v-model:visible="displayConfirmation" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '350px'}" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span>Вы точно хотите сменить тариф?</span>
    </div>
    <template #footer>
      <Button label="Нет" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
      <Button label="Да" icon="pi pi-check" @click="changeTarif" class="p-button-text" autofocus />
    </template>
  </Dialog>
  <Dialog header="Заполните реквизиты и менеджер вышлет счет на почту" v-model:visible="displayPay" position="top" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
    <div class="border-bottom p-3 mb-3">

      <div class="mb-2">
        <label class="checkForm d-flex align-items-center" >
          <input class="d-none" type="radio"   value="1" v-model="paySys" @click="showPaySys(1)">
          <div class="blockRadio mr-2"></div>
          <span class="f-16">Юридическое лицо</span>
        </label>
      </div>
      <div class="mb-2">
        <label class="checkForm d-flex align-items-center" >
          <input class="d-none" type="radio" value="2" v-model="paySys"  @click="showPaySys(2)">
          <div class="blockRadio mr-2"></div>
          <span class="f-16">Индивидуальный предприниматель</span>
        </label>
      </div>
      <div class="mb-2">
        <label class="checkForm d-flex align-items-center" >
          <input class="d-none" type="radio" value="3" v-model="paySys"  @click="showPaySys(3)">
          <div class="blockRadio mr-2"></div>
          <span class="f-16">Физическое лицо</span>
        </label>
      </div>
    </div>
    <form class="formPay p-3" action="" v-if="showSys === 1">
      <div class="row">
        <div class="col-12">
          <div class="f-16 mb-3">
            Реквизиты
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="ИНН">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="КПП">
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Юридическое название организации">
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Юридический адрес">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Контактная информация
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактное лицо">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактный телефон">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Как вы будете забирать документы
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <select name="select" class="w-100 formInput task" id="selectUr">
              <option selected value="">Системой ЭДО</option>
              <option value="Напомнить за 2 деня">Системой ЭДО1</option>
              <option value="Напомнить за неденю">Системой ЭДО2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Наименование системы ЭДО">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Банк
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактное лицо">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактный телефон">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck mr-2"></div>
              <span class="f-12">Я ознакомился с условиями <a class="color-blue" href="#">договора</a>, согласен с ними</span>
            </label>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck mr-2"></div>
              <span class="f-12">Я соглашаюсь с <a class="color-blue" href="#">политикой конфиденциальности</a> и даю согласие на обработку персональных данных</span>
            </label>
          </div>
        </div>
      </div>
    </form>
    <form class="formPay p-3" action="" v-if="showSys === 2">
      <div class="row">
        <div class="col-12">
          <div class="f-16 mb-3">
            Реквизиты
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="ИНН">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="КПП">
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Юридическое название организации">
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Юридический адрес">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Контактная информация
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактное лицо">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактный телефон">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Как вы будете забирать документы
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <select name="select" class="w-100 formInput task" id="selectIp">
              <option selected value="">Системой ЭДО</option>
              <option value="Напомнить за 2 деня">Системой ЭДО1</option>
              <option value="Напомнить за неденю">Системой ЭДО2</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Наименование системы ЭДО">
          </div>
        </div>
        <div class="col-12 mt-4">
          <div class="f-16 mb-3">
            Банк
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактное лицо">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактный телефон">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck mr-2"></div>
              <span class="f-12">Я ознакомился с условиями <a class="color-blue" href="#">договора</a>, согласен с ними</span>
            </label>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck mr-2"></div>
              <span class="f-12">Я соглашаюсь с <a class="color-blue" href="#">политикой конфиденциальности</a> и даю согласие на обработку персональных данных</span>
            </label>
          </div>
        </div>
      </div>
    </form>
    <form class="formPay p-3" action="" v-if="showSys === 3">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Фамилия">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Имя">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Отчество">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Email">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <input type="text" class="w-100 formInput" placeholder="Контактный телефон">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <select name="select" class="w-100 formInput task" id="selectFiz">
              <option selected value="">Способ получения чека</option>
              <option value="Системой ЭДО">Системой ЭДО</option>
              <option value="Напомнить за 2 деня">Системой ЭДО1</option>
              <option value="Напомнить за неденю">Системой ЭДО2</option>
            </select>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="d-flex align-items-center">
              <input type="checkbox" class="d-none">
              <div class="blockCheck mr-2"></div>
              <span class="f-12">Я соглашаюсь с <a class="color-blue" href="#">политикой конфиденциальности</a> и даю согласие на обработку персональных данных</span>
            </label>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <Button label="Отмена" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
      <Button label="Отправить счет" class="button buttonBorder" @click="closeModal" autofocus />
    </template>
  </Dialog>
</template>

<script>

import axios from "axios";
import "primeicons/primeicons.css";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import authHeader from "@/services/auth-header";

export default {
  name: "Rate",
  components: {
    Dialog,
    Button
  },
  data() {

    return{
      displayConfirmation: false,
      selectRates:{},
      rates:[],
      loading:true,
      changeTarifId:null,
      displayPay:false,
      paySys:1,
      showSys:1,

      inn:null,
      kpp:null,
      name_organiz:null,
      addres:null,


    }
  },
  watch:{

  },
  methods: {
    showPaySys(id){
      this.showSys = id;
    },
    openPay(){
      this.displayPay=true;
    },
    closeModal(){
      this.displayPay=false;
    },
    openConfirmation(id) {
      this.displayConfirmation = true;
      this.changeTarifId=id;
    },
    closeConfirmation(){
      this.displayConfirmation = false;
    },
    changeTarif(){
      this.loading = true;
      axios.post( 'http://panel.kdm1.biz/api/rates/change',
          {rate:this.changeTarifId},
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        if(resp.data === 'success'){
          this.initRates();
          this.changeTarifId=null;
        }
        this.displayConfirmation = false;
      }).catch(function(error){
        this.loading = false;
        console.log(error);
      });
    },
    async initRates(){
      axios.post( 'http://panel.kdm1.biz/api/rates/list',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        let tmprates = resp.data;

        let k=0;
        for (let i in tmprates){
          if(tmprates[i].selected){
            this.selectRates = tmprates[i];
            this.selectRates={
              'id':tmprates[i].id,
              'name':tmprates[i].name,
              'price':tmprates[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
              'props':JSON.parse(tmprates[i].props),
            }
          } else {

            this.rates[k]={
              'id':tmprates[i].id,
              'name':tmprates[i].name,
              'price':tmprates[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
              'props':JSON.parse(tmprates[i].props),
              'sort':tmprates[i].sort,
            }
            k++;
          }

        }


        setTimeout(()=>{
          this.loading = false
        },1000);

      }).catch(function(error){
        console.log(error);
      });
    }
  },
  mounted() {
    this.initRates();
    //console.log(this.$store.state.auth.user.manager);
  },
};
</script>
<style>
.form-group{
  margin-bottom: 1rem;
}
</style>