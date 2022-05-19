<template>

    <div class="contentBlock mb-5">
      <div class="row mr-0 ml-0 justify-content-between align-items-center mb-3">
        <div class="f-24 fw-600">
          Мой маркетолог
        </div>
      </div>
      <div class="row justify-content-between h-100">
        <div class="col-lg-6">
          <div class="d-flex flex-column justify-content-between h-100">
            <div class="b-radius bg-white">
              <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
                <div class="f-18 fw-600">
                  Мой маркетолог
                </div>
                <div class="blockHeaderButton">
                  <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.3">
                      <path d="M13.4874 0.512567C12.804 -0.170848 11.696 -0.170848 11.0126 0.512567C10.3291 1.19598 10.3291 2.30402 11.0126 2.98744C11.696 3.67085 12.804 3.67085 13.4874 2.98744C14.1709 2.30405 14.1709 1.19601 13.4874 0.512567Z" fill="#030229"/>
                      <path d="M8.23744 0.512567C7.55402 -0.170848 6.44598 -0.170848 5.76257 0.512567C5.07915 1.19598 5.07915 2.30402 5.76257 2.98744C6.44598 3.67085 7.55402 3.67085 8.23744 2.98744C8.92085 2.30405 8.92085 1.19601 8.23744 0.512567Z" fill="#030229"/>
                      <path d="M2.98744 0.512567C2.30402 -0.170848 1.19598 -0.170848 0.512564 0.512567C-0.170852 1.19598 -0.170852 2.30402 0.512564 2.98744C1.19598 3.67085 2.30402 3.67085 2.98744 2.98744C3.67085 2.30405 3.67085 1.19601 2.98744 0.512567Z" fill="#030229"/>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="border-bottom p-3">
                <div class="d-flex justify-content-between me-0 ml-0 align-items-start">
                  <div class="d-flex align-items-center">
                    <div class="avaBlock me-3 d-flex align-items-center flex-column">
                      <Avatar size="xlarge"  shape="circle" :image="'http://panel.kdm1.biz/uploads/'+marketolog.id+'/'+marketolog.avatar" />
                      <div class="f-18 fw-600 d-flex align-items-center lh-1">
                        <div class="me-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.15076 1.36588C7.54204 0.736562 8.45796 0.73656 8.84924 1.36587L10.8006 4.50441C10.9383 4.72583 11.157 4.88472 11.4101 4.94723L14.9981 5.83325C15.7175 6.01091 16.0005 6.882 15.5229 7.4486L13.141 10.2743C12.973 10.4737 12.8894 10.7308 12.9082 10.9908L13.1743 14.677C13.2276 15.4161 12.4866 15.9544 11.8002 15.6753L8.37669 14.2832C8.13517 14.185 7.86483 14.185 7.62331 14.2832L4.19982 15.6753C3.51337 15.9544 2.77238 15.4161 2.82573 14.677L3.0918 10.9908C3.11057 10.7308 3.02704 10.4737 2.859 10.2743L0.477088 7.4486C-0.000513792 6.882 0.282519 6.01091 1.00194 5.83325L4.58988 4.94723C4.843 4.88472 5.06171 4.72583 5.19937 4.50441L7.15076 1.36588Z" fill="#EE735A"/>
                          </svg>
                        </div>
                        <span class="pt-1">{{marketolog.rating}}</span>
                      </div>
                    </div>

                    <div class="d-flex flex-column">
                      <div class="f-16 mb-1">
                        {{marketolog.username}}
                      </div>
                      <div class="f-14 color-2 pr-5">
                        {{marketolog.description}}
                      </div>
                    </div>

                  </div>
                  <div class="tabletInfo online"> Онлайн </div>
                </div>
              </div>
              <div class="px-3 py-2">
                <div class="d-flex justify-content-center justify-content-lg-start">
                  <div class="button buttonBorder">
                    Оценить работу
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <div class="f-16 color-2 mb-3">
                На вашем тарифе вы можете заменить маркетолога
              </div>
              <div class="d-flex">
                <div class="button buttonBorder">
                  Заменить
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="b-radius bg-white">
            <div class="d-flex align-items-center flex-wrap justify-content-between border-bottom p-3">
              <div class="f-18 fw-600">
                Чат
              </div>
              <div class="blockHeaderButton">
                <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.3">
                    <path d="M13.4874 0.512567C12.804 -0.170848 11.696 -0.170848 11.0126 0.512567C10.3291 1.19598 10.3291 2.30402 11.0126 2.98744C11.696 3.67085 12.804 3.67085 13.4874 2.98744C14.1709 2.30405 14.1709 1.19601 13.4874 0.512567Z" fill="#030229"/>
                    <path d="M8.23744 0.512567C7.55402 -0.170848 6.44598 -0.170848 5.76257 0.512567C5.07915 1.19598 5.07915 2.30402 5.76257 2.98744C6.44598 3.67085 7.55402 3.67085 8.23744 2.98744C8.92085 2.30405 8.92085 1.19601 8.23744 0.512567Z" fill="#030229"/>
                    <path d="M2.98744 0.512567C2.30402 -0.170848 1.19598 -0.170848 0.512564 0.512567C-0.170852 1.19598 -0.170852 2.30402 0.512564 2.98744C1.19598 3.67085 2.30402 3.67085 2.98744 2.98744C3.67085 2.30405 3.67085 1.19601 2.98744 0.512567Z" fill="#030229"/>
                  </g>
                </svg>
              </div>
            </div>
            <div class="p-3">
              <img class="w-100" src="image/chat.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>


</template>


<script>
import Avatar from 'primevue/avatar';
import axios from "axios";
import authHeader from "@/services/auth-header";
export default {
  name: "Marketer",
  components: {
    Avatar
  },
  data() {

    let loading = true;
    return{
      loading,
      marketolog:{},
    }
  },
  watch:{

  },
  methods: {

  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {

    if(this.$store.state.auth.user.manager.id !== undefined){

      axios.put( 'http://panel.kdm1.biz/api/marketolog/'+this.$store.state.auth.user.manager.id,
          '',
          {
            headers: authHeader()
          }
      ).then((resp)=>{
        //console.log(resp.data);
        this.marketolog = resp.data;
      }).catch(function(error){
        console.log(error);
      }).finally(() => (this.loading = false));
    }
    //console.log(this.$store.state.auth.user.manager);
  },
  created() {

    //console.log(this.currentUser.manager)
  },

};
</script>

