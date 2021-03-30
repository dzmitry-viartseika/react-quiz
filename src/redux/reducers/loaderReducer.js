import { SHOW_LOADER, HIDE_LOADER } from '../../constants/mutationsTypes/mutations-types';

const initialState = {
    isLoader: false,
    alert: null,
};

export const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                isLoader: true
            }
        case HIDE_LOADER: {
            return {
                ...state,
                isLoader: false
            }
        }
    }
    return state;
}
