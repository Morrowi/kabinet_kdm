<template>
  <div class="contentBlock mb-5">
    <div class="row mr-0 ml-0 justify-content-between mb-3 ">
      <div class="f-24 fw-600 col-auto">
        Просмотр заявки
      </div>
      <router-link  to="/dashboard/support" active-class="active">
        Вернуться к списку заявок
      </router-link>
    </div>
    <transition name="fade" >
    <div class="position-absolute" v-if="loading">Loading...</div>
    <div v-else class="b-radius bg-white mx-2 p-4">
      <div class="row">
        <div class="col-sm-4 col-xs-12"><span class="color_grey"> Тема </span></div>
        <div class="col-sm-2 col-xs-12"><span class="color_grey"> Номер </span></div>
        <div class="col-sm-2 col-xs-12"><span class="color_grey"> Статус </span></div>
      </div>
      <div class="row">
        <div class="col-sm-4 col-xs-12">{{ticket.them}}</div>
        <div class="col-sm-2 col-xs-12">{{ticket.id}}</div>
        <div class="col-sm-2 col-xs-12">
          <span :class="'product-badge status-' + ticket.status">
            <span v-if="ticket.status === 1">Открыт</span>
            <span v-if="ticket.status === 2">Ответ получен</span>
            <span v-if="ticket.status === 3">Закрыт</span>
          </span>
        </div>
      </div>
      <div class="row mt-5 mb-4" v-for="msg in ticket.message" :key="msg.id">
        <div class="col-sm-3">{{msg.date}}</div>
        <div class="col-sm-7">
          <div>
            <strong>{{msg.username}}</strong>
            <div class="text">{{msg.text}}</div>
            <div  v-if="msg.url">
              <div>Файлы:</div>
              <div v-for="(url, key) in msg.url" :key="key">
                <a target="_blank" :href="url">{{url}}</a>
              </div>
            </div>
          </div>

        </div>
      </div>
      <hr v-if="ticket.status !== 3">
      <div class="row mt-4" v-if="ticket.status !== 3">
        <div class="offset-sm-3 col-sm-7">
          <Textarea v-model="comment" :autoResize="true" rows="5" placeholder="Сообщение"></Textarea>
        </div>
      </div>
      <div class="row" v-if="ticket.status !== 3">customPreSelected
        <div class="offset-sm-3 col-sm-7 upload_component d-flex flex-column align-items-end">
          <FileUpload  :customUpload="true" @select="customPreSelected"  mode="advanced" :showCancelButton="false"  :showUploadButton="false"  :multiple="true" :maxFileSize="3145728">
          </FileUpload>
          <small>Суммарный размер файлов — до 3 Мб</small>
        </div>
      </div>
      <div class="row" v-if="ticket.status !== 3">
        <div class="offset-sm-3 col-sm-7 d-flex justify-content-between my-3">
          <button class="button buttonBorder" @click="closeTicket">Закрыть обращение</button>
          <button class="button blueButton" @click="sendComment">Отправить</button>
        </div>
      </div>
    </div>
    </transition>
  </div>

</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';


export default {
  name: "Support",
  components: {
    Textarea,
    FileUpload
  },
  data() {

    return {
      ticketList: null,
      loading:true,
      ticket:null,
      messages:[],
      comment:null,
      files:null
    }
  },
  watch:{

  },
  methods: {
    sendComment(){
      let formData = new FormData();

      formData.append('id', this.$route.params.id);

      if(this.comment !==null){
        formData.append('text', this.comment);
      }

      //Файлы
      if(this.files !=null){
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('files', file);
        }
      }

      axios.post( 'http://panel.kdm1.biz/api/support/comment',
          formData,
          {
            headers: authHeader(), 'Content-Type': 'multipart/form-data'
            //headers: { authHeader(), 'Content-Type': 'multipart/form-data'}
          }
      ).then((resp) => {
        if(resp.data === 'saccess'){

          this.comment=null;
          this.files=null;
          this.initTicket();

        } else {
          this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Попробуйте позже', life: 3000});
        }


      }).catch(function(error){
        console.log(error);

        this.$toast.add({severity:'error', summary: 'Ошибка', detail:'Не введено название задачи', life: 3000});
      }).finally(() => (this.loading = false));

    },
    closeTicket(){
      console.log(this.$route.params.id);
      let id =this.$route.params.id;
      axios.post( 'http://panel.kdm1.biz/api/support/close/',
          {id:id},
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        //resp.data[0].data_insert = this.dateToYMD(resp.data[0].data_insert);
        //console.log(resp.data);
        for ( const key in resp.data){
          for(let k2 in resp.data[key].message){
            resp.data[key].message[k2]={
              date:this.dateToYMD(new Date(resp.data[key].message[k2].date)),
              text:resp.data[key].message[k2].text,
              id:resp.data[key].message[k2].id,
              username:resp.data[key].message[k2].username,
              url:(resp.data[key].message[k2].url)?resp.data[key].message[k2].url.split(";"):null
            }
          }
        }
        //console.log(resp.data);
        setTimeout(() => {
          this.ticket = resp.data[0];
          this.loading = false
        });


      }).catch(function(error){
        console.log(error);
      });
    },
    customPreSelected(event) {
      this.files = event.files;
    },
    dateToYMD(date) {
      let d = date.getDate();
      let m = date.getMonth() + 1; //Month from 0 to 11
      let y = date.getFullYear();
      let h = date.getHours();
      h = ("0" + h).slice(-2);
      let mm = date.getMinutes();
      mm = ("0" + mm).slice(-2);
      let ss = date.getSeconds();
      ss = ("0" + ss).slice(-2);
      return  ''+(d <= 9 ? '0' + d : d) + '.' + (m<=9 ? '0' + m : m) + '.' + y +' '+ h+':'+mm+':'+ss;

    },
    async initTicket(){
      let id =this.$route.params.id;
      axios.post( 'http://panel.kdm1.biz/api/support/'+id,
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        //resp.data[0].data_insert = this.dateToYMD(resp.data[0].data_insert);
        //console.log(resp.data);
        for ( const key in resp.data){
          for(let k2 in resp.data[key].message){
            resp.data[key].message[k2]={
              date:this.dateToYMD(new Date(resp.data[key].message[k2].date)),
              text:resp.data[key].message[k2].text,
              id:resp.data[key].message[k2].id,
              username:resp.data[key].message[k2].username,
              url:(resp.data[key].message[k2].url)?resp.data[key].message[k2].url.split(";"):null
            }
          }
        }
        //console.log(resp.data);
        setTimeout(() => {
          this.ticket = resp.data[0];
          this.loading = false
        });


      }).catch(function(error){
        console.log(error);
      });

    },
    onRowSelect(e){
      console.log(e.data.id);
    }
  },
  mounted() {
    this.initTicket();
  }
};
</script>
<style>
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
  .product-badge.status-1 {
    background: #c8e6c9;
    color: #256029;
  }

.product-badge{
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;
}
.product-badge.status-2 {
  background: #feedaf;
  color: #8a5340;
}

.product-badge.status-3 {
  background: #ffcdd2;
  color: #c63737;
}

.color_grey{
  color: #62686C;
  font-size: 12px;
}

.product-badge{
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;
}

.product-badge.status-1 {
  background: #c8e6c9;
  color: #256029;
}

.product-badge.status-2 {
  background: #feedaf;
  color: #8a5340;
}

.product-badge.status-3 {
  background: #ffcdd2;
  color: #c63737;
}

.p-inputtextarea{
  border: 1px solid #F0F2FA !important;
  width: 100%;
}

.upload_component .p-fileupload .p-fileupload-buttonbar{
  background: none;
  border:none;
  padding-right: 0;
}

</style>
