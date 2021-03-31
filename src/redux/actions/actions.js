import { HIDE_LOADER, SHOW_LOADER, FETCH_QUIZES} from "../../constants/mutationsTypes/mutations-types";
import quizApi from '../../api/quizApi/api';

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function fetchQuizes() {
    return async dispatch => {
        dispatch(showLoader())
        try {
            console.log('111')
            const { data } = await quizApi.getQuizList();
            console.log('data', data)
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
