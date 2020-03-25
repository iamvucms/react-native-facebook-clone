import { watchVidesActions } from '../constants'
import axios from 'axios'
export const FetchWatchVideosRequest = () => {
    const taskURI = `/watch_videos?_expand=watch_group&_expand=page`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            let videos = v.data
            dispatch(FetchWatchVideosSuccess(videos))
        }).catch(error => {
            dispatch(FetchWatchVideosFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: watchVidesActions.FETCH_WATCH_VIDEOS_REQUEST,
    }
}
export const FetchWatchVideosFailure = (error) => {
    return {
        type: watchVidesActions.FETCH_WATCH_VIDEOS_FAILURE,
        error
    }
}
export const FetchWatchVideosSuccess = (videos) => {
    return {
        type: watchVidesActions.FETCH_WATCH_VIDEOS_SUCCESS,
        payload: videos
    }
}
