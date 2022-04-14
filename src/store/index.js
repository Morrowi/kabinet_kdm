import { createStore } from "vuex";
import axios from 'axios'
import { auth } from "./auth.module";

const store = createStore({
  state: {
    rates: [],
    marketologs: [],
  },
  mutations: {
    getRates(state, rates){
      state.rates = rates
    },
    getMarketolog(state, rates){
      state.marketologs = rates
    },
  },
  actions: {
    getRatesAction({commit}){

      axios('http://panel.kdm1.biz/api/rates/list').then(res => {
        commit('getRates', res.data)
      }).catch(error => {
        console.log(error);
        this.errored = true;
      }).finally(() => (this.loading = false));

    },

    getMarketologAction({commit}){

      axios('http://panel.kdm1.biz/api/marketolog/').then(res => {
        commit('getMarketolog', res.data)
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
