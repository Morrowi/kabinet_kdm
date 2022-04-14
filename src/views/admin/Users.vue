<template>
  <div class="container-fluid vh-100">
<!--    <AddRates/>-->

    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Имя</th>
        <th scope="col">email</th>
        <th scope="col">Дата обновление</th>
        <th scope="col">Дата регистрации</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in usersList" :key="user.id" :id="user.id">
        <th scope="row"> {{user.id}}</th>
        <th > {{user.username}}</th>
        <td>{{user.email}}</td>
        <td>{{user.date_update}}</td>
        <td>{{user.date_insert}}</td>
        <td>
          <select class="form-select" @change="changeRole(user, $event)">
            <option value="0" :selected="user.role_id === null" >Юзер</option>
            <option value="1" :selected="user.role_id === 1"  >Администратор</option>
            <option value="2" :selected="user.role_id === 2" >Модератор</option>
          </select>
        </td>
      </tr>
      </tbody>
    </table>
    <router-link to="/admin/users/add" active-class="active"> Добавить</router-link>

  </div>

</template>

<script>
import UserService from "../../services/user.service";

export default {
  name: "Users",
  components: {
//    AddRates,
  },
  data() {

    return {
      usersList:{}
    }
  },
  watch:{

  },
  methods: {
    changeRole(user, val){
      /*UserService.getUpdateUsers(user).then(
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
      console.log(user);
      console.log(val);
      if(user.role_id === null){
        UserService.getAddUsers(user.id, val.target.value).then(
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
        );
      } else {
        UserService.getUpdateUsers(user.id, val.target.value).then(
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
        );
      }
      //console.log(val.target.value);

    }

  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    // console.log(this.currentUser);
    UserService.getListUsers(this.currentUser.id).then(
      (response) => {
        this.usersList = response.data;
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
