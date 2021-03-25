import CURRENT_SERVER from '../domain';
const axios = require('axios');

export default {
  createQuiz(quiz) {
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.post('quizes.json', quiz);
  },
  getQuizList() {
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.get('quizes.json');
  },
  getQuizById(id) {
    console.log('id', id)
    const instCred = axios.create({
      baseURL: CURRENT_SERVER,
    });
    return instCred.get(`quizes/${id}.json`);
  }
};
