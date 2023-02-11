<template>
  <div class="b-radius bg-white warp_report_page">
    <div class="d-flex align-items-start flex-column justify-content-between border-bottom p-3">
      <div class="d-flex justify-content-between w-100 ">
        <router-link to="/dashboard/reports" ><div class="f-18 fw-600 color-black">Данные по рекламе</div> </router-link>
        <div class="warp_date">
          <div class="name">Период:</div>
          <Calendar v-model="period.in"  dateFormat="dd.mm.yy" :showTime="false" :manualInput="true" :disabledDays="[5,6]"  class="date_first" placeholder="c"/>

          <Calendar v-model="period.to"  dateFormat="dd.mm.yy" :showTime="false" :manualInput="true" :disabledDays="[5,6]"  placeholder="по"/>
        </div>
      </div>

      <div class="warp_panle_date">
        <button class="active">Сегодня</button>
        <button>Вчера</button>
        <button>Неделя</button>
        <button>Месяц</button>
        <button>Квартал</button>
        <button>Год</button>
      </div>
    </div>

    <div class="row">
      <DataTable :value="arrReport" :lazy="true"  @row-click="showTasks" selectionMode="single" dataKey="id" responsiveLayout="scroll" >
        <template #empty>
          Поставьте нам задачу
        </template>
        <Column  header="Площадка">
          <template #body="slotProps">
            <div class="name-area">{{slotProps.data.area}}</div>
          </template>
        </Column>
        <Column field="consumption" header="Расход"></Column>
        <Column field="applications" header="Заявки" ></Column>
        <Column field="application_price" header="Цена заявки"></Column>
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

export default {
  name: "Reports",
  components: {
    DataTable,
    Column,
    Calendar

  },
  data() {
    return{
      period:{
        in:null,
        to:null,
      },
      arrReport:[
        {
          area:'Директ',
          consumption:'6597.24 ₽',
          applications:'1',
          application_price:'1'
        },
        {
          area:'Директ',
          consumption:'6597.24 ₽',
          applications:'1',
          application_price:'1'
        }
      ]
    }
  },
  watch:{

  },
  methods: {
    showTasks(){

    },
    metrikaReport(){
     // r = requests.get('https://api-metrika.yandex.ru/stat/v1/data?&id=21075004&accuracy=full&date1=yesterday&date2=yesterday&metrics=ym:s:visits&oauth_token=' + atoken)

      /*fetch(
          'https://api-sandbox.direct.yandex.com/json/v5/campaigns', {
            method:'post',

            headers: {
              "Authorization": "Bearer ******1"
            }
          })
          .then(r => r.json())
          .then(metrikaApiJSON => {
          console.log(metrikaApiJSON);
          })*/
      axios.post( 'https://api-sandbox.direct.yandex.com/json/v5/campaigns',
          {
            FieldNames:["Id","Name"]
          },
          {
            headers: {
              "Authorization": "Bearer AQAAAAA55yrgAAgEYgycA9s0uU2KthWf2XgHc-A"
            }
          }
      ).then((resp)=>{

        console.log(resp.data);

        //this.openTask=true;
      }).catch(function(error){
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:error, life: 3000});
        console.log(error);
      });
    }
  },
  mounted() {

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
