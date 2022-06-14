<template>
  <div id="example">
    <div class="container-editor">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-4">
          <div class="py-3">
            <Dropdown v-model="selected_event_type" :options="event_type" @change="selectEvent"  optionLabel="name" placeholder="Выберите событие" />
          </div>
        </div>
        <div class="col-12 col-sm-8">
          <div class="py-3">
            <Textarea v-model="description" disabled :autoResize="true" cols="75" />

          </div>
        </div>

      </div>

      <EmailEditor
          :editorId="editorId"
          :locale="locale"
          v-model:editor="editor"
          v-on:load="editorLoaded"
          v-on:ready="editorReady"
      />
      <div id="bar">
        <Button label="Сохранить" class="p-button-success" @click="saveDesign"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import { shallowRef } from 'vue';
import EmailEditor from '@morrowi01/editor-email-tpl';
import sample from './data/data.json';
import axios from "axios";
import authHeader from "@/services/auth-header";

export default {
  name: 'add mail tpl ',
  components: {
    EmailEditor,
    Button,
    Dropdown,
    Textarea
  },
  data(){
    let editor = shallowRef(null);
    return{
      editor,
      editorId:'edit-tpl',
      locale: 'ru',
      selected_event_type:null,
      description:null,
      event_type:null,
    }
  },
  methods: {
    // called when the editor is created
    editorLoaded() {
      console.log('editorLoaded');
      this.editor.loadDesign(sample);
    },
    // called when the editor has finished loading
    editorReady() {
      console.log('editorReady');
    },
    saveDesign() {
      this.editor.saveDesign(
          (design) => {
            console.log('saveDesign', design);
          }
      )
    },
    exportHtml() {
      this.editor.exportHtml(
          (data) => {
            console.log('exportHtml', data);
          }
      )
    },
    initEventType(){
      axios.post( 'http://panel.kdm1.biz/api/mail/type/',
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        this.event_type = resp.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    selectEvent(){
      this.description = this.selected_event_type.description;
      //console.log(this.selected_event_type);
    }
  },
  mounted() {
    this.initEventType();
  }
}

</script>

<style>

.p-inputtextarea{
  font-size: 14px !important;
}


.unlayer-editor iframe{
  height: 100vh !important;
}

.unlayer-editor {
  flex: 1;
  display: flex;
}
#example {
  height: 100%;
}

#example .container-editor {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}

#bar {
  flex: 1;
  color: #FFF;
  display: flex;
  max-height: 40px;
}


</style>
