<template>
  <div class="container-fluid vh-100">
    <DataTable :value="usersList"   selectionMode="single"  dataKey="id" @rowSelect="onRowSelect" responsiveLayout="scroll">
      <template #empty>
        No customers found.
      </template>
      <template #loading>
        Loading customers data. Please wait.
      </template>
      <Column field="id" header="ID"></Column>
      <Column header="Имя">
        <template #body="slotProps">
          <div class="d-flex align-items-center">
            <template v-if="slotProps.data.avatar">
              <Avatar shape="circle" :image="host+'/uploads/'+slotProps.data.id+'/'+slotProps.data.avatar" />
            </template>
            <template v-else>
              <Avatar icon="pi pi-user"  shape="circle"  />
            </template>
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

//import "primeflex/primeflex.css";
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
      host:this.host,
      usersList:null,
    }
  },
  watch:{

  },
  methods: {
    onRowSelect(event){
      this.$router.push('/mod/reports/'+event.data.id);
    },
    listInit(){
      axios.post( this.hostapi+'report/mod/list',
          this.$store.state.auth.user.client,
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        this.usersList = resp.data;
      }).catch(function(error){
        console.log(error);
      });
    }


  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.listInit();
  }
};
</script>
<style>

</style>
