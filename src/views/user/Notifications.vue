<template>
  <div class="contentBlock mb-5">
    <div class="row mr-0 ml-0 justify-content-between mb-3 flex-column">
      <div class="f-24 fw-600">
        Уведомления
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <div class="b-radius bg-white">
          <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
            <div class="f-18 fw-600">
              У вас <span class="color-orange">2</span> непрочитанных уведомления
            </div>
          </div>
          <div class="myTable border-bottom pb-3">
            <div class="topBlock">
              <div class="titleBlock">Описание</div>
              <div class="infoBlock">Дата создания</div>
            </div>
            <div class="contentBlock">
              <div class="itemBlock bessBlockItem active" data-toggle="modal" data-target="#openAlert">
                <div class="titleBlock cropBlock"><span>Добро пожаловать в Клинику Доброго Маркетолога. У вас есть неоплаченный счет. Вы всегда можете задать вопрос службе поддержки или</span></div>
                <div class="infoBlock">21.12.2022</div>
              </div>
              <div class="itemBlock bessBlockItem active">
                <div class="titleBlock cropBlock"><span>У вас есть 3 задачи на утверждение</span></div>
                <div class="infoBlock">21.12.2022</div>
              </div>
              <div class="itemBlock bessBlockItem">
                <div class="titleBlock cropBlock"><span>У вас есть 2 задачи на утверждение</span></div>
                <div class="infoBlock">21.12.2022</div>
              </div>
              <div class="itemBlock bessBlockItem">
                <div class="titleBlock cropBlock"><span>Маркетолог Наталья Маркова ждет вашего ответа</span></div>
                <div class="infoBlock">21.12.2022</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
//import { Form, Field, ErrorMessage } from "vee-validate";
//import AddRates from "@/components/AddRates"
//const AddRates = () => import("./components/AddRates.vue")
//import * as yup from "yup";

export default {
  name: "Index admin",
  components: {
//    AddRates,

  },
  data() {

  },
  watch:{

  },
  methods: {

  },
};
</script>
