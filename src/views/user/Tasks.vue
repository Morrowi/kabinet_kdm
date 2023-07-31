<template>
  <transition name="fade" >
    <div class="position-absolute" v-if="loading"></div>
    <div v-else>
      <div class="row">
        <div class="col-12">
          <div class="b-radius bg-white warp_task_list">
            <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom warp_task_header">
              <div class="f-18 fw-600">
                Задачи
              </div>
              <div class="col-auto">
                <div class="button blueButton px-30" @click="showModa">
                  + Поставить задачу
                </div>
              </div>
            </div>
            <DataTable :value="arrTasks" :lazy="true"  @row-click="showTasks" selectionMode="single" dataKey="id" responsiveLayout="scroll" >
              <template #empty>
                Поставьте нам задачу
              </template>
              <Column header="Название">
                <template #body="slotProps">
                  <div class="name-desc">
                    <div>{{slotProps.data.nameTask}}</div> <div><span>{{slotProps.data.valueEditor}}</span></div>
                  </div>
                </template>
              </Column>
              <Column style="width: 110px;" >
                <template #header>
                  <div style="width: 110px; text-align: left;">Статус</div>
                </template>
                <template #body="slotProps">
                  <div class="tabletInfo" :class="slotProps.data.status_class">
                    {{slotProps.data.status_text}}
                  </div>
                </template>
              </Column>
              <Column field="date_insert" header="Постановка" style="width: 90px;"></Column>
              <Column field="date" header="Выполнение" style="width: 90px;"></Column>
            </DataTable>

            <div class="pr-3 pl-3 pt-2 pb-2 px-3">
              <div class="row align-items-center" :class="countTasksFlex">
                <div class="col-auto" v-if="countTasks>=10">
                  <div class="colMessBlock f-14 color-blue">
                    Все задачи <span>({{ countTasks }})</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog :header="titleAddTask" v-model:visible="open" position="center" :modal="true" class="warp_task_add"  @hide="clearProp" :breakpoints="{'960px': '75vw', '640px': '100vw'}" style="max-width: 1163px; width:100%"  :class="{'success': success}" >

        <form class="formTask" action="">
          <div class="row">
            <div class="col-lg-8">
              <div class="form-group mb-3">
                <input autofocus ref="contentInput" v-model="nameTask" type="text" class="w-100 formInput task" :class="{ 'form-input-error': errorClassName }" placeholder="Название задачи">
              </div>
            </div>
            <div class="col-lg-4 d-flex align-items-center">
              <div class="form-group mb-3">
                <label class="d-flex align-items-center checkBlockWrap" >
                  <input v-model="urgent_task" type="checkbox" name="rules" class="d-none" :value="true"  />
                  <div class="checkBloc me-2">
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5.4L5.4 9.8L12 1" stroke="#0D85FB" stroke-width="2"/>
                    </svg>
                  </div>
                  <span >Срочная задача</span>
                </label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group mb-3">
                <Textarea :class="{ 'form-input-error': errorClassText }"  v-model="valueEditor" style="height: 190px; width: 100%;" placeholder="Добавьте более подробное описание задачи"></Textarea>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="row">
                <div class="col-lg-7">
                  <div class="form-group mb-3">
                    <Calendar v-model="date"  dateFormat="dd.mm.yy" :showTime="false" :manualInput="true" :disabledDays="[5,6]"  placeholder="Укажите дату выполнения "/>
                  </div>
                </div>

              </div>
            </div>
            <div class="col-lg-6">
              <div class="d-flex justify-content-end  align-items-center">
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
          <div class="row warp_tast_upload">
            <FileUpload ref="btn_upload" :customUpload="true" @select="customPreSelected"  mode="advanced"   :showUploadButton="false" :showCancelButton="false"  name="demo[]" :multiple="true" :maxFileSize="300000000">
            </FileUpload>
          </div>
        </form>

        <div class="d-flex justify-content-start warp_btn_form" style="margin-top: 20px;">
          <button @click="submitForm" type="button" class="button blueButton w-200">
             <span
                 v-show="loadingAdd"
                 class="spinner-border spinner-border-sm"
             ></span>
            {{btnTextAddTask}}
          </button>
          <div class="error-task" v-if="requestInputText">Обязательные поля не заполнены</div>
          <div class="succes-task" v-if="addSuccess">{{saccessAlertAddTask}}</div>
        </div>
        <div class="result-add-task">Задача поставлена</div>
      </Dialog>

      <Dialog :header="modalTaks.nameTask" v-model:visible="openTask" position="center" :modal="true" class="warp_task_add"  :breakpoints="{'960px': '75vw', '640px': '100vw'}" style="max-width: 1163px; width:100%"   >
        <form class="formTask" action="">
          <div class="row">
            <div class="col-lg-8">
              <div class="form-group mb-3">
                <input autofocus ref="contentInput" v-model="modalTaks.nameTask" type="text" class="w-100 formInput task" :class="{ 'form-input-error': errorClassName }" placeholder="Название задачи">
              </div>
            </div>
            <div class="col-lg-4 d-flex align-items-center">
              <div class="form-group mb-3">
                <label class="d-flex align-items-center checkBlockWrap" >
                  <input v-model="modalTaks.urgentTask" type="checkbox" name="rules" class="d-none" :value="true"  />

                  <div class="checkBloc me-2">
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5.4L5.4 9.8L12 1" stroke="#0D85FB" stroke-width="2"/>
                    </svg>
                  </div>
                  <span >Срочная задача</span>
                </label>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group mb-3">
                <Textarea :class="{ 'form-input-error': errorClassText }"  v-model="modalTaks.valueEditor" style="height: 190px; width: 100%;" placeholder="Добавьте более подробное описание задачи"></Textarea>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="row">
                <div class="col-lg-7">
                  <div class="form-group mb-3">
                    <Calendar v-model="modalTaks.date"  dateFormat="dd.mm.yy" :showTime="false" :manualInput="true" :disabledDays="[5,6]"  placeholder="Укажите дату выполнения "/>
                  </div>
                </div>

              </div>
            </div>
            <div class="col-lg-6">
              <div class="d-flex justify-content-end  align-items-center">
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
          <div class="row warp_tast_upload">
            <FileUpload ref="btn_upload" :customUpload="true" @select="customPreSelected"  mode="advanced"   :showUploadButton="false" :showCancelButton="false"  name="demo[]" :multiple="true" :maxFileSize="300000000">
            </FileUpload>
          </div>
        </form>

        <div class="d-flex justify-content-start" style="margin-top: 20px;">
          <button @click="submitFormUpdate" type="button" class="button blueButton w-200">
             <span
                 v-show="loadingAdd"
                 class="spinner-border spinner-border-sm"
             ></span>
            Сохранить изменения
          </button>
          <div class="error-task" v-if="requestInputText">Обязательные поля не заполнены</div>
          <div class="succes-task" v-if="addSuccess">{{saccessAlertAddTask}}</div>
        </div>
      </Dialog>

      <Toast />
    </div>
  </transition>
</template>

<script>

import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import  'primevue/resources/themes/saga-blue/theme.css';
import  'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Toast from 'primevue/toast';
import axios from "axios";
import authHeader from "@/services/auth-header";
import Dialog from 'primevue/dialog';
import Column from "primevue/column";

export default {
  name: "Tasks user",
  props: {
    isShowHead:{
      type: Boolean,
      default: true,
    },
  },
  components: {
    Textarea,
    Calendar,
    FileUpload,
    Toast,
    Dialog,
    DataTable,
    Column
  },
  data() {
    return{
      success:false,
      loadingAdd:false,
      loading:true,
      countTasksFlex: 'justify-content-between',
      countTasks:0,
      arrTasks:[],
      modalTaks:[],
      //add tasks
      errorClassName:false,
      errorClassText:false,
      requestInputText:false,
      addSuccess:false,
      nameTask:null,
      urgent_task:false,
      valueEditor:null,
      date:null,
      files:null,
      id_task:null,
      //add tasks END
      showTaskID:null,
      titleAddTask:'Новая задача',
      btnTextAddTask:'Поставить задачу',
      saccessAlertAddTask:'Задача поставлена',

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
    showModa(){
      this.open = true;
      this.$nextTick(() => {

        this.$refs.contentInput.focus();
      })
    },
    listTasks(){
      axios.post( this.hostapi+'tasks/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        for (const k in resp.data) {
          resp.data[k].date_insert= this.dateToYMD(new Date(resp.data[k].date_insert));
          resp.data[k].date= this.dateToYMD(new Date(resp.data[k].date));

          switch (resp.data[k].status){
            case 1:
              resp.data[k].status_class='staged';
              resp.data[k].status_text='Поставлена';
              break;
            case 2:
              resp.data[k].status_class='work';
              resp.data[k].status_text='В работе';
              break;
            case 3:
              resp.data[k].status_class='agreed';
              resp.data[k].status_text='Согласование';
              break;
            case 4:
              resp.data[k].status_class='edits';
              resp.data[k].status_text='Правки';
              break;
            case 5:
              resp.data[k].status_class='completed';
              resp.data[k].status_text='Готово';
              break;
            case 6:
              resp.data[k].status_class='сancel';
              resp.data[k].status_text='Отмена';
              break;

          }
          //status
        }
        this.countTasks = resp.data.length;
        if(resp.data.length <= 10){

          this.countTasksFlex ='justify-content-end';
        }
        if(resp.data.length > 0 ){
          this.arrTasks = resp.data;
        }


      }).catch(function(error){
        console.log(error);
      }).finally(() => (this.loading = false));
    },
    showTasks(event){

      console.log(event.data.id);
      axios.post( this.hostapi+'tasks/id',
          {id:event.data.id},
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        let resDate = new Date(resp.data[0].date).toLocaleString();

        resp.data[0].date=resDate.substring(0,10);

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
      this.loadingAdd=true;
      this.errorClassName=false;
      this.requestInputText=false;
      this.errorClassText=false;
      let error=0;
      //this.$emit('uploader');
      let formData = new FormData();


      if(this.id_task !==null){
        formData.append('id_task', this.id_task);
        this.saccessAlertAddTask = 'Задача изменена';
      }

      //Название задачи

      if(this.nameTask === null || this.nameTask === ''){
        this.errorClassName = true;
        this.requestInputText = true;
        error++;
      } else {
        formData.append('nameTask', this.nameTask);
      }

      //срочная задача
      formData.append('urgentTask', this.urgent_task);


      //описание задачи
      if(this.valueEditor === null) {
        this.errorClassText = true;
        this.requestInputText = true;
        error++;
      }else {
        formData.append('valueEditor', this.valueEditor);
      }

      //дата
      if(this.date !==null){
        formData.append('date', this.date);
      }

      //Файлы
      if(this.files !=null){
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('files', file);
        }
      }

      if(error === 0){
        axios.post( this.hostapi+'tasks/add',
            formData,
            {
              headers: authHeader(), 'Content-Type': 'multipart/form-data'
            }
        ).then((resp) => {
          if(resp.data.status === 'saccess'){
            this.success=true;
            this.titleAddTask='';
            this.id_task = resp.data.id;
            this.listTasks();
            //this.open=false;
            this.addSuccess=true;
            setTimeout(()=>{
              this.addSuccess=false;
            },3000);
            //this.titleAddTask = this.nameTask;
            this.btnTextAddTask = "Сохранить изменения";
            this.loadingAdd=false;




          } else {
            this.loadingAdd=false;
          }
        }).catch(function(error){
          console.log(error);
          console.log(this.$toast);
          this.loadingAdd=false;
        });
      } else {
        this.loadingAdd=false;
      }
    },
    submitFormUpdate(){
      this.loadingAdd=true;
      this.errorClassName=false;
      this.requestInputText=false;
      this.errorClassText=false;
      let error=0;
      //this.$emit('uploader');
      let formData = new FormData();

      console.log(this.modalTaks);
      formData.append('id_task', this.modalTaks.id);
      this.saccessAlertAddTask = 'Задача изменена';


      //Название задачи
      /*
      * date: "23.08.2022"
      date_insert: "2022-08-18T12:40:42.000Z"
      date_update: "2022-08-18T12:40:43.000Z"
      files: []
      id: 43
      nameTask: "Тестовая задача"
      status: 1
      urgentTask: true
      user: 152
      valueEditor: "Задача"
      * */
      if(this.modalTaks.nameTask === null || this.modalTaks.nameTask === ''){
        this.errorClassName = true;
        this.requestInputText = true;
        error++;
      } else {
        formData.append('nameTask', this.modalTaks.nameTask);
      }

      //срочная задача
      formData.append('urgentTask', this.modalTaks.urgentTask);


      //описание задачи
      if(this.modalTaks.valueEditor === null || this.modalTaks.valueEditor === '') {
        this.errorClassText = true;
        this.requestInputText = true;
        error++;
      }else {
        formData.append('valueEditor', this.modalTaks.valueEditor);
      }

      //дата
      if(this.modalTaks.date !==null){
        formData.append('date', this.modalTaks.date);
      }

      //Файлы
      if(this.files !=null){
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('files', file);
        }
      }

      if(error === 0){
        axios.post( this.hostapi+'tasks/add',
            formData,
            {
              headers: authHeader(), 'Content-Type': 'multipart/form-data'
            }
        ).then((resp) => {
          if(resp.data.status === 'saccess'){
            this.id_task = resp.data.id;
            this.listTasks();
            //this.open=false;
            this.addSuccess=true;
            setTimeout(()=>{
              this.addSuccess=false;
            },3000);
            this.titleAddTask = this.nameTask;
            this.btnTextAddTask = "Сохранить изменения";
            this.loadingAdd=false;




          } else {
            this.loadingAdd=false;
          }
        }).catch(function(error){
          console.log(error);
          console.log(this.$toast);
          this.loadingAdd=false;
        });
      } else {
        this.loadingAdd=false;
      }
    },
    clearProp(){
      this.nameTask=null;
      this.urgent_task=false;
      this.valueEditor=null;
      this.date=null;
      this.files=null;
      this.success=false;
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
    changeStatus(task_id, status_id){
      console.log(task_id);
      console.log(status_id);
      axios.put(this.hostapi+'tasks/'+task_id,
          { status: status_id },
          {headers: authHeader()}
      ).then((resp)=>{
        if(resp.data === 'saccess'){

          this.listTasks();
        }

      }).catch(function(error){
        console.log(error);
      });
    },
    /*
    onContextMenu(e, task_id) {
      e.preventDefault();
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
    },*/
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

<style>
.name-desc{
  display: flex;
}
.name-desc div span{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left:18px;
  max-width: 600px;
  width: 100%;
  display: block;
}

.result-add-task{
  display: none;
}

.warp_task_add.success{
  max-width: 730px !important;

}

.warp_task_add.success .p-dialog-title{
  justify-content: center;
  padding-left: 32px;
}
.warp_task_add.success .p-dialog-content .formTask,
.warp_task_add.success .p-dialog-content .warp_btn_form{
  display: none !important;
}

.warp_task_add.success .result-add-task{
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #171717;
  background-color: #EAF7ED;
  display: block;
  margin: 0 -15px -16px;
  padding: 15px 0;
}

.warp_task_add.success .p-dialog-content{
  padding-top: 0 !important;
}
.warp_task_add.success .p-dialog .p-dialog-header{
  justify-content: flex-end;
}
</style>
