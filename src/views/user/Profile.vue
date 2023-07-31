<template>
  <div class="row">
    <div class="col-12">
      <div class="b-radius bg-white">
        <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
          <div class="f-18 fw-600">
            Основная информация
          </div>
        </div>
        <div class="container-fluid warp_profile">
          <div class="row">
            <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
              <div class="p-title">Название компании</div>
            </div>
            <div class="col-12 col-sm-7 col-lg-7 col-xl-6 d-flex align-items-center">
              <div class="form-group w-100">
                <InputText type="text" v-model="username" placeholder="Укажите название компании"/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
              <div class="p-title">Имя</div>
            </div>
            <div class="col-12 col-sm-7 col-lg-7 col-xl-6 d-flex align-items-center">
              <div class="form-group w-100">
                <InputText type="text" v-model="name" placeholder="Укажите ваше имя"/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
              <div class="p-title">Почта</div>
            </div>
            <div class="col-12 col-sm-7 col-lg-7 col-xl-6 d-flex align-items-center">
              <div class="w-100 form-group">
                <InputText  type="text" v-model="email" aria-describedby="email-help" placeholder="Добавьте почту"/>
                <small id="email-help" class="helper-text">На этот адрес приходят важные уведомления,<br>ответы службы поддержки и платежные документы</small>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
              <div class="p-title">Номер телефона</div>
            </div>
            <div class="col-12 col-sm-7 col-lg-7 col-xl-6 d-flex align-items-center">
              <div class="w-100 form-group">
                <InputMask mask="+9(999) 999-9999" v-model="phone" placeholder="Добавьте телефон" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
              <div class="p-title">Пароль</div>
            </div>
            <div class="col-12 col-sm-3 d-flex align-items-center">
              <div class="w-100 form-group">
                <InputText v-model="pasw" type="password" placeholder="******"/>
              </div>
            </div>
            <div class="col-12 col-sm-4 d-flex align-items-center justify-content-end">
              <div class="form-group">
                <div class="button buttonBorder" @click="showModalChangePW">Изменить пароль</div>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-5  col-lg-4 col-xl-3 d-flex align-items-center ">
              <div class="p-title">Фото профиля</div>
            </div>
            <div class="col-auto d-flex align-items-center p-2">
              <div v-if="image">
                <Avatar shape="circle" class="me-2" size="xlarge" @click="showEditAvata" :class="{'active':showEditAvataPanel}" :image="image" />
              </div>
              <div v-else>
                <Avatar class="me-2" size="xlarge" shape="circle" @click="showEditAvata" :class="{'active':showEditAvataPanel}"/>
              </div>
            </div>
            <div class="col-auto d-flex flex-column justify-content-center warp_edit_avatar" :class="{'active':showEditAvataPanel}">
              <div @click="toggleShow"  class="edit_avatar">Изменить фото</div>

              <div class="delited_avatar" @click="deleteAvatar">Удалить фото</div>
            </div>
          </div>
          <myUpload field="avatar"
                    url="http://panel.kdm1.biz/api/user/change/avatar"
                    @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess"
                    lang-type="ru"
                    v-model="show"
                    :width="300"
                    :height="300"
                    :headers="headers"
                    :noSquare="true"
                    :noCircle="false"
                    >
          </myUpload>
          <div class="row mt-3 mb-3">
            <div class="col-12 col-sm-5 col-lg-4 col-xl-3 "></div>
            <div class="col-12 col-sm-auto d-flex align-items-center justify-content-center">
                <button class="button blueButton px-4" @click="saveInfo" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  Сохранить изменения
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog header="Изменить пароль" v-model:visible="displayChangePw" position="top" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true" class="warp_dialog">
    <div class="col-6">
      <div class="form-group mb-4" :class="{ 'form-input-error': errorClassPasswordOld }">
        <input v-model="password_old" type="password" class="w-100 formInput" placeholder="Старый пароль">
        <div class="warp_error_text"  v-if="errorPasswordTextOld">{{errorPasswordTextOld}}</div>
      </div>
      <div class="form-group mb-4" :class="{ 'form-input-error': errorClassPassword }">
        <input v-model="password" type="password" class="w-100 formInput" placeholder="Новый пароль">
        <div class="warp_error_text"  v-if="errorPasswordText">{{errorPasswordText}}</div>
      </div>
      <div class="form-group mb-4" :class="{ 'form-input-error': errorClassPassword }">
        <input v-model="passwordConfirm" type="password" class="w-100 formInput" placeholder="Повторите новый пароль">
      </div>
      <button class="button blueButton px-4" @click="changePassword" :disabled="loading">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        Изменить пароль
      </button>
    </div>


    <template #footer>
      <Button label="Отмена" icon="pi pi-times" @click="showModalChangePW" class="p-button-text"/>
    </template>
  </Dialog>
  <Toast />
</template>

<script>
import Dialog from 'primevue/dialog';
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import axios from "axios";
import authHeader from "@/services/auth-header";
import Toast from 'primevue/toast';
import Button from 'primevue/button';


import myUpload from 'vue-image-crop-upload';
//import Cropper from '@/components/cropper/Cropper';

//https://github.com/rolodromo/playground-token-maker

export default {
  name: "Profile",
  components: {
    InputText,
    Avatar,
    InputMask,
    Toast,
    Dialog,
    Button,
    myUpload
    //Cropper
  },
  data() {

    let user = this.$store.state.auth.user;
    let image = null;
    if(user.avatar !== null && user.avatar.length > 3){
      image = 'http://panel.kdm1.biz/uploads/'+user.id+'/'+user.avatar;
    }

    return{

      show: false,
      headers: {
        'Authorization': 'Bearer ' + user.accessToken
      },
      imgDataUrl: '',

      displayChangePw:false,
      loading:false,
      username_disabled:true,
      pasw:'*******',
      phone:user.phone,
      username:user.username,
      email: user.email,
      name: user.name,
      image,
      showEditAvataPanel:false,
      password_old:null,
      errorPasswordText:null,
      errorPasswordTextOld:null,
      errorClassPasswordOld:false,
      password:null,
      passwordConfirm:null,
      errorClassPassword:false,
      regionSelected:'Выберите регион',
      selectedCity:null,
      countries: []
    }
  },

  methods: {

    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      console.log('imgDataUrl',imgDataUrl);
      console.log('field',field);
      this.image = imgDataUrl;
      document.getElementById('avatar_img').querySelector('img').setAttribute("src", imgDataUrl);
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
      this.reUser();
      this.showEditAvataPanel=false;
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
   /* cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    },

    */
    showModalChangePW(){
      this.displayChangePw = !this.displayChangePw;
    },
    saveInfo(){
      this.loading = true;
      let data = {
        phone:this.phone,
        username:this.username,
        name:this.name,
        email:this.email,
        region:this.selectedCity.cname,
        regionCode:this.selectedCity.code
      }
      axios.post( this.hostapi+'user/change/info',
          data,
          {
            headers: authHeader()
          }
      ).then((resp) => {
        if(resp.data === 'success'){
          this.reUser();
          //this.$toast.add({severity:'success', summary: 'Данные успешно изменены', detail:'', life: 5000});
          let name = document.getElementById('username_header');
          name.innerHTML = this.username;
        }

        this.loading = false;
      }).catch(function(error){
        this.loading = false;
        console.log(error);
      });
    },
    reUser() {
      this.$store.dispatch("auth/reuser");
    },
    previewImage(event){
      let input = event.target;
      let avatar=input.files[0];

      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        }
        this.image=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }


      let formData = new FormData();
      formData.append('avatar', avatar);
      axios.post( this.hostapi+'user/change/avatar',
          formData,
          {
            headers: authHeader(), 'Content-Type': 'multipart/form-data'
            //headers: { authHeader(), 'Content-Type': 'multipart/form-data'}
          }
      ).then((resp) => {
        if(resp.data === 'success'){
          this.showEditAvataPanel=false;
          this.reUser();
        }


      }).catch(function(error){
        console.log(error);
      });

    },
    deleteAvatar(){
      axios.post( this.hostapi+'user/deleted/avatar',
          {},
          {
            headers: authHeader()
          }
      ).then((resp) => {
        if(resp.data === 'success'){
          this.showEditAvataPanel=false;
          this.image=null;
          this.reUser();
        }


      }).catch(function(error){
        console.log(error);
      });
    },
    showEditAvata(){
      this.showEditAvataPanel = !this.showEditAvataPanel;
    },
    changePassword(){
      this.error = 0;
      this.loading = true;
      this.errorClassPassword=false;
      this.errorPasswordText =  null;
      this.errorPasswordTextOld=null;
      this.errorClassPasswordOld=false;

      if (!this.password_old) {
        this.errorClassPasswordOld=true;
        this.error++;
        this.errorPasswordTextOld =  'Старый пароль не заполнен';
        this.loading = false;
      }
      if (!this.password) {
        this.errorClassPassword=true;
        this.error++;
        this.errorPasswordText =  'Пароль не заполнен';
        this.loading = false;
      } else {
        if(this.password === this.passwordConfirm){
          if (this.password.length < 6) {
            this.errorClassPassword=true;
            this.error++;
            this.errorPasswordText =  'Пароль должен быть больше 6 символов';
            this.loading = false;
            this.displayChangePw=false;
          }
        } else {
          this.errorClassPassword=true;
          this.error++;
          this.errorPasswordText =  'Пароль не совпадает';
          this.loading = false;
        }

      }

      if(this.error === 0){
        axios.post( this.hostapi+'auth/change/password',
            {
              password_old:this.password_old, password:this.password
            },
            {
              headers: authHeader()
            }
        ).then((resp)=>{
          console.log(resp.data);
          if(resp.data === 'success'){
            this.$toast.add({severity:'success', summary: 'Пароль успешно изменент.', detail:'', life: 30000});
            this.password=null;
            this.passwordConfirm=null;
            this.password_old=null;
            this.displayChangePw=false;
            this.loading = false;
          } else if(resp.data.code ==='ER_BAD_FIELD_ERROR'){
            this.errorClassPasswordOld=true;
            this.errorPasswordTextOld =  'Неверный старый пароль';
            this.loading = false;
          }

        }).catch(function(error){
          this.loading = false;
          console.log(error);
          this.$toast.add(  {severity:'error', summary: 'Ошибка', detail:'Что-то пошло не так, обратитесь к администратору.', life: 3000});
          this.loading = false;
        });
      }

    },
    async initGeo(){
      let response = [];
      let res=[];
      let k=0;
      try {
        response = await axios.get(
            `http://panel.kdm1.biz/geo.json`
        );
        for(let i in response.data ){

          let states=[];
          let k2=0;
          for (let i2 in response.data[i].states){

            let cities = [];
            let k3=0;
            for (let i3 in response.data[i].states[i2].cities){
              cities[k3] = {
                cname:response.data[i].states[i2].cities[i3].cname,
                code:response.data[i].states[i2].cities[i3].code
              }
              k3++;
            }
            states[k2] = {
              name:response.data[i].states[i2].name,
              cities:cities
            }
            k2++;
          }

          res[k]={
            name:response.data[i].name,
            states:states
          }
          k++;
        }
        this.countries = res;
        let user = this.$store.state.auth.user;
        this.selectedCity = {
            cname: user.region,
            code: user.regionCode
        };
      } catch (error) {
        console.error(error);
      }
      //
    }
  },
  created() {

  },
  mounted() {
    this.initGeo();
  }
};



</script>
<style>
.warp_profile{
  padding-top: 13px;
  padding-bottom: 25px;
}
.warp_profile .form-group{
  margin-bottom: 20px;
}

.warp_profile .p-title{
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #94A2AB;
  padding: 14px 0;
}

.warp_profile .p-inputtext,
.p-cascadeselect{
  background: #FFFFFF;
  border: 1px solid #F0F2FA !important;
  border-radius: 6px !important;
  width: 100% !important;
  height: 54px;
}

.p-cascadeselect{
  line-height: 33px;
}

.warp_profile .buttonBorder{
  width: 200px;
  height: 40px;
}

.warp_profile .helper-text{
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #94A2AB;
  max-width: 312px;
  display: block;
  margin-top: 8px;
}
.warp_profile .p-avatar.p-avatar-circle{
  border-radius: 6px !important;
  cursor: pointer;
  position:relative;
  overflow: hidden;
}
.warp_profile .p-avatar.p-avatar-circle::before{
  content:'';
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  z-index: 10;
  background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 0H0V18H18V0Z' fill='white' fill-opacity='0.01'/%3E%3Cpath d='M15 5.25H3C2.58579 5.25 2.25 5.58579 2.25 6V14.25C2.25 14.6642 2.58579 15 3 15H15C15.4142 15 15.75 14.6642 15.75 14.25V6C15.75 5.58579 15.4142 5.25 15 5.25Z' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M3.75 5.25L4.56251 3H7.43749L8.25 5.25H3.75Z' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.875 12.75C12.3247 12.75 13.5 11.5747 13.5 10.125C13.5 8.67525 12.3247 7.5 10.875 7.5C9.42525 7.5 8.25 8.67525 8.25 10.125C8.25 11.5747 9.42525 12.75 10.875 12.75Z' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M13 4L13 5' stroke='white' stroke-linecap='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
}
.warp_profile .p-avatar.p-avatar-circle:hover::before,
.warp_profile .p-avatar.p-avatar-circle.active::before{
  display: block;
}

.warp_edit_avatar{
  background: #FFFFFF;
  box-shadow: 0 15px 50px rgba(160, 163, 189, 0.1);
  border-radius: 6px;
  padding-left: 30px;
  padding-right: 30px;
  transition: all 0.3s;
  display: none;
  opacity: 0;
}
.warp_edit_avatar.active{
  display: block;
  opacity: 1;
}

.warp_edit_avatar .edit_avatar{
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 5px;
  cursor:pointer;
}
.warp_edit_avatar .edit_avatar{
  overflow: hidden;
}
.warp_edit_avatar .edit_avatar input{
  position: absolute;
  top: -100000px;
  display: none;
}
.warp_edit_avatar .delited_avatar{
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #EE735A;
  text-align: center;
  cursor:pointer;
}


.warp_dialog{
  border-radius: 0.3rem;
  overflow: hidden;
}
.warp_dialog.p-dialog .p-dialog-header{
  border-bottom: 1px solid #dee2e6;
  padding: 1rem!important;
}
.warp_dialog .p-dialog-title{
  font-size: 24px !important;
  line-height: 30px;
}
.warp_dialog .p-dialog-content{
  padding: 1rem!important;
}
.form-input-error input{
  border:1px solid #EE735A;
  outline-color: #EE735A;
  color:#EE735A;
}

.warp_error_text{
  padding: 15px 16px;
  background: #FFE6E6;
  border-radius: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 160%;
  color: #000000;
  position: absolute;
  left: calc(100% + 30px);
  top: 0;
  max-width: 270px;
  width: 100%;
}
</style>
