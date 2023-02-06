<template>
  <div class="contentBlock mb-5">
    <div class="row">
      <div class="col-lg-6">
        <div class="warp_chat_marketolog">
          <Marketer/>
        </div>
      </div>
      <div class="col-lg-6">
        <Report/>
      </div>
    </div>
    <div style="margin-top: 18px;">
    <Tasks :isShowHead="false"/>
    </div>
  </div>

</template>

<script>

import Marketer from "@/views/user/component/index/Marketer"
import Report from "@/views/user/component/index/Report"
import Tasks from "@/views/user/component/index/Tasks"

export default {
  name: "Index user",
  components: {
    Marketer,
    Tasks,
    Report
  },
  data() {
   // let user =  JSON.parse(localStorage.getItem('user'));
    return{

    }
  },
  watch:{

  },
  methods: {

  },
  mounted() {

  }
};


</script>
