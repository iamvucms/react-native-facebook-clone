import { watchSearchRecommandActions } from '../constants'
import axios from 'axios'
export const FetchWatchSearchRecommandsRequest = () => {
    const taskURI = `/watch_search_recommands?_expand=page`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            let pages = v.data
            dispatch(FetchWatchSearchRecommandsSuccess(pages))
        }).catch(error => {
            dispatch(FetchWatchSearchRecommandsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: watchSearchRecommandActions.FETCH_WATCH_SEARCH_RECOMMANDS_REQUEST,
    }
}
export const FetchWatchSearchRecommandsFailure = (error) => {
    return {
        type: watchSearchRecommandActions.FETCH_WATCH_SEARCH_RECOMMANDS_FAILURE,
        error
    }
}
export const FetchWatchSearchRecommandsSuccess = (pages) => {
    return {
        type: watchSearchRecommandActions.FETCH_WATCH_SEARCH_RECOMMANDS_SUCCESS,
        payload: pages
    }
}
