<template>
  <div class="container-fluid vh-100">
    <DataTable :value="usersList" responsiveLayout="scroll" :paginator="true" :rows="10" @rowSelect="onRowSelect" selectionMode="single"  dataKey="id" >
      <template #empty>
        No customers found.
      </template>
      <template #loading>
        Loading customers data. Please wait.
      </template>
      <Column field="id" header="ID"></Column>
      <Column header="Имя" >
        <template #body="slotProps">
          <div class="d-flex align-items-center">
            <Avatar shape="circle" :image="slotProps.data.avatar" />
            <span class="ms-3 image-text">{{slotProps.data.username}}</span>
          </div>
        </template>
      </Column>

    </DataTable>
  </div>

</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import authHeader from "@/services/auth-header";
import Avatar from "primevue/avatar";




export default {
  name: "Reports",
  components: {
    DataTable,
    Column,
    Avatar,
  },
  data() {

    return {
      usersList:null,
      clientDialog: false,
      client: {},

      editingRows: [],
      campaigns: [],
    }
  },
  watch:{

  },
  methods: {
    listInit(){
      // console.log(this.currentUser);
      axios.post( 'http://panel.kdm1.biz/api/inpay/user',
          {},
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        console.log('report list', resp.data);

        this.usersList = resp.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    onRowSelect(e){
      this.$router.push('/mod/inpayac/'+e.data.id);
    }

  },
  computed:{
  },
  mounted() {
    this.listInit();
  }
};
</script>
<style>
.castom_drop{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.castom_drop .p-inputtext{
  font-size: 12px !important;
}
</style>
