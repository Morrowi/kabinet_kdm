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
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {

      email: user.email,
      password: user.password,
      mailing_list: user.mailing_list,
      rules: user.rules
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
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
      }
      return response;
    });
  }
  step2(user) {
    return axios.post(API_URL + 'step2', {
      user_id:user.user_id,
      rate: user.rate,
      manager: user.manager,
        },{
          headers: authHeader()
        }
    )
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response;
    });
  }

}

export default new AuthService();
