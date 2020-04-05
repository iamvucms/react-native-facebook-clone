import { watchSearchRecommendActions } from '../constants'
import axios from 'axios'
export const FetchWatchSearchRecommendsRequest = () => {
    const taskURI = `/watch_search_recommends?_expand=page`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            let pages = v.data
            dispatch(FetchWatchSearchRecommendsSuccess(pages))
        }).catch(error => {
            dispatch(FetchWatchSearchRecommendsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: watchSearchRecommendActions.FETCH_WATCH_SEARCH_RECOMMENDS_REQUEST,
    }
}
export const FetchWatchSearchRecommendsFailure = (error) => {
    return {
        type: watchSearchRecommendActions.FETCH_WATCH_SEARCH_RECOMMENDS_FAILURE,
        error
    }
}
export const FetchWatchSearchRecommendsSuccess = (pages) => {
    return {
        type: watchSearchRecommendActions.FETCH_WATCH_SEARCH_RECOMMENDS_SUCCESS,
        payload: pages
    }
}
