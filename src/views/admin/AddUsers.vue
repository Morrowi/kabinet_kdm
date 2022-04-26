<template>
  <div class="container-fluid vh-100">
    <Form @submit="addUser" :validation-schema="schema">
      <div v-if="!successful" class="col-12 col-md-7">
        <div class="form-group mb-3">
          <label >Username</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group mb-3">
          <label >Email</label>
          <Field name="email" type="email" class="form-control" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group mb-3">
          <label >Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group mb-3">
          <Editor v-model="valueEditor" editorStyle="height: 320px">

          </Editor>
        </div>
        <DropZone
            url="/admin/users/add/sendmessage"
            paramName="avatar"
            :uploadOnDrop="false"
            @addedFile="onFileAdd"
        />
        <div class="form-group mb-3">
          <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
              ></span>
            Добавить
          </button>
        </div>
      </div>
    </Form>

  </div>

</template>

<script>
import UserService from "../../services/user.service";
import { Field, Form, ErrorMessage } from 'vee-validate';
import Editor from 'primevue/editor';
import * as yup from "yup";
export default {
  name: "Users",
  components: {
    Field,
    Form,
    ErrorMessage,
    Editor
  },
  data() {
    const schema = yup.object().shape({
      username: yup
          .string()
          .required("Username is required!")
          .min(3, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
      password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
    });
    return {
      files:[],
      successful: false,
      loading: false,
      schema,
      valueEditor:''
    }
  },
  watch:{

  },
  methods: {
    onFileAdd(files){
      //console.log(files);
      this.files = files.file;
      console.log(this.files);
    },
    shootMessage: async function () {
      this.$refs.myVueDropzone.processQueue();
    },
    sendMessage: async function (files, xhr, formData) {
      formData.append("email", this.email);
      formData.append("message", this.message);
      formData.append("recipient", this.recipient);
    },
    addUser(values){
      console.log(values);

     /* let formData = new FormData();
      for (let k in values) {
        if(values[k] !==undefined){
          formData.append(k, values[k]);
        }
      }*/
      values['files']=this.files;
      values['description']=this.valueEditor;

      UserService.getAddMarketolog(values).then(
          (response) => {
            if(response.data == 'saccess'){
              this.$router.push('/admin/users');
            }
          },
          (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );


    }

  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {

  }
};
</script>
