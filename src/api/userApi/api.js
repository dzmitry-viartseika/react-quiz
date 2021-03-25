import CURRENT_SERVER from '../domain';
const axios = require('axios');

export default {
  login(user) {
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.post('auth/login', user);
  },
  registration(user) {
    console.log('user', user);
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.post('auth/', user);
  },
  getActiveUser() {
    const token = JSON.parse(localStorage.getItem('token'));
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return instCred.get('auth/me');
  },
};
