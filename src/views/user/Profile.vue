<template>
  <div class="container-fluid vh-100">
    <Form @submit="uodatePrifile">
      <span class="p-float-label">
        <InputText id="username" type="text" v-model="username" />
        <label for="username">Название</label>
      </span>
      <span class="p-float-label">
        <InputText id="email" type="text" v-model="email" />
        <label for="email">Email</label>
      </span>
      <div v-if="image">
        <Avatar shape="circle" :image="image" />
      </div>
      <div v-else>
        <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
      </div>
      <FileUpload mode="basic" accept="image/*" />

    </Form>
  </div>
</template>

<script>
// let start = Date.now();
// let times = [];



// setTimeout(function run() {
//   func(i);
//   setTimeout(run, 100);
// }, 100);
//
// let seconds = new Date().getTime();
// 1655823600.000
// console.log(seconds);



import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import FileUpload from 'primevue/fileupload';

export default {
  name: "Profile",
  components: {
    InputText,
    Avatar,
    FileUpload

  },
  data() {
    return{
      username:null,
      email: null,
      image:null,
    }
  },
  watch:{

  },
  methods: {
    uodatePrifile(){

    }
  },
};
</script>
