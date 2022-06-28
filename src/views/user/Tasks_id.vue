<template>
  <div>
    <div class="b-radius bg-white p-3">
      <div class="d-flex align-items-center flex-wrap justify-content-between mb-3">
        <div class="f-18 fw-600">
          {{ modalTaks.nameTask }}
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="form-group mb-3">
            {{modalTaks.selectedLabel}}
          </div>
        </div>
        <div class="col-12">
          <div class="form-group mb-3" v-html="modalTaks.valueEditor"></div>
        </div>
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-7">
              <div class="form-group mb-3"  v-if="modalTaks.date !==null">
                <b>Выполнить до:</b> {{modalTaks.date}}
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12" v-if="modalTaks.files.length > 0">
          <div class="d-flex"><b>Файлы</b></div>
          <div class="" v-for="file in modalTaks.files" :key="file.id">
            <a target="_blank" :href="file.url">{{file.name}}</a>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
//import UserService from "../../services/user.service";

import  'primevue/resources/themes/saga-blue/theme.css';
import  'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import axios from "axios";
import authHeader from "@/services/auth-header";
//import ContextMenu from "@imengyu/vue3-context-menu";

export default {
  name: "Tasks user",
  props: {
    isShowHead:{
      type: Boolean,
      default: true,
    },
  },
/*  emits: {
    uploader(payload) {
      return payload;
      //console.log(payload);
    }
  },*/
  components: {

  },
  data() {


    console.log(this.$route.params.id);

    return{


      countTasksFlex: 'justify-content-between',
      countTasks:0,
      arrTasks:[],
      modalTaks:{
        nameTask:null,
        selectedLabel:null,
        valueEditor:null,
        date:null,
        files:null
      },
      //add tasks
      nameTask:null,

      selectedLabel:null,

      label: [
        {name: 'Важная', code: 'important'},
        {name: 'Нормальная', code: 'normal'},
        {name: 'Не очень', code: 'not very'}
      ],
      valueEditor:null,
      date:null,

      alertDay:{name: 'Напомнить за 1 день', code: '1'},
      alert: [
        {name: 'Напомнить за 1 день', code: '1'},
        {name: 'Напомнить за 2 дня', code: '2'},
        {name: 'Напомнить за неденю', code: '7'}
      ],
      files:null,
      //add tasks END

      openTask: false,
      open: false
    }
  },
  watch: {},
  async created() {
      await this.showTasks();
  },
  methods: {
    showModa(){
      this.open = true;
      this.$nextTick(() => {

        this.$refs.contentInput.focus();
      })
    },

   async showTasks(){
      axios.post( 'http://panel.kdm1.biz/api/tasks/id',
          {id:this.$route.params.id},
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        console.log(resp.data);
        let resDate = null;
        if(resp.data[0].date !==null){
           resDate = new Date(resp.data[0].date).toLocaleString();
        }
        switch (resp.data[0].selectedLabel) {
          case 'important':
            resp.data[0].selectedLabel = 'Важная';
            break;
          case 'not very':
            resp.data[0].selectedLabel = 'Не очень';
            break;
          default:
            resp.data[0].selectedLabel = 'Нормальная';
            break;
        }


        resp.data[0].date=resDate;
        console.log(resp.data[0]);
        this.modalTaks = resp.data[0];

        this.openTask=true;
      }).catch(function(error){
        console.log(error);
      });

    },
    fileUpload(){
      this.$refs.btn_upload.onBasicUploaderClick()
      this.$emit('click','.p-fileupload-buttonbar');
    },

    dateToYMD(date) {
      var d = date.getDate();
      var m = date.getMonth() + 1; //Month from 0 to 11
      var y = date.getFullYear();
      return ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y ;
    },
    onContextMenu(e, task_id) {
      e.preventDefault();
      console.log(task_id);
      let show_x =e.x;
      let tmp_x = e.x+150;

      let w = window.screen.width;
      if(w < tmp_x){
        show_x = show_x - (tmp_x -w) - 100;
      }

      this.$contextmenu({
        x: show_x ,
        y: (e.y + 20),
        items: [
          {
            label: "Статус",
            children: [
              {
                label: "В работе",
                customClass: "in_work",
                onClick: () => {
                  this.changeStatus(task_id, 1);
                },
              },
              {
                label: "На паузе",
                onClick: () => {
                  this.changeStatus(task_id, 2);
                },
              },
              {
                label: "На согласовании",
                onClick: () => {
                  this.changeStatus(task_id, 5);
                },
              },
              {
                label: "Ждем материалы",
                onClick: () => {
                  this.changeStatus(task_id, 4);
                },
              },
              {
                label: "Готово",
                onClick: () => {
                  this.changeStatus(task_id, 3);
                },
              },
            ],
          },

        ],
      });
    },
  },
  mounted() {

    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        this.open = false;
        this.openTask =false;
      }
    });

  },
};
</script>
