<template>
  <div class="b-radius bg-white warp_report_index">
    <div class="d-flex align-items-start flex-column justify-content-between border-bottom p-3">
      <router-link to="/dashboard/reports" ><div class="f-18 fw-600 color-black">Данные по рекламе</div> </router-link>
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
      <DataTable :value="arrReport" :lazy="true"  responsiveLayout="scroll" >
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
import authHeader from "@/services/auth-header";
import DataTable from 'primevue/datatable';
import  'primevue/resources/themes/saga-blue/theme.css';
import  'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Column from "primevue/column";

export default {
  name: "Report",
  components: {
    DataTable,
    Column
  },
  data() {
    return{
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
    async initReport(){
      axios.post( this.hostapi+'marketolog/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        //this.arrReport = resp.data;
        console.log(resp.data);

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
.warp_report_index{
  overflow: hidden;
}
.warp_panle_date {
  margin-top: 16px;
  display: flex;
  width: 100%;

}

.name-area{
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #171717;
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

</style>
