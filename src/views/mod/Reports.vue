<template>
  <div class="container-fluid vh-100">
    <DataTable :value="usersList" responsiveLayout="scroll">
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
      <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-eye" class="p-button-rounded p-button-success mr-2" @click="editClient(slotProps.data)" />
        </template>
      </Column>



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
      <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
    </template>
  </Dialog>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import "primeflex/primeflex.css";
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
    Avatar
  },
  data() {

    return {
      usersList:null,
      clientDialog: false,
      client: {},

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


        this.usersList = resp.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    editClient(client) {
      this.client = {...client};
      this.clientDialog = true;
    },
    hideDialog() {
      this.clientDialog = false;
    },
    saveProduct(){
      console.log(123);
    },
    directReport(){
      // r = requests.get('https://api-metrika.yandex.ru/stat/v1/data?&id=21075004&accuracy=full&date1=yesterday&date2=yesterday&metrics=ym:s:visits&oauth_token=' + atoken)

      /*fetch(
          'https://api-sandbox.direct.yandex.com/json/v5/campaigns', {
            method:'post',

            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer ******1"
            }
          })
          .then(r => r.json())
          .then(metrikaApiJSON => {
          console.log(metrikaApiJSON);
          })*/
      axios.post( 'https://api-sandbox.direct.yandex.com/json/v5/campaigns',
          JSON.stringify({ FieldNames:["Id","Name"]}),
          {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "
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
