import {ADD_NEW_POST, FETCH_POSTS, HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER} from "../constants/mutationsTypes";
import postsApi from '../api/postsApi/api';

export function addNewPost(newPost) {
    return {
        type: ADD_NEW_POST,
        payload: newPost
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function showAlert(text) {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: text
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 3000)
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function fetchPosts() {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const { data } = await postsApi.getPostsList();
            setTimeout(async () => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: data
                })
                dispatch(hideLoader())
            }, 3000)
        } catch (e) {
            dispatch(hideLoader())
            dispatch(showAlert('Что-то пошло не так'))
            console.error(e);
        }
    }
}
