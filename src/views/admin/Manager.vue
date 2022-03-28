<template>
  <div class="container-fluid vh-100">
<!--    <AddRates/>-->
12312312
  </div>

</template>

<script>
import UserService from "../../services/user.service";

export default {
  name: "Home",
  components: {
//    AddRates,

  },
  data() {

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
    // console.log(this.currentUser);
    UserService.getListManager(this.currentUser.id).then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
