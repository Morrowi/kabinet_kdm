import { createStore } from "vuex";
import axios from 'axios'
import { auth } from "./auth.module";

const store = createStore({
  state: {
    rates: [],
    showChat:false,
  },
  mutations: {
    getRates(state, rates){
      state.rates = rates
    },
    showChat (state, showChat) {
      state.showChat=showChat
    },
  },
  actions: {
    showChat({commit}, showChat) {
      commit('showChat', showChat)
    },
    getRatesAction({commit}){

      axios('http://panel.kdm1.biz/api/rates/list').then(res => {
        commit('getRates', res.data)
      }).catch(error => {
        console.log(error);
        this.errored = true;
      }).finally(() => (this.loading = false));

    }

  },
  modules: {
    auth,
  },
});

export default store;
