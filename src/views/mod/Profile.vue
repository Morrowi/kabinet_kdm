<template>
  <div class="contentBlock mb-5">
    <div class="f-24 fw-600 mb-3">
      Профиль
    </div>
    <div class="row justify-content-between h-100">
      <div class="col-12 mb-3">
        <div class="b-radius bg-white">
          <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
            <div class="f-18 fw-600">
              Основная информация
            </div>
          </div>
          <div class="border-bottom p-3">
            <div class="row justify-content-between me-0 ml-0 align-items-start">
              <form class="formTask col-12 col-sm-8" action="">
                <div class="row align-items-center mb-3">
                  <label for="p-name" class="form-label col-2">Имя</label>
                  <div class="col-5">
                    <input type="text" id="p-name" class="w-100 formInput task" :value="currentUser.username">
                  </div>
                </div>
                <div class="row align-items-center  mb-3">
                  <label for="p-name" class="form-label col-2">Email</label>
                  <div class="col-5">
                    <input type="email" id="p-email" class="w-100 formInput task" :value="currentUser.email">
                  </div>
                </div>
                <div class="row align-items-center  mb-3">
                  <label for="p-phone" class="form-label col-2">Телефон</label>
                  <div class="col-5">
                    <input type="text" id="p-phone" class="w-100 formInput task">
                  </div>
                </div>
                <div class="row align-items-center  mb-3">
                  <label for="p-phone" class="form-label col-2">Фотография</label>
                  <div class="col-5">
                      <DropZone
                          :maxFiles="1"
                          :acceptedFiles="['image']"
                          method="POST"
                          url="http://panel.kdm1.biz/api/upload/user"
                          :uploadOnDrop="true"
                          :multipleUpload="true"
                          :parallelUpload="1"
                          :headers="{'Authorization': header}"
                          />
                  </div>
                </div>
                <div class="row align-items-center  mb-3">
                  <label for="p-description" class="form-label col-2">Описание</label>
                  <div class="col-5">
                    <textarea id="p-description" class="w-100 formInput" placeholder=""></textarea>
                  </div>
                </div>

              </form>
             </div>
          </div>
          <div class="row me-0 ml-0 justify-content-center justify-content-lg-end">
            <div class="col-auto mx-2 my-3">
              <div class="button buttonBorder" @click="reUser();">Написать сообщение</div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { DropZone } from 'dropzone-vue';
//import authHeader from '@/services/auth-header';

export default {
  name: 'Profile',
  components: {
    DropZone,
  },
  data() {
    let user = JSON.parse(localStorage.getItem('user'));
    let header ='Bearer ' + user.accessToken;

    console.log(this.$store.state.auth.user);
    return {
      loading:false,
      header
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods:{
    reUser() {
      this.loading = true;
      this.$store.dispatch("auth/reuser");
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>