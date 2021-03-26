import { CURRENT_SERVER_AUTH } from '../domain';
const axios = require('axios');

export default {
  signUp(user) {
    const instCred = axios.create({
      baseURL: CURRENT_SERVER_AUTH,
    });
    return instCred.post(':signUp?key=AIzaSyCZfSUKtGOVxuO3ucz6GROGUQ4LMzVKiRo', user);
  },
  login(user) {
    const instCred = axios.create({
      baseURL: CURRENT_SERVER_AUTH,
    });
    return instCred.post(':signInWithPassword?key=AIzaSyCZfSUKtGOVxuO3ucz6GROGUQ4LMzVKiRo', user);
  }
};
