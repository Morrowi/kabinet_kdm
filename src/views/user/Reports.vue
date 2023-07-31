<template>
  <div class="b-radius bg-white warp_report_page" v-if="loading">
    <div class="d-flex align-items-start flex-column justify-content-between border-bottom p-3">
      <div class="d-flex justify-content-between w-100 ">
        <router-link to="/dashboard/reports" ><div class="f-18 fw-600 color-black">Данные по рекламе</div> </router-link>
        <div class="warp_date">
          <div class="name">Период:</div>
          <Calendar v-model="period.in"  dateFormat="dd.mm.yy" :showTime="false" :manualInput="true"  class="date_first" placeholder="c"/>

          <Calendar v-model="period.to"  dateFormat="dd.mm.yy" :showTime="false" :manualInput="true"   placeholder="по"/>
        </div>
      </div>

      <div class="warp_panle_date">
        <button :class="{'active': periodDate === 'today'}" @click="changePeriod('today')">Сегодня</button>
        <button :class="{'active': periodDate === 'yesterday'}" @click="changePeriod('yesterday')">Вчера</button>
        <button :class="{'active': periodDate === 'week'}" @click="changePeriod('week')">Неделя</button>
        <button :class="{'active': periodDate === 'month'}" @click="changePeriod('month')">Месяц</button>
        <button :class="{'active': periodDate === 'quarter'}" @click="changePeriod('quarter')">Квартал</button>
        <button :class="{'active': periodDate === 'year'}" @click="changePeriod('year')">Год</button>
      </div>
    </div>

    <div class="row">
      <DataTable :value="arrReport" :lazy="true"  dataKey="id" responsiveLayout="scroll" >
        <template #empty>
          Данные еще не загружены.
        </template>
        <Column  header="Площадка">
          <template #body="slotProps">
            <div class="name-area">{{areas(slotProps.data.area)}}</div>
          </template>
        </Column>
        <Column field="consumption" header="Расход"></Column>
        <Column field="applications" header="Заявки" ></Column>
        <Column field="application_price" header="Цена заявки"></Column>
        <Column  header="Дата">
          <template #body="slotProps">
            {{ dateFormat(slotProps.data.date) }}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="pr-3 pl-3 pt-2 pb-2 px-3"><div class="row align-items-center justify-content-between"><!--v-if--></div></div>
  </div>

</template>

<script>
import axios from "axios";
//import authHeader from "@/services/auth-header";
import DataTable from 'primevue/datatable';
import  'primevue/resources/themes/saga-blue/theme.css';
import  'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Column from "primevue/column";
import Calendar from 'primevue/calendar';
import authHeader from "@/services/auth-header";

export default {
  name: "Reports",
  components: {
    DataTable,
    Column,
    Calendar

  },
  data() {
    return{
      periodDate:'today',
      loading:false,
      period:{
        in:null,
        to:null,
      },
      arArea:[
        { name: 'Яндекс.Директ', code: 'yad' },
        { name: 'MyTarget', code: 'MyTarget' },
        { name: 'Авито', code: 'avito' },
        { name: 'ВКонтакте', code: 'vk' }
      ],
      arrReportTmp:[],

    }
  },
  watch:{

  },
  computed:{
    arrReport(){


      return this.arrReportTmp.filter(data=>{

        if(this.period.in !== null && this.period.to!== null){
          const startDate = new Date(this.period.in).toISOString().slice(0, 10);
          const endDate = new Date(this.period.to).toISOString().slice(0, 10);
          const dateObj = new Date(data.date).toISOString().slice(0, 10);
          console.log('startDate',startDate);
          console.log('endDate',endDate);
          if(dateObj >= startDate && dateObj <= endDate){
            return data;
          }
        }
        if(this.periodDate === 'today'){
          const today = new Date().toISOString().slice(0, 10);
          if(today === data.date.slice(0, 10)){
            return data;
          }
        }
        if(this.periodDate === 'yesterday'){
          const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);
          if(yesterday === data.date.slice(0, 10)){
            return data;
          }
        }
        if(this.periodDate === 'week'){
          const today = new Date().toISOString().slice(0, 10);
          const diffTime = Math.abs(new Date(data.date) - new Date(today));
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log('diffTime', diffTime);
          console.log('diffDays', diffDays);
          if(diffDays <= 7){

            return data;
            //prod.push(data);
          }
        }

        if(this.periodDate === 'month'){
          const today = new Date();
          console.log('today',today.getMonth());
          const dateObj = new Date(data.date);
          if(dateObj.getMonth() === today.getMonth()){
            return data;
          }
        }

        if(this.periodDate === 'quarter'){
          const today = new Date();
          const currentQuarter = Math.floor((today.getMonth() / 3));

          const dateObj = new Date(data.date);
          const dateQuarter = Math.floor((dateObj.getMonth() / 3));
          if(dateQuarter === currentQuarter){
            return data;
          }

        }

        if(this.periodDate === 'year'){
          const today = new Date();
          const currentYear = today.getFullYear();
          const dateObj = new Date(data.date);

          const dateYear = dateObj.getFullYear();
          if(currentYear === dateYear){
            return data;
          }
        }


      });
    }
  },
  methods: {
    changePeriod(type){
      this.periodDate = type;
    },
    areas(code){
      return this.arArea.find(item => item.code === code).name;
    },
    dateFormat(date){
      return date.slice(0, 10)  ;
    },
    initReports() {
      axios.post(this.hostapi + 'report/user/list',
          {},
          {
            headers: authHeader()
          }
      ).then((resp) => {
        this.arrReportTmp = resp.data;

      }).catch(function (error) {
        console.log(error);

      }).finally(() => {this.loading = true;});
    }

  },
  mounted() {
    this.initReports();
  }
};
</script>
<style>
.warp_report_index{
  overflow: hidden;
}
.warp_panle_date {
  margin-top: 16px;
  display: flex;
  width: 100%;

}

.warp_panle_date button{
  border:none;
  background: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 2px 16px;
  color: #0D85FB;
  border-radius: 100px;
  margin-right: 20px;
}

.name-area{
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #171717;
}

.warp_panle_date button.active,
.warp_panle_date button:hover{
  background: #0D85FB;
  color: #FFFFFF;
}

.p-datatable .p-datatable-thead > tr > th {
  background-color: #fff;
  font-weight: 500 !important;
  font-size: 14px;
  color: #94A2AB;
  padding: 9px 20px 8px;
}

.warp_date {
  display: flex;
  align-items: center;
}

.warp_date .name{
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #171717;
  margin-right: 10px;
}

.warp_date .p-calendar {
  padding: 0 12px !important;
  font-weight: 400;
  font-size: 12px;
  line-height: 160%;
  color: #94A2AB;
}

.warp_date .date_first{
  margin-right: 10px;
}

</style>
