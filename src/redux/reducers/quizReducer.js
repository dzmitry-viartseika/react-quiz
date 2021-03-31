import {FETCH_QUIZES, HIDE_LOADER, SHOW_LOADER} from "../../constants/mutationsTypes/mutations-types";

const initialState = {
    isLoader: false,
    quizList: []
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
        default:
            return state
    }
}

export default quizReducer
