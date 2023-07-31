<template>
  <div class="container-fluid vh-100">

    <div class="b-radius bg-white p-3">
      <form class="formTask" action="">
        <div class="row">
          <div class="col-lg-5">
            <div class="form-group mb-3">
              <Dropdown v-model="selected_user" :options="usersList" optionLabel="username" optionValue="id" placeholder="Пользователь" />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group mb-3">
              <Editor v-model="valueEditor" editorStyle="height: 190px" placeholder="Текст"></Editor>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <Button label="Отправить" class="p-button-success" @click="send"/>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import Button from 'primevue/button';
import Editor from 'primevue/editor';
import Dropdown from 'primevue/dropdown';
import axios from "axios";
import authHeader from "@/services/auth-header";

export default {
  name: "Users",
  components: {
    Editor,
    Dropdown,
    Button
  },
  data() {

    return {
      selected_user:null,
      valueEditor:null,
      usersList:[{
        id:'all',
        username: 'Всем пользователям'
      }]
    }
  },
  watch:{

  },
  methods: {
    send(){
      console.log(this.selected_user);
    },
    initUserList(){
      axios.post( this.hostapi+'users/list',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        Array.prototype.push.apply(this.usersList,resp.data);
        console.log(resp.data);


        console.log(this.usersList);
      }).catch(function(error){
        console.log(error);
      });
    },
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.initUserList();
  }
};
</script>
