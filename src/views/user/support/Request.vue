<template>

  <div class="contentBlock mb-5">
    <div class="row mr-0 ml-0 justify-content-between mb-3 ">
      <div class="f-24 fw-600 col-auto">
        Создание новой заявки
      </div>
    </div>
    <transition name="fade" >
     <div class="row ">
        <div class="col-12">
          <div class="b-radius bg-white">
            <div class="col-12 ">
              <div class="d-flex">
                <div class="col-3 ">
                  <div class="p-title">Куда</div>
                </div>
                <div class="col-6 ">
                  <div class="w-100">
                    <Dropdown v-model="selectedType" :options="type"  optionLabel="name" placeholder="Выберите событие" />
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <div class="col-3 ">
                  <div class="p-title">Тема</div>
                </div>
                <div class="col-6 warp_request">
                    <InputText type="text" v-model="theme" placeholder="Обращение" />
                </div>
              </div>
              <div class="d-flex">
                <div class="col-3 ">
                  <div class="p-title">Ваше сообщение</div>
                </div>
                <div class="col-6 warp_request">
                  <Textarea v-model="text" rows="10 " cols="30" />
                </div>
              </div>
              <div class="d-flex">
                <div class="col-3 ">
                  <div class="p-title">Прикрепить файл</div>
                </div>
                <div class="col-6 ">
                  <FileUpload :customUpload="true" @select="customPreSelected"  mode="advanced"  :showUploadButton="false"  :multiple="true" :maxFileSize="3145728">
                  </FileUpload>
                  <small>Суммарный размер файлов — до 3 Мб</small>
                </div>
              </div>
              <div class="d-flex mt-3 mb-3">
                <div class="col-3 "></div>
                <div class="col-6 d-flex align-items-center">
                  <button class="button blueButton px-4 mr-5" @click="submitForm" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    Отправить
                  </button>
                  <router-link class="button" to="/dashboard/support/" active-class="active">
                    Отмена
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
       <Toast />
      </div>

    </transition>
  </div>

</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';

export default {
  name: "Support",
  components: {
    InputText,
    Dropdown,
    Textarea,
    FileUpload,
    Toast
  },
  data() {
    return {
      loading:false,
      theme:null,
      selectedType: null,
      text:null,
      type: [
        {name: 'Технические вопросы', code: '1'},
        {name: 'Общие вопросы', code: '2'},
        {name: 'Жалобы и предложения', code: '3'},
      ],
      files:null

    }
  },
  watch:{

  },
  methods: {
    customPreSelected(event) {
      this.files = event.files;
    },
    dateToYMD(date) {
      var d = date.getDate();
      var m = date.getMonth() + 1; //Month from 0 to 11
      var y = date.getFullYear();
      return ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y ;
    },
    submitForm(){
      //this.$emit('uploader');
      let formData = new FormData();

      //
      if(this.theme === null){
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Не введено тема', life: 3000});
        return false;
      } else {
        formData.append('theme', this.theme);
      }


      if(this.selectedType !==null){
        formData.append('stype', this.selectedType.code);
      }

      //описание задачи
      if(this.text !==null){
        formData.append('text', this.text);
      }

      //Файлы
      if(this.files !=null){
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('files', file);
        }
      }



      axios.post( 'http://panel.kdm1.biz/api/support/add',
          formData,
          {
            headers: authHeader(), 'Content-Type': 'multipart/form-data'
            //headers: { authHeader(), 'Content-Type': 'multipart/form-data'}
          }
      ).then((resp) => {
        if(resp.data === 'saccess'){
          this.theme=null;
          this.stype=null;
          this.text=null;
          this.files=null;

          this.$toast.add({severity:'success', summary: 'Задача добавлена', detail:'', life: 5000});
          setTimeout(()=>{
            this.$router.push("/dashboard/support/");
          },3000);
        } else {
          this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Попробуйте позже', life: 3000});
        }


      }).catch(function(error){
        console.log(error);
        console.log(this.$toast);
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Не введено название задачи', life: 3000});
      }).finally(() => (this.loading = false));

      /* UserService.getAddTasks(formData).then(
           (response) => {
            console.log(response);
           },
           (error) => {
             this.content =
                 (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                 error.message ||
                 error.toString();
           }
       );*/


    },
  },
  mounted() {

  }
};
</script>
<style>
.warp_request .p-inputtext, .p-cascadeselect {
  background: #FFFFFF;
  border: 1px solid #F0F2FA !important;
  border-radius: 6px !important;
  width: 100% !important;
  height: 54px;
}
.warp_request .p-inputtextarea{
  height: 90px;
}

.p-title{
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: #94A2AB;
  padding: 14px 0;
}

</style>