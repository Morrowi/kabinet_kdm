import axios from 'axios';
import authHeader from "@/services/auth-header";

const API_URL = 'http://panel.kdm1.biz/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          let date = new Date().getTime()/1000;
          localStorage.setItem('auth', date);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      email: user.email,
      rules: user.rules
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('step', 'step1');
        let date = new Date().getTime()/1000;
        localStorage.setItem('auth', date);
      }
      return response;
    });
  }

  step1(user) {
    return axios.post(API_URL + 'step1', {
      id:user.id,
      username: user.username,
    },{
          headers: authHeader()
        }
    )
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('step', 'step2');
      }
      return response;
    });
  }
  step2(user) {
    return axios.post(API_URL + 'step2', {
      manager: user.manager,
        },{
          headers: authHeader()
        }
    )
    .then(response => {

      if (response.data) {
        console.log('response.data',response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('step', 'step3');
        return response;
      }
      return null;
    });
  }
  step3(user) {
    return axios.post(API_URL + 'step3', {
          rate: user.rate,
        },{
          headers: authHeader()
        }
    )
        .then(response => {

          if (response.data) {
            console.log('response.data',response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.removeItem('step');
            return response;
          }
          return null;
        });
  }
  reuser() {
    return axios.post(API_URL + 'reuser', {},{
          headers: authHeader()
        }
    )
        .then(response => {
          let user = JSON.parse(localStorage.getItem('user'));
          response.data.accessToken = user.accessToken
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response;
        });
  }

}

export default new AuthService();
