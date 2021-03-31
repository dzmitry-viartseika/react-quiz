import { combineReducers } from 'redux';
import { loaderReducer } from './reducers/loaderReducer';
import quizReducer  from './reducers/quizReducer';

export const rootReducer = combineReducers({
    loaders: loaderReducer,
    quiz: quizReducer,
})
