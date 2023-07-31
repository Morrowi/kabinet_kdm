<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <Form @submit="onSubmit">
          <div class=" b-radius bg-white formTarifItem mx-3">
            <div class="row align-items-center flex-wrap justify-content-between border-bottom p-3">
              <div class="form-group mb-3 col">
                <Field v-model="name" class="formInput w-100" name="name" placeholder="Название" type="text" :rules="validateName" />
                <ErrorMessage class="error_input" name="name" />
              </div>
              <div class="form-group mb-3 col-4">
                <Field  v-model="price" class="formInput w-100" name="price" placeholder="Цена " type="text" :rules="validateName" />
                <ErrorMessage class="error_input" name="price" />
              </div>
            </div>

            <div class="p-3 border-bottom d-flex align-items-center" v-for="(item, index) in rates_props" :key="index">
              <Field
                  :value="item"
                  as="textarea"
                  :name="'props['+index+']'"
                  class="formInput w-100"
                  placeholder="" style="min-height:70px; height: 70px;"
              />
              <span class="ms-3 cursor-pointer warp_remove " @click="removeMember(index)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.25 3C9.25 2.58579 9.58579 2.25 10 2.25H14C14.4142 2.25 14.75 2.58579 14.75 3V3.75H19C19.4142 3.75 19.75 4.08579 19.75 4.5C19.75 4.91421 19.4142 5.25 19 5.25H5C4.58579 5.25 4.25 4.91421 4.25 4.5C4.25 4.08579 4.58579 3.75 5 3.75H9.25V3Z" fill="black"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.2399 7.94478C6.26803 7.69157 6.48206 7.5 6.73684 7.5H17.2632C17.5179 7.5 17.732 7.69157 17.7601 7.94478L17.9602 9.74613C18.321 12.9931 18.321 16.2701 17.9602 19.517L17.9405 19.6944C17.8091 20.8769 16.8926 21.8199 15.7143 21.9849C13.2501 22.3299 10.7499 22.3299 8.28574 21.9849C7.10737 21.8199 6.19085 20.8769 6.05945 19.6944L6.03975 19.517C5.67897 16.2701 5.67897 12.9931 6.03975 9.74613L6.2399 7.94478ZM14.5303 12.4697C14.8232 12.7626 14.8232 13.2374 14.5303 13.5303L13.0607 15L14.5303 16.4697C14.8232 16.7626 14.8232 17.2374 14.5303 17.5303C14.2374 17.8232 13.7626 17.8232 13.4697 17.5303L12 16.0607L10.5303 17.5303C10.2374 17.8232 9.76257 17.8232 9.46968 17.5303C9.17678 17.2374 9.17678 16.7626 9.46968 16.4697L10.9393 15L9.46967 13.5303C9.17678 13.2374 9.17678 12.7626 9.46967 12.4697C9.76256 12.1768 10.2374 12.1768 10.5303 12.4697L12 13.9393L13.4697 12.4697C13.7626 12.1768 14.2374 12.1768 14.5303 12.4697Z" fill="black"/>
                </svg>
              </span>
            </div>

            <div class="mx-3 d-flex justify-content-end">
                <a href="javascript:void(0);" class="button" @click="addMember();"><span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.06665 13.0667C6.06665 13.5821 6.48452 14 6.99998 14C7.51545 14 7.93332 13.5821 7.93332 13.0667L7.93332 7.93356H13.0667C13.5821 7.93356 14 7.51569 14 7.00023C14 6.48476 13.5821 6.06689 13.0667 6.06689H7.93332L7.93332 0.933333C7.93332 0.417868 7.51545 0 6.99998 0C6.48452 0 6.06665 0.417867 6.06665 0.933333L6.06665 6.06689H0.933333C0.417868 6.06689 0 6.48476 0 7.00023C0 7.51569 0.417868 7.93356 0.933333 7.93356H6.06665L6.06665 13.0667Z" fill="#EE735A"/></svg></span> Добавить услугу</a>
            </div>
            <div class="form-group mb-3 col">
              <Field v-model="sort" class="formInput w-100" name="sort" placeholder="Сортировка, по умолчанию 500" type="number" />
              <ErrorMessage class="error_input" name="sort" />
            </div>
            <div class="d-flex mr-0 ml-0 p-3">
              <button class="button blueButton px-5" >Обновить</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>


import { Form, Field, ErrorMessage } from "vee-validate";
import axios from 'axios';
import authHeader from "@/services/auth-header";
import Toast from 'primevue/toast';

export default {
  name: "Add Rates",
  components: {
    Toast,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      name: '',
      price: '',
      sort: 500,
      rates_props:{
       0: 'props',
       1: 'props',
      },
    };
  },

  methods:{

    iniRates(){
      axios.get(this.hostapi+'rates/admin/edit/?id='+this.$route.params.id).then((response)=>{

        this.name=response.data.name;
        this.price=response.data.price;
        this.sort=response.data.sort;
        this.rates_props = JSON.parse(response.data.props);
        //console.log(JSON.parse(response.data.props));
        //this.rates=response.data;
      })
    },
    addMember(){
      let tmpKey=0;
      console.log(this.rates_props);
      for(let i in this.rates_props){
        console.log(i);
        tmpKey++;
      }
      tmpKey=tmpKey+1;
      this.rates_props[tmpKey]='props';
    },
    removeMember(index){
      this.rates_props.splice(index,1);
    },
    onSubmit(values) {

      values['id']=this.$route.params.id;

      axios.post( this.hostapi+'rates/admin/edit/',
          values,
          {
            headers: authHeader()
          }
      ).then((resp)=>{

        if(resp.data.status === 'success'){
          this.$toast.add({severity:'success', summary: 'Тариф обновлен', detail:'', life: 30000});
        }

      }).catch(function(error){
        console.log(error);
      });

      //console.log(this.editor.getHTML());


    },
    validateName() {

      // if the field is empty
      /*if (!value) {

        return 'This field is required';
      }*/
      // All is good
      return true;
    },
  },
  mounted() {
    this.iniRates();
  },
  beforeUnmount() {
    //this.editor.destroy()
  },
};
</script>

<style scoped>
  .warp_remove svg path{
    fill:#bcbcbc;
  }
  .warp_remove:hover svg path{
    fill: #EE735A;
  }
</style>