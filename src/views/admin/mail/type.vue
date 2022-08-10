<template>
  <div class="row justify-content-end mb-3">
    <div class="col-auto">
      <Button label="Добавить"  class="p-button" @click="showAddEvent = true"  />
    </div>
  </div>
  <DataTable :value="typeList" :paginator="true" :rows="10" responsiveLayout="scroll" filterDisplay="menu">
    <template #empty>
      No customers found.
    </template>
    <template #loading>
      Loading customers data. Please wait.
    </template>
    <Column field="id" header="#"></Column>
    <Column field="event_name" header="Тип"></Column>
    <Column field="name" header="Название"></Column>
  </DataTable>
  <Dialog v-model:visible="showAddEvent" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}" :modal="true">
    <template #header>
      <h4>Добавление нового типа события</h4>
    </template>
    <div class="add_event">
      <div class="row mt-3">
        <div class="field col-12 col-md-6">
          <div class="form-group">
            <span class="p-float-label">
              <InputText id="input_event_name" type="text" v-model="event_name" />
              <label for="input_event_name">Тип события (en)</label>
            </span>
          </div>
        </div>
        <div class="field col-12 col-md-6">
          <div class="form-group">
          <span class="p-float-label">
            <Dropdown id="input_vid" v-model="event_type" :options="event_types" optionLabel="name" optionValue="code" />
            <label  for="input_vid">Вид события</label>
          </span>
          </div>
        </div>
        <div class="field col-12 col-md-6">
          <div class="form-group">
            <span class="p-float-label">
              <InputText id="input_name" type="text" v-model="name" />
              <label for="input_name">Название</label>
            </span>
          </div>
        </div>
        <div class="field col-12">
          <div class="form-group">
            <span class="p-float-label">
              <Textarea id="input_description" v-model="description" rows="5" cols="30" />
              <label for="input_description">Описание</label>
            </span>
          </div>
        </div>


      </div>
    </div>
    <template #footer>
      <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="showAddEvent = false"/>
      <Button label="Добавить" icon="pi pi-check" @click="addType"/>
    </template>
  </Dialog>

</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
//import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';


export default {
  name: "Type",
  components: {
    DataTable,
    Column,
    Dialog,
    Button,
    InputText,
    Dropdown,
    Textarea
  },
  data() {
    return {
      showAddEvent: false,
      filters: null,
      typeList:null,
      //add
      event_name: null,
      event_type: null,
      event_types: [
        {name: 'Почтоыое событие', code: 'email'},
        {name: 'СМС-событие', code: 'sms'}
      ],
      name:null,
      description: null,
    }
  },
  watch: {},
  methods: {
    typeInit(){
      axios.post( 'http://panel.kdm1.biz/api/mail/type/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        this.typeList = resp.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    addType(){
      //let formData = new FormData();
      let data ={};
      if(this.event_name !==null){
        //formData.append('event_name', this.event_name);
        data.event_name = this.event_name
      }
      if(this.event_type !==null){
        //formData.append('event_type', this.event_type);
        data.event_type = this.event_type
      }
      if(this.name !==null){
        //formData.append('name', this.name);
        data.name = this.name
      }
      if(this.description !==null){
        //formData.append('description', this.description);
        data.description = this.description
      }

      axios.post( 'http://panel.kdm1.biz/api/mail/type/add',
          data,
          {
            headers: authHeader()
            //headers: { authHeader(), 'Content-Type': 'multipart/form-data'}
          }
      ).then((resp) => {
        if(resp.data === 'saccess'){
          this.event_name = null;
          this.event_type = null;
          this.name = null;
          this.description = null;
          this.showAddEvent = false;
          this.$toast.add({severity:'success', summary: 'Задача добавлена', detail:'', life: 3000});


        } else {
          this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Попробуйте позже', life: 3000});
        }


      }).catch(function(error){
        console.log(error);
        console.log(this.$toast);
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Не введено название задачи', life: 3000});
      });

    }
  },
  mounted() {
    this.typeInit();
  }
};
</script>
<style>
.add_event input.p-inputtext,
.add_event .p-inputtextarea{
  border: 1px solid #F0F2FA !important;
  width: 100%;
}
.p-float-label label,
.field-checkbox label{
  font-size: 14px;
}
.add_event .p-dropdown {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}


</style>