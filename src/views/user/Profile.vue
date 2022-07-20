<template>
  <div class="row">
    <div class="col-12">
      <div class="b-radius bg-white">
        <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
          <div class="f-18 fw-600">
            Основная информация
          </div>
        </div>
        <div class="col-12 warp_profile">
          <div class="d-flex">
            <div class="col-3">
              <div class="p-title">Имя / Название компании</div>
            </div>
            <div class="col-6 d-flex align-items-center">
              <InputText id="username" type="text" v-model="username" placeholder="Укажите ваше имя или название компании"/>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-3 ">
              <div class="p-title">Почта</div>
            </div>
            <div class="col-6 d-flex align-items-center">
              <div class="w-100">
                <InputText  type="text" v-model="email" aria-describedby="email-help" placeholder="Добавьте почту"/>
                <small id="email-help" class="helper-text">На этот адрес приходят важные уведомления,<br>ответы службы поддержки и платежные документы</small>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-3 ">
              <div class="p-title">Номер телефона</div>
            </div>
            <div class="col-6 d-flex align-items-center">
              <div class="w-100">
                <InputText type="text" v-model="phone" placeholder="Добавьте телефон"/>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-3 ">
              <div class="p-title">Пароль</div>
            </div>
            <div class="col-4 d-flex align-items-center">
              <div class="w-100">
                <InputText v-model="pasw" type="password" placeholder="******"/>
              </div>
            </div>
            <div class="col-2 d-flex align-items-center justify-content-end">
              <div class="button buttonBorder" @click="showModalChangePW">Изменить пароль</div>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-3 d-flex align-items-center ">
              <div class="p-title">Фото профиля</div>
            </div>
            <div class="col-auto d-flex align-items-center">
              <div v-if="image">
                <Avatar shape="circle" :image="image" />
              </div>
              <div v-else>
                <Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" @click="showEditAvata" />
              </div>
            </div>
            <div class="col-auto d-flex flex-column justify-content-center">
              <div>Изменить фото</div>
              <div>Удалить фото</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid vh-100">
    <form @submit="uodatePrifile">
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

    </form>
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
      username_disabled:true,
      pasw:'*******',
      phone:null,
      username:null,
      email: null,
      image:null,
    }
  },
  watch:{

  },
  methods: {
    uodatePrifile(){

    },
    showEditAvata(){
      console.log(1)
    }
  },
};
</script>
<style>
.warp_profile .p-title{
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #94A2AB;
  padding: 14px 0;
}

.warp_profile .p-inputtext{
  background: #FFFFFF;
  border: 1px solid #F0F2FA !important;
  border-radius: 6px !important;
  width: 100% !important;
  height: 54px;
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
}
.warp_profile .p-avatar.p-avatar-circle:hover::before{
  display: block;
}

</style>