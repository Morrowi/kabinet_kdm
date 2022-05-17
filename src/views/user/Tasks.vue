<template>
  <div>
    <div class="row mr-0 ml-0 justify-content-between mb-3 flex-column" v-if="isShowHead">
      <div class="f-24 fw-600 mb-2">
        Задачи
      </div>
      <div class="f-14">
        Вы можете создать задачу самостоятельно либо через личного менеджера, <a class="color-blue" href="marketolog.html">написав ему в
        чат</a>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="b-radius bg-white">
          <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
            <div class="f-18 fw-600">
              Задачи
            </div>
          </div>
          <div class="myTable">
            <div class="topBlock">
              <div class="titleBlock">Описание задачи</div>
              <div class="infoBlock">Статус</div>
              <div class="infoBlock">Дата создания</div>
              <div class="infoBlock">Действие</div>
            </div>
            <div class="contentBlock">
              <div class="itemBlock" v-for="tasks in arrTasks" :key="tasks.id">
                <div class="titleBlock" @click="showTasks(tasks.id);">{{tasks.nameTask}}</div>
                <div class="infoBlock">
                  <div class="tabletInfo" :class="tasks.status_class">
                    {{tasks.status_text}}
                  </div>
                </div>
                <div class="infoBlock">{{tasks.date_insert}}</div>
                <div class="infoBlock box"  @click="onContextMenu($event, tasks.id)">
                  <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.3">
                      <path
                          d="M13.4874 1.01257C12.804 0.329152 11.696 0.329152 11.0126 1.01257C10.3291 1.69598 10.3291 2.80402 11.0126 3.48744C11.696 4.17085 12.804 4.17085 13.4874 3.48744C14.1709 2.80405 14.1709 1.69601 13.4874 1.01257Z"
                          fill="#030229"/>
                      <path
                          d="M8.23744 1.01257C7.55402 0.329152 6.44598 0.329152 5.76257 1.01257C5.07915 1.69598 5.07915 2.80402 5.76257 3.48744C6.44598 4.17085 7.55402 4.17085 8.23744 3.48744C8.92085 2.80405 8.92085 1.69601 8.23744 1.01257Z"
                          fill="#030229"/>
                      <path
                          d="M2.98744 1.01257C2.30402 0.329152 1.19598 0.329152 0.512564 1.01257C-0.170852 1.69598 -0.170852 2.80402 0.512564 3.48744C1.19598 4.17085 2.30402 4.17085 2.98744 3.48744C3.67085 2.80405 3.67085 1.69601 2.98744 1.01257Z"
                          fill="#030229"/>
                    </g>
                  </svg>
                </div>
              </div>

            </div>
          </div>
          <div class="pr-3 pl-3 pt-2 pb-2 px-3">
            <div class="row  justify-content-between align-items-center">
              <div class="col-auto">
                <div class="colMessBlock f-14 color-blue">
                  Все задачи <span>({{ countTasks }})</span>
                </div>
              </div>
              <div class="col-auto">
                <div class="button buttonBorder" @click="open = true">
                  + Новая задача
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{show: open}" :style="[open?'display: block':'display: none']"  class="modal fade " id="newTask">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header p-3">
            <div class="f-24 fw-600">Новая задача</div>
            <button type="button" class="close" @click="open = false">&times;</button>
          </div>
          <div class="modal-body">
            <form class="formTask" action="">
              <div class="row">
                <div class="col-lg-8">
                  <div class="form-group mb-3">
                    <input v-model="nameTask" type="text" class="w-100 formInput task" placeholder="Название задачи">
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="form-group mb-3">
                    <Dropdown v-model="selectedLabel" :options="label" optionLabel="name" placeholder="Добавить метку" />
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group mb-3">
                    <Editor v-model="valueEditor" editorStyle="height: 190px" placeholder="Добавьте более подробное описание задачи"></Editor>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="row">
                    <div class="col-lg-7">
                      <div class="form-group mb-3">
                        <Calendar v-model="date"  dateFormat="dd.mm.yy" :showTime="true" :stepMinute="10" :manualInput="true"  placeholder="Укажите дату и время выполнения"/>
                      </div>
                    </div>
                    <div class="col-lg-5">
                      <div class="form-group mb-3">
                        <Dropdown v-model="alertDay" :options="alert" optionLabel="name" placeholder="Напомнить" />
                        </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="d-flex justify-content-lg-end justify-content-center align-items-center">
                    <div class="f-12 color-2 me-3">
                      Максимальный
                      <br>
                      размер 300 Мб
                    </div>
                    <div class="form-group mb-0">
                      <div class="inputFile" @click="fileUpload">
                        <div class="imgFile">
                          <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.2414 8.60217C15.3468 8.70772 15.4059 8.85083 15.4058 9.00001C15.4057 9.14919 15.3464 9.29222 15.2408 9.39764L9.47147 15.1595C9.10582 15.5251 8.67174 15.8151 8.19401 16.013C7.71628 16.2108 7.20426 16.3126 6.68718 16.3126C5.64289 16.3126 4.64139 15.8977 3.903 15.1592C3.16461 14.4207 2.74982 13.4192 2.74988 12.3749C2.74993 11.3306 3.16483 10.3291 3.90329 9.59073L10.8831 2.51375C11.144 2.25206 11.4539 2.04435 11.7951 1.9025C12.1364 1.76064 12.5022 1.68742 12.8717 1.68701C13.2412 1.68661 13.6072 1.75903 13.9488 1.90013C14.2903 2.04124 14.6007 2.24826 14.8621 2.50937C15.1236 2.77049 15.3311 3.08057 15.4727 3.4219C15.6142 3.76323 15.6872 4.12911 15.6873 4.49864C15.6874 4.86817 15.6147 5.23409 15.4733 5.57551C15.3319 5.91692 15.1246 6.22713 14.8633 6.4884L7.88347 13.5654C7.72699 13.7225 7.5411 13.8472 7.33642 13.9323C7.13174 14.0175 6.91229 14.0615 6.69059 14.0619C6.4689 14.0622 6.24931 14.0188 6.04438 13.9343C5.83944 13.8497 5.65319 13.7256 5.49624 13.569C5.3393 13.4124 5.21475 13.2264 5.12971 13.0217C5.04467 12.817 5.0008 12.5975 5.00062 12.3758C5.00044 12.1541 5.04394 11.9345 5.12865 11.7296C5.21335 11.5248 5.3376 11.3386 5.49428 11.1818L11.3486 5.23019C11.4532 5.12383 11.5958 5.0634 11.745 5.06218C11.8942 5.06095 12.0377 5.11904 12.1441 5.22366C12.2504 5.32828 12.3109 5.47087 12.3121 5.62005C12.3133 5.76923 12.2552 5.91279 12.1506 6.01914L6.29303 11.974C6.24016 12.0259 6.19807 12.0878 6.16917 12.156C6.14028 12.2243 6.12516 12.2975 6.12467 12.3716C6.12418 12.4457 6.13834 12.5192 6.16632 12.5878C6.19431 12.6564 6.23558 12.7188 6.28776 12.7714C6.33994 12.824 6.402 12.8658 6.47038 12.8944C6.53876 12.9229 6.6121 12.9377 6.68621 12.9378C6.76031 12.938 6.8337 12.9234 6.90218 12.8951C6.97065 12.8668 7.03285 12.8252 7.08521 12.7728L14.0651 5.69566C14.2223 5.53921 14.3471 5.35331 14.4324 5.1486C14.5176 4.94388 14.5617 4.72436 14.5621 4.50259C14.5625 4.28083 14.5192 4.06116 14.4346 3.85615C14.35 3.65114 14.2259 3.46481 14.0692 3.30782C13.9126 3.15082 13.7265 3.02624 13.5217 2.9412C13.3169 2.85616 13.0973 2.81232 12.8756 2.8122C12.6538 2.81208 12.4342 2.85567 12.2293 2.94048C12.0244 3.02529 11.8382 3.14966 11.6814 3.30648L4.70152 10.3835C4.43983 10.6444 4.23212 10.9543 4.09026 11.2955C3.9484 11.6367 3.87518 12.0026 3.87477 12.3721C3.87436 12.7416 3.94678 13.1076 4.08789 13.4492C4.229 13.7907 4.43603 14.1011 4.69714 14.3625C4.95826 14.624 5.26835 14.8315 5.60968 14.9731C5.95102 15.1147 6.31691 15.1876 6.68644 15.1877C7.05598 15.1878 7.42191 15.1151 7.76333 14.9737C8.10475 14.8323 8.41496 14.6251 8.67623 14.3637L14.4458 8.60169C14.4981 8.54947 14.5601 8.50807 14.6284 8.47983C14.6967 8.4516 14.7698 8.43709 14.8437 8.43713C14.9176 8.43718 14.9907 8.45177 15.0589 8.48009C15.1272 8.50841 15.1892 8.54989 15.2414 8.60217Z"
                                fill="#0D85FB"/>
                          </svg>
                        </div>
                        <div class="inputFileName f-14 color-blue" >Прикрепите файл</div>
<!--                        <input type="file" value="Прикрепите файл">-->
                      </div>
                      <div class="fileNameChange"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <FileUpload ref="btn_upload" :customUpload="true" @select="customPreSelected"  mode="advanced"   :showUploadButton="false" :showCancelButton="false"  name="demo[]" :multiple="true" :maxFileSize="300000000">
                </FileUpload>
              </div>
            </form>
          </div>
          <div class="d-flex justify-content-start px-3 pb-3">
            <button @click="submitForm" type="button" class="button buttonBorder">Создать задачу</button>
          </div>

        </div>
      </div>
    </div>
    <div :class="{show: openTask}" :style="[openTask?'display: block':'display: none']"  class="modal fade " id="showTask">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header p-3">
            <div class="f-24 fw-600">{{ modalTaks.nameTask }}</div>
            <button type="button" class="close" @click="openTask = false">&times;</button>
          </div>
          <div class="modal-body">
            <form class="formTask" action="">
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
                      <div class="form-group mb-3" >
                        <b>Выполнить до:</b> {{modalTaks.date}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="d-flex"><b>Файлы</b></div>
                  <div class="" v-for="file in modalTaks.files" :key="file.id">
                    <a target="_blank" :href="file.url">{{file.name}}</a>
                  </div>
                </div>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
    <Toast />

  </div>
</template>

<script>
//import UserService from "../../services/user.service";
import Editor from 'primevue/editor';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import FileUpload from 'primevue/fileupload';
import  'primevue/resources/themes/saga-blue/theme.css';       //theme
import  'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';
import Toast from 'primevue/toast';
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
    Editor,
    Dropdown,
    Calendar,
    FileUpload,
    Toast,
    //ContextMenu,
  },
  data() {
    return{



      countTasks:0,
      arrTasks:[],
      modalTaks:[],
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
  created() {
    //console.log();
    this.listTasks();
  },
  methods: {

    listTasks(){
      axios.post( 'http://panel.kdm1.biz/api/tasks/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        for (const k in resp.data) {
          resp.data[k].date_insert= this.dateToYMD(new Date(resp.data[k].date_insert));
          switch (resp.data[k].status){
            case 1:
              resp.data[k].status_class='work';
              resp.data[k].status_text='В работе';
              break;
            case 2:
              resp.data[k].status_class='pause';
              resp.data[k].status_text='На паузе';
              break;
            case 3:
              resp.data[k].status_class='completed';
              resp.data[k].status_text='Готово';
              break;
            case 4:
              resp.data[k].status_class='wait';
              resp.data[k].status_text='Ждем материалы';
              break;
            case 5:
              resp.data[k].status_class='agreed';
              resp.data[k].status_text='На согласовании';
              break;
          }
          //status
        }
        this.countTasks = resp.data.length;
        this.arrTasks = resp.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    showTasks(id){
      axios.post( 'http://panel.kdm1.biz/api/tasks/id',
          {id:id},
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        console.log(resp.data);
        let resDate = new Date(resp.data[0].date).toLocaleString();
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
    submitForm(){
      //this.$emit('uploader');
      let formData = new FormData();

      //Название задачи
      if(this.nameTask === null){
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Не введено название задачи', life: 3000});
        return false;
      } else {
        formData.append('nameTask', this.nameTask);
      }

      //Метка важности
      if(this.selectedLabel !==null){
        formData.append('selectedLabel', this.selectedLabel.code);
      }

      //описание задачи
      if(this.valueEditor !==null){
        formData.append('valueEditor', this.valueEditor);
      }

      //дата
      if(this.date !==null){
        formData.append('date', this.date);
      }

      //Напоминание
      formData.append('alertDay', this.alertDay.code);

      //Файлы
      if(this.files !=null){
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('files', file);
        }
      }
      //formData.append('files[]', this.files);
      //let val={name:'name'};


      axios.post( 'http://panel.kdm1.biz/api/tasks/add',
          formData,
          {
            headers: authHeader(), 'Content-Type': 'multipart/form-data'
            //headers: { authHeader(), 'Content-Type': 'multipart/form-data'}
          }
      ).then((resp) => {
        if(resp.data === 'saccess'){
          this.listTasks();
          this.$toast.add({severity:'success', summary: 'Задача добавлена', detail:'', life: 3000});
          this.open=false;
          this.nameTask=null;
          this.selectedLabel=null;
          this.valueEditor=null;
          this.date=null;
          this.files=null;

        } else {
          this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Попробуйте позже', life: 3000});
        }


      }).catch(function(error){
        console.log(error);
        console.log(this.$toast);
        this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Не введено название задачи', life: 3000});
      });

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
    customPreSelected(event) {
      this.files = event.files;
    },
    dateToYMD(date) {
      var d = date.getDate();
      var m = date.getMonth() + 1; //Month from 0 to 11
      var y = date.getFullYear();
      return ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y ;
    },
    onContextMenu(e, index) {
      e.preventDefault();
      console.log(index);
      this.$contextmenu({
        x: e.x,
        y: e.y,
        items: [
          {
            label: "Rename",
            onClick: () => {

            },
          },
          {
            label: "Delete",
            onClick: () => {

            },
          },
          {
            label: "Get Responses",
            onClick: () => {

            },
          },
        ],
      });
    },
  },
};
</script>
