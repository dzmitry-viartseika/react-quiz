import Auth from '../components/Pages/Auth/Auth';
import Quiz from '../components/Pages/Quiz/Quiz';
import QuizCreator from '../components/Pages/QuizCreator/QuizCreator';
import QuizList from '../components/Pages/QuizList/QuizList';

const routes = {
    auth: {
        url: '/auth',
        component: Auth,
        exact: false,
    },
    quizId: {
        url: '/quiz/:id',
        component: Quiz,
        exact: false,
    },
    create: {
        url: '/quiz-create',
        component: QuizCreator,
        exact: false,
    },
    home: {
        url: '/',
        component: QuizList,
        exact: true,
    },
}

export default routes;
