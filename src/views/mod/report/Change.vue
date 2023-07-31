<template>
  <div class="b-radius bg-white warp_report_page" v-if="loading">
    <div class="d-flex align-items-start flex-column justify-content-between border-bottom p-3">
      <div class="w-100 mb-4 d-flex justify-content-between">
        <div class="f-18 fw-600 color-black">Статистика - {{userInfo.username}}</div>
        <div class="col-auto"><div class="button blueButton px-30" @click="showDialog = true"> + Добавить данные </div></div>
      </div>
      <DataTable :value="usersList" selectionMode="single" dataKey="id" class="w-100" responsiveLayout="scroll">
        <template #empty>
          Нет данных.
        </template>
        <template #loading>
          Загрузка данных, подождите.
        </template>
        <Column field="" header="Площадка">
          <template #body="slotProps">
            {{ areas(slotProps.data.area) }}
          </template>
        </Column>
        <Column field="consumption" header="Расход"></Column>
        <Column field="traffic" header="Трафик"></Column>
        <Column field="application" header="Заявки"></Column>
        <Column field="application_price" header="Цена заявки"></Column>
        <Column  header="Дата">
          <template #body="slotProps">
            {{ dateFormat(slotProps.data.date) }}
          </template>
        </Column>

      </DataTable>

    </div>
  </div>
  <Dialog v-model:visible="showDialog" modal header="Добавление данных" :style="{ width: '50vw' }">
    <form class="formTask" @submit="sendDate" action="javascript:void(0);">
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group mb-3">
            <Dropdown v-model="form['area']" name="area" :options="arArea" optionLabel="name" placeholder="Площадка" class="w-full" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group mb-3">
            <Calendar v-model="form['date']" dateFormat="dd.mm.yy" :showTime="false" :manualInput="true"  :maxDate="maxDate"  placeholder="Укажите дату выполнения "/>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group mb-3">
            <InputNumber mode="currency" currency="RUB" locale="ru-RU"  placeholder="Расход" v-model="form['consumption']" class="w-100 formInput_pv" type="text"/>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group mb-3">
            <InputNumber placeholder="Трафик" v-model="form['traffic']" class="w-100 formInput_pv" type="text"/>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group mb-3">
            <InputNumber placeholder="Заявки" v-model="form['applications']" class="w-100 formInput_pv" type="text"/>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="form-group mb-3">
            <InputNumber  mode="currency" currency="RUB" locale="ru-RU" placeholder="Цена заявки" v-model="form['application_price']" class="w-100 formInput_pv" type="text"/>
          </div>
        </div>


      </div>
      <div class="d-flex justify-content-start warp_btn_form" style="margin-top: 20px;">
        <button type="submit" class="button blueButton w-200">
             <span
                 v-show="loadingAdd"
                 class="spinner-border spinner-border-sm"
             ></span>
          Добавить
        </button>
      </div>
    </form>
  </Dialog>
  <Toast />
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import authHeader from "@/services/auth-header";
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';

export default {
  name: "Reports",
  components: {
    DataTable,
    Column,
    Dialog,
    Calendar,
    Dropdown,
    InputNumber,
    Toast
  },
  data() {

    return {
      host: this.host,
      usersList: null,
      userInfo: null,
      loading:false,
      showDialog:false,
      loadingAdd:false,
      maxDate: new Date(),
      arArea:[
        { name: 'Яндекс.Директ', code: 'yad' },
        { name: 'MyTarget', code: 'MyTarget' },
        { name: 'Авито', code: 'avito' },
        { name: 'ВКонтакте', code: 'vk' }
      ],
      form:{
        area:null,
        consumption:null,
        traffic:null,
        applications:null,
        application_price:null,
        date:null,

      }

    }
  },
  watch: {},
  methods: {
    areas(code){
      return this.arArea.find(item => item.code === code).name;
    },
    dateFormat(date){
      return date.slice(0, 10)  ;
    },
    sendDate() {
      console.log('form',this.form);
      axios.post(this.hostapi + 'report/mod/change',
          {
            action:'change',
            user_id: this.$route.params.id,
            form: this.form
          },
          {
            headers: authHeader()
          }
      ).then((resp) => {
        this.usersList = resp.data.list;
        this.userInfo = resp.data.user;
        if(resp.data.status === 'success'){
          this.$toast.add({severity:'success', summary: 'Тариф обновлен', detail:'', life: 30000});
        }
        console.log('report list', resp.data);
      }).catch(function (error) {
        console.log(error);
      }).finally(() => {this.loading = true;});
    },
    listInit() {

      axios.post(this.hostapi + 'report/mod/change',
          {
            action:'user',
            user_id: this.$route.params.id
          },
          {
            headers: authHeader()
          }
      ).then((resp) => {
        this.usersList = resp.data.list;
        this.userInfo = resp.data.user;
        console.log('report list', resp.data);

      }).catch(function (error) {
        console.log(error);

      }).finally(() => {this.loading = true;});
    },

  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  async created (){
    this.listInit();
  },
  mounted() {

  }
};
</script>
<style>

</style>
