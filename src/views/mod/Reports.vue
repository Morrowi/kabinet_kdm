<template>
  <div class="container-fluid vh-100">
    <DataTable :value="usersList" editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave" responsiveLayout="scroll">
      <template #empty>
        No customers found.
      </template>
      <template #loading>
        Loading customers data. Please wait.
      </template>
      <Column field="id" header="ID"></Column>
      <Column header="Имя" style="width:25%">
        <template #body="slotProps">
          <div class="d-flex align-items-center">
            <Avatar shape="circle" :image="slotProps.data.avatar" />
            <span class="ms-3 image-text">{{slotProps.data.username}}</span>
          </div>
        </template>
      </Column>
      <Column field="campaign" header="Компания" style="width: 332px;">
        <template #editor="{ data, field }">
          <Dropdown v-model="data[field]" class="castom_drop" :options="campaigns" optionLabel="Name" optionValue="Id" placeholder="Выберите компанию">
            <template #option="slotProps">
              <span>{{slotProps.option.Id}} <small>{{slotProps.option.Name}}</small></span>
            </template>
          </Dropdown>
        </template>
        <template #body="slotProps">
          {{getStatusLabel(slotProps.data.campaign)}}
        </template>
      </Column>
      <Column :exportable="false" >
        <template #body="slotProps">
          <Button icon="pi pi-eye" class="p-button-rounded p-button-success mr-2" @click="showClient(slotProps.data)" />
        </template>
      </Column>


      <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
  </div>
  <Dialog v-model:visible="clientDialog" :style="{width: '550px'}" header="Клиент" :modal="true" class="p-fluid">
    <div class="field">{{client.username}}</div>


<!--    <div class="field">
      <label for="inventoryStatus" class="mb-3">Inventory Status</label>
      <Dropdown id="inventoryStatus" v-model="client.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
        <template #value="slotProps">
          <div v-if="slotProps.value && slotProps.value.value">
            <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
          </div>
          <div v-else-if="slotProps.value && !slotProps.value.value">
            <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
          </div>
          <span v-else>
							{{slotProps.placeholder}}
						</span>
        </template>
      </Dropdown>
    </div>-->

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
    </template>
  </Dialog>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
//import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import authHeader from "@/services/auth-header";
import Dialog from 'primevue/dialog';
import Avatar from "primevue/avatar";




export default {
  name: "Reports",
  components: {
    DataTable,
    Column,
    Button,
    Dialog,
    Avatar,
    Dropdown
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
      axios.post( 'http://panel.kdm1.biz/api/report/user',
          this.$store.state.auth.user.client,
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        console.log('report list', resp.data);

        for (let key in resp.data) {

          for (let i in resp.data[key].campaign_full) {
            if (resp.data[key].campaign_full[i].area === 'direct') {
              resp.data[key].campaign=resp.data[key].campaign_full[i].campaign;
               console.log('direct');
            }
          }
        }

        this.usersList = resp.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    directReport(){

      axios.post( 'http://panel.kdm1.biz/api/report/campaigns',
          {},
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        this.campaigns =resp.data;
        console.log('res directReport',resp.data)
        //this.openTask=true;
      }).catch(function(error){
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:error, life: 3000});
        console.log(error);
      });
    },
    onRowEditSave(event) {
      let { newData, index } = event;
      console.log('newData',newData);
      let data = {
        user_id:newData.id,
        campaign:newData.campaign,
        area:'direct'
      };

      axios.post( 'http://panel.kdm1.biz/api/report/edit',
          data,
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        console.log('res onRowEditSave',resp.data)
        //this.openTask=true;
      }).catch(function(error){
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:error, life: 3000});
        console.log(error);
      });

      this.usersList[index] = newData;
    },
    showClient(client) {
      this.client = {...client};
      this.clientDialog = true;
    },
    hideDialog() {
      this.clientDialog = false;
    },
    getStatusLabel(Id) {
      if(Id !== null){
        return Id;
      }
      return '-';

    }

  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.listInit();
    this.directReport();
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