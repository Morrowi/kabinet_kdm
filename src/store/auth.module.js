import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const step = localStorage.getItem('step');
const initialState = user
  ? { status: { loggedIn: true }, user, step }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess', user);
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    step1({ commit }, user) {
      return AuthService.step1(user).then(
          response => {
            commit('step1Success', user);
            return Promise.resolve(response.data);
          },
          error => {
            commit('step1Failure');
            return Promise.reject(error);
          }
      );
    },
    step2({ commit }, user) {
      return AuthService.step2(user).then(
          response => {
            commit('step2Success', user);
            return Promise.resolve(response.data);
          },
          error => {
            commit('step2Failure');
            return Promise.reject(error);
          }
      );
    },
    step3({ commit }, user) {
      return AuthService.step3(user).then(
          response => {
            commit('step3Success', user);
            return Promise.resolve(response.data);
          },
          error => {
            commit('step3Failure');
            return Promise.reject(error);
          }
      );
    },
    reuser() {
      return AuthService.reuser(user).then(
          user => {
            return Promise.resolve(user);
          },
          error => {
            return Promise.reject(error);
          }
      );
    },

  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state,user) {
      state.status.loggedIn = true;
      state.step = 'step1';
      state.user = user;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    step1Success(state,user) {
      state.status.step1 = true;
      state.step = 'step2';
      state.user = user;
    },
    step1Failure(state,user) {
      state.status.step1 = false;
      state.user = user;
    },
    step2Success(state,user) {
      state.status.step2 = true;
      state.step = 'step3';
      state.user = user;
    },
    step2Failure(state,user) {
      state.status.step2 = false;
      state.user = user;
    },
    step3Success(state,user) {
      state.status.step3 = true;
      state.step = '';
      state.user = user;
    },
    step3Failure(state,user) {
      state.status.step3 = false;
      state.user = user;
    },
  }
};
