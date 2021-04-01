import { FETCH_QUIZES, HIDE_LOADER, SHOW_LOADER, FETCH_QUIZ } from "../../constants/mutationsTypes/mutations-types";

const initialState = {
    isLoader: false,
    quizList: [],
    activeQuiz: 0,
    results: {},
    isFinished: true,
    answerState: null,
    quizItem: null
};


function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES:
            return {
                ...state,
                quizList: action.payload
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
        case FETCH_QUIZ:
            return {
                ...state,
                quizItem: action.payload
            }
        default:
            return state
    }
}

export default quizReducer
