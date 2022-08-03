<template>
  <div class="contentBlock mb-5">
    <div class="row mr-0 ml-0 justify-content-between mb-3 ">
      <div class="f-24 fw-600 col-auto">
        Поддержка
      </div>

    </div>
    <transition name="fade" >
    <div class="position-absolute" v-if="loading">Loading...</div>
    <div class="row"  v-else>
      <DataTable :value="tiketList" responsiveLayout="scroll" :paginator="true" :rows="10" @rowSelect="onRowSelect" selectionMode="single" dataKey="id">
        <Column field="date_insert" header="Дата"></Column>
        <Column field="id" header="Номер"></Column>
        <Column field="them" header="Тема"></Column>
        <Column field="status" header="Статус">
          <template #body="slotProps">
            <span :class="'product-badge status-' + slotProps.data.status">
              <span v-if="slotProps.data.status === 1">Открыт</span>
              <span v-if="slotProps.data.status === 2">Ответ получен</span>
              <span v-if="slotProps.data.status === 3">Закрыт</span>
            </span>
          </template>
        </Column>
      </DataTable>
    </div>
    </transition>
  </div>

</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: "Support",
  components: {
    DataTable,
    Column
  },
  data() {

    return {
      tiketList: null,
      loading:true,
    }
  },
  watch:{

  },
  methods: {
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

    },
    listTicket(){
      // console.log(this.currentUser);
      axios.post( 'http://panel.kdm1.biz/api/support/',
          "",
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        for ( const key in resp.data){
          resp.data[key].date_insert= this.dateToYMD(new Date(resp.data[key].date_insert));
        }


        this.tiketList = resp.data;
      }).catch(function(error){
        console.log(error);
      }).finally(() => (this.loading = false));
    },
    onRowSelect(e){
      this.$router.push('/admin/support/'+e.data.id);
    }
  },
  mounted() {
    this.listTicket();
  }
};
</script>
<style>
.warp_dialog{
  border-radius: 0.3rem;
  overflow: hidden;
}
  .warp_dialog.p-dialog .p-dialog-header{
    border-bottom: 1px solid #dee2e6;
    padding: 1rem!important;
  }
  .warp_dialog .p-dialog-title{
    font-size: 24px !important;
    line-height: 30px;
  }
  .warp_dialog .p-dialog-content{
    padding: 1rem!important;
  }
  .product-badge.status-1 {
    background: #c8e6c9;
    color: #256029;
  }

.product-badge{
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;
}
.product-badge.status-2 {
  background: #feedaf;
  color: #8a5340;
}

.product-badge.status-3 {
  background: #ffcdd2;
  color: #c63737;
}


</style>