<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <Form @submit="onSubmit">
        <div class=" b-radius bg-white formTarifItem mx-3">
          <div class="row align-items-center flex-wrap justify-content-between border-bottom p-3">
            <div class="form-group mb-3 col">
              <Field class="formInput w-100" name="name" placeholder="Название" type="text" :rules="validateName" />
              <ErrorMessage class="error_input" name="name" />
            </div>
            <div class="form-group mb-3 col-4">
              <Field class="formInput w-100" name="price" placeholder="Цена " type="text" :rules="validateName" />
              <ErrorMessage class="error_input" name="price" />
            </div>
          </div>

          <div class="p-3 border-bottom" v-for="(item, index) in rates_props" :key="index">
            <Field
                as="textarea"
                :name="'props['+index+']'"
                class="formInput w-100"
                placeholder="" style="min-height:70px; height: 70px;"
            />
          </div>

          <div class="mx-3 d-flex justify-content-end">
              <a href="javascript:void(0);" class="button" @click="addMember();"><span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.06665 13.0667C6.06665 13.5821 6.48452 14 6.99998 14C7.51545 14 7.93332 13.5821 7.93332 13.0667L7.93332 7.93356H13.0667C13.5821 7.93356 14 7.51569 14 7.00023C14 6.48476 13.5821 6.06689 13.0667 6.06689H7.93332L7.93332 0.933333C7.93332 0.417868 7.51545 0 6.99998 0C6.48452 0 6.06665 0.417867 6.06665 0.933333L6.06665 6.06689H0.933333C0.417868 6.06689 0 6.48476 0 7.00023C0 7.51569 0.417868 7.93356 0.933333 7.93356H6.06665L6.06665 13.0667Z" fill="#EE735A"/></svg></span> Добавить услугу</a>
          </div>
          <div class="form-group mb-3 col">
            <Field class="formInput w-100" name="sort" placeholder="Сортировка, по умолчанию 500" type="number" />
            <ErrorMessage class="error_input" name="sort" />
          </div>
          <div class="d-flex mr-0 ml-0 p-3">
            <button class="button blueButton px-5" >Добавить тариф</button>
          </div>
        </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>


import { Form, Field, ErrorMessage } from "vee-validate";
import axios from 'axios';
import authHeader from "@/services/auth-header";

export default {
  name: "Add Rates",
  components: {

    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      rates_props:{
       0: 'props',
       1: 'props',
      },
    };
  },

  methods:{
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

    onSubmit(values) {

      let userStorage = JSON.parse(localStorage.getItem('user'));

      values['user_id']=userStorage.id;
      console.log(values);
      axios.post( this.hostapi+'rates/add',
          values,
          {
            headers: authHeader()
          }
      ).then(function(resp){
        console.log(resp);

      }).catch(function(error){
        console.log(error);
      });

      //console.log(this.editor.getHTML());


    },
    validateName(value) {
      console.log(value);
      // if the field is empty
      /*if (!value) {

        return 'This field is required';
      }*/
      // All is good
      return true;
    },
  },
  mounted() {

  },
  beforeUnmount() {
    //this.editor.destroy()
  },
};
</script>
