import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://panel.kdm1.biz/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getListUsers(id){
    return axios.post(API_URL + 'users/list',
        { id: id },
        {headers: authHeader()}
    );
  }
  getUpdateUsers(id, val){
    return axios.put(API_URL + 'users/'+id,
        { id: val },
        {headers: authHeader()}

    );
  }
  getAddUsers(id, val){
    return axios.put(API_URL + 'users/'+id,
        { id: val, what:'addRole' },
        {headers: authHeader()}

    );
  }
  getAddMarketolog(data){
    return axios.post(API_URL + 'marketolog/add',
        data,
        {headers: authHeader()}
    );
  }
  getDeleteMarketolog(val){
    return axios.delete(API_URL + 'marketolog/add/'+val,
        {headers: authHeader()}
    );
  }

}

export default new UserService();
