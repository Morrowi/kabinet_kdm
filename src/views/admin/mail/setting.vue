<template>

  <div class="row">
    <div class="col-12 col-sm-6">
      <div class="b-radius bg-white mb-5">
        <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
          <div class="f-18 fw-600">Настройка почты</div>
        </div>
        <div class="myTable">
          <div class="contentBlock px-3 pt-4 pb-2">
            <div class="row">
              <div class="field col-12 col-md-6">
                <span class="p-float-label">
                   <InputText  id="email" v-model="email" type="email"/>
                   <label for="email">Почта с которой будут отправлятся письма</label>
                </span>
              </div>
              <div class="field col-12 col-md-6">

              </div>
              <div class="field col-12 col-md-6">
                <span class="p-float-label">
                   <InputText  id="input_host" v-model="host" type="text"/>
                   <label for="input_host">SMTP сервер</label>
                </span>
              </div>
              <div class="field col-12 col-md-6">
                <span class="p-float-label">
                  <Dropdown v-model="port" :options="ports" optionLabel="name" />
                   <label for="input_host">Порт</label>
                </span>
              </div>
              <div class="field col-12 col-6">
                <div class="field-checkbox">
                  <Checkbox id="SSL" name="SSL" value="SSL" v-model="secure" />
                  <label for="SSL">SSL</label>
                </div>
              </div>
              <div class="field col-12 col-md-6">
                <span class="p-float-label">
                   <InputText  id="input_user" v-model="user" type="text"/>
                   <label for="input_user">Имя пользоватля</label>
                </span>
              </div>
              <div class="field col-12 col-md-6">
                <span class="p-float-label">
                   <InputText  id="input_pass" v-model="pass" type="text"/>
                   <label for="input_pass">Пароль</label>
                </span>
              </div>
            </div>
            <div class="field col-12 d-flex justify-content-end">
              <div class="button buttonBorder">Сохранить</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>



</template>

<script>
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
export default {
  name: "Mail setting",
  components: {
    InputText,
    Checkbox,
    Dropdown,
  },
  data() {
    return{
      ports: [
        {name: '25', code: '25'},
        {name: '465', code: '465'},
        {name: '587', code: '587'}
      ],
      email:'',
      host:'',
      port:'',
      secure: false,
      user:'',
      pass:''
    }
  },
  watch:{

  },
  methods: {

  },
};
</script>
<style>
  .myTable input.p-inputtext{
    border: 1px solid #F0F2FA !important;
    width: 100%;
  }
  .p-float-label label,
  .field-checkbox label{
    font-size: 14px;
  }

  .myTable .p-dropdown {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
</style>