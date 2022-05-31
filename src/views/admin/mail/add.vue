<template>
  <div id="example">
    <div class="container-editor">
      <div id="bar">
        <Button label="Сохранить" class="p-button-success" @click="saveDesign"/>
      </div>

      <EmailEditor
          :editorId="editorId"
          :locale="locale"
          v-model:editor="editor"
          v-on:load="editorLoaded"
          v-on:ready="editorReady"
      />
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import { shallowRef } from 'vue';
import EmailEditor from '@morrowi01/editor-email-tpl';
//import sample from './data/sample.json';

export default {
  name: 'add mail tpl ',
  components: {
    EmailEditor,
    Button
  },
  data(){
    let editor = shallowRef(null);
    return{
      editor,
      editorId:'edit-tpl',
      locale: 'ru',
    }
  },
  methods: {
    // called when the editor is created
    editorLoaded() {
      console.log('editorLoaded');
      //this.editor.loadDesign(sample);
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
    }
  }
}

</script>

<style>
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
