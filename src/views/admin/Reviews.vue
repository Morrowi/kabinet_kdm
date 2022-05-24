<template>
  <div class="container-fluid vh-100">
<!--    <AddRates/>-->

    <DataTable :value="usersList" :paginator="true" :rows="10" responsiveLayout="scroll"
               v-model:filters="filters"
               filterDisplay="menu"
               :globalFilterFields="['m_username']"
    >
      <template #header>
        <div class="flex justify-content-between">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <template #empty>
        No customers found.
      </template>
      <template #loading>
        Loading customers data. Please wait.
      </template>
      <Column field="id" header="#"></Column>
      <Column header="Имя" :sortable="true" sortField="representative.name" filterField="representative.name" filterMatchMode="in" style="width:25%">
        <template #body="slotProps">
          <div class="d-flex align-items-center">
          <Avatar shape="circle" :image="slotProps.data.representative.img" />
          <span class="ms-3 image-text">{{slotProps.data.representative.name}}</span>
          </div>
        </template>
      </Column>
      <Column field="rating" header="Оценка" sortable>
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
        </template>
      </Column>
      <Column field="text" header="Текст отзыва">
        <template #body="{data}">
          <div v-html="data.text"></div>
        </template>
      </Column>
      <Column field="moderation" header="Статус" dataType="boolean"  bodyClass="text-center" style="width: 8rem;">
        <template #body="{data}">
          <i class="pi" :class="{'true-icon pi-check-circle': data.moderation, 'false-icon pi-times-circle': !data.moderation}"></i>
        </template>
        <template #filter={filterModel}>
          <TriStateCheckbox v-model="filterModel.value" />
        </template>
      </Column>

      <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>

</template>

<script>


import axios from "axios";
import authHeader from "@/services/auth-header";
import Rating from 'primevue/rating';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
//import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
//import Row from 'primevue/row';

import {FilterMatchMode,FilterOperator} from 'primevue/api';
import Avatar from "primevue/avatar";

export default {
  name: "Reviews",
  components: {
    DataTable,
    Column,
    Rating,
    InputText,
    Button,
    Avatar,
    TriStateCheckbox
    //ColumnGroup,
    //Row
  },
  data() {

    return {
      filters: null,
      usersList:null
    }
  },
  created() {
    this.initFilters();
  },
  watch:{

  },
  methods: {
    editProduct(data){
      console.log(data);
    },
    initFilters() {
      this.filters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'moderation': {value: null, matchMode: FilterMatchMode.EQUALS},
      }
    },
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

    }
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    // console.log(this.currentUser);
    axios.post( 'http://panel.kdm1.biz/api/reviews/',
        this.$store.state.auth.user.client,
        {
          headers: authHeader()
        }
    ).then((resp)=>{
      for ( const key in resp.data){
        resp.data[key].date_insert= this.dateToYMD(new Date(resp.data[key].date_insert));
      }


      this.usersList = resp.data;
    }).catch(function(error){
      console.log(error);
    });
  }
};
</script>
