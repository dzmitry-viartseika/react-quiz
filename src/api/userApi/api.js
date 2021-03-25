import { CURRENT_SERVER_AUTH } from '../domain';
const axios = require('axios');

export default {
  login(user) {
    const instCred = axios.create({
      baseURL: CURRENT_SERVER_AUTH,
    });
    return instCred.post('auth/login', user);
  }
};
