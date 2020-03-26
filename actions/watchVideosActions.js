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
export const FetchSeenWatchVideosRequest = () => {
    const taskURI = `/watch_videos?_expand=watch_group&_expand=page&isSeen=true`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            let videos = v.data
            dispatch(FetchSeenWatchVideosSuccess(videos))
        }).catch(error => {
            dispatch(FetchSeenWatchVideosFailure(error))
        })
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
const FetchDefaultState = () => {
    return {
        type: watchVidesActions.FETCH_SEEN_WATCH_VIDEOS_REQUEST,
    }
}
export const FetchSeenWatchVideosFailure = (error) => {
    return {
        type: watchVidesActions.FETCH_SEEN_WATCH_VIDEOS_FAILURE,
        error
    }
}
export const FetchSeenWatchVideosSuccess = (videos) => {
    return {
        type: watchVidesActions.FETCH_SEEN_WATCH_VIDEOS_SUCCESS,
        payload: videos
    }
}
