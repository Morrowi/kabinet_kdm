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
        <th scope="col">Удалить</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in usersList" :key="user.id" :id="user.id">
        <th scope="row"> {{user.id}}</th>
        <th>{{user.username}}</th>
        <td>{{user.email}}</td>
        <td>{{user.date_update}}</td>
        <td>{{user.date_insert}}</td>
        <td>
          <select class="form-select" @change="changeRole(user, $event)">
            <option value="0" :selected="user.role_id === null" >Юзер</option>
            <option value="1" :selected="user.role_id === 1"  >Администратор</option>
            <option value="2" :selected="user.role_id === 2" >Маркетолог</option>
          </select>
        </td>
        <td><button @click="removeUser(user.id);" class="trash">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>

        </button></td>
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
    },
    removeUser(id){
      UserService.getDeleteMarketolog(id).then(
          () => {

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
