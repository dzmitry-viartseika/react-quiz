import {
    HIDE_LOADER,
    SHOW_LOADER,
    FETCH_QUIZES,
    FETCH_QUIZ,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_RETRY,
    QUIZ_NEXT_QUESTION
} from "../../constants/mutationsTypes/mutations-types";
import quizApi from '../../api/quizApi/api';

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(showLoader())
        try {
            const { data } = await quizApi.getQuizById(quizId);
            dispatch(fetchedQuiz(data))
            dispatch(hideLoader())
        } catch (err) {
            dispatch(hideLoader())
            console.error(err);
        }
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        const question = state.quiz[state.activeQuiz];
        const results = state.results;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return
            }
        }

        if (question.rightAnswerId === answerId) {
            if (!results[answerId]) {
                results[answerId] = 'success';
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            const timeOut = window.setTimeout(() => {
                if (isQuizMethod()) {
                    dispatch(finishQuiz())
                } else {

                    dispatch(quizNextQuestion(state.activeQuiz + 1))
                }
                window.clearTimeout(timeOut)
            }, 1000)
        } else {
            results[answerId] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
    }
}

export default function fetchedQuiz(quiz) {
    return {
        type: FETCH_QUIZ,
        payload: quiz,
    }
}

function isQuizMethod(state) {
    return state.activeQuiz + 1 === state.quiz.length;
}

export function retryHandle() {
    return {
        type: QUIZ_RETRY
    }
}

export function fetchQuizes() {
    return async dispatch => {
        dispatch(showLoader())
        try {
            const { data } = await quizApi.getQuizList();
            const quizList = []
            Object.keys(data).forEach((item, index) => {
                quizList.push({
                    id: item,
                    name: `№${index + 1}`
                })
            })
            dispatch(writeFetchedQuizes(quizList))
            dispatch(hideLoader())
        } catch (err) {
            dispatch(hideLoader())
            console.error(err);
        }
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function writeFetchedQuizes(quizes) {
    return {
        type: FETCH_QUIZES,
        payload: quizes
    }
}

// export function fetchPosts() {
//     return async dispatch => {
//         try {
//             dispatch(showLoader())
//             const { data } = await postsApi.getPostsList();
//             setTimeout(async () => {
//                 dispatch({
//                     type: FETCH_POSTS,
//                     payload: data
//                 })
//                 dispatch(hideLoader())
//             }, 3000)
//         } catch (e) {
//             dispatch(hideLoader())
//             dispatch(showAlert('Что-то пошло не так'))
//             console.error(e);
//         }
//     }
// }
