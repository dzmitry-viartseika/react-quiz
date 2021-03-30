import { combineReducers } from 'redux';
import { loaderReducer } from './reducers/loaderReducer';

export const rootReducer = combineReducers({
    loaders: loaderReducer,
})
