import {
    FETCH_QUIZES,
    HIDE_LOADER,
    SHOW_LOADER,
    FETCH_QUIZ,
    QUIZ_SET_STATE,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    FINISH_QUIZ
} from "../../constants/mutationsTypes/mutations-types";

const initialState = {
    isLoader: false,
    quizList: [],
    activeQuiz: 0,
    results: {},
    isFinished: false,
    answerState: null,
    quizItem: null
};


function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES:
            return {
                ...state,
                quizItem: action.payload
            }
        case SHOW_LOADER:
            return {
                ...state,
                isLoader: true
            }
        case HIDE_LOADER:
            return {
                ...state,
                isLoader: false
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case FETCH_QUIZ:
            return {
                ...state,
                quizItem: action.quiz
            }
        case  QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            }
        case  QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuiz: action.number
            }
        case QUIZ_RETRY:
            return  {
                ...state,
                activeQuiz: 0,
                answerState: null,
                isFinished: false,
                results: {}
            }
        default:
            return state
    }
}

export default quizReducer
