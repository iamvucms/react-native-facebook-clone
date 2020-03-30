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
        type: watchVidesActions.FETCH_SEEN_WATCH_VIDEOS_REQUEST,
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
//SEENVIDEOS ACTIONS
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
//WATCHVIDEODETAIL ACTIONS
export const FetchWatchVideoDetailRequest = (id) => {
    const taskURI = `/watch_videos/${id}?_expand=page`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            let video = v.data
            dispatch(FetchWatchVideoDetailSuccess(video))
        }).catch(error => {
            dispatch(FetchWatchVideoDetailFailure(error))
        })
    }
}
export const FetchWatchVideoDetailFailure = (error) => {
    return {
        type: watchVidesActions.FETCH_WATCH_VIDEO_DETAIL_FAILURE,
        error
    }
}
export const FetchWatchVideoDetailSuccess = (video) => {
    return {
        type: watchVidesActions.FETCH_WATCH_VIDEO_DETAIL_SUCCESS,
        payload: video
    }
}
//FETCH VIDEOS FROM THREAD
export const FetchVideosFromThreadRequest = (threadId, videoId) => {
    const taskURI = `/watch_videos?watch_threadId=${threadId}&_expand=page`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            let videos = v.data
            const ids = videos.map(video => video.id)
            const index = ids.indexOf(videoId)
            const firstVideo = videos.splice(index, 1)[0]
            videos.push(firstVideo)
            videos.reverse()
            dispatch(FetchVideosFromThreadSuccess(videos))
        }).catch(error => {
            dispatch(FetchVideosFromThreadFailure(error))
        })
    }
}
export const FetchVideosFromThreadFailure = (error) => {
    return {
        type: watchVidesActions.FETCH_VIDEOS_FROM_THREAD_FAILURE,
        error
    }
}
export const FetchVideosFromThreadSuccess = (videos) => {
    return {
        type: watchVidesActions.FETCH_VIDEOS_FROM_THREAD_SUCCESS,
        payload: videos
    }
}
//
export const SetCurrentWatchingPosition = (position, videoId) => {
    const payload = {
        position,
        videoId
    }
    return {
        type: watchVidesActions.SET_CURRENT_WATCHING_POSITION,
        payload
    }
}
//
export const SetThreadWatchingStatus = (playingId, isPlaying) => {
    const payload = {
        playingId,
        isPlaying
    }
    return {
        type: watchVidesActions.SET_THREAD_WATCHING_STATUS,
        payload
    }
}
export const PauseThreadWatchingStatus = () => {

    return {
        type: watchVidesActions.PAUSE_THREAD_WATCHING_STATUS,
    }
}
export const PushThreadHeightMap = (videoId, height) => {
    const payload = {
        videoId,
        height
    }
    return {
        type: watchVidesActions.PUSH_THREAD_HEIGHT_MAP,
        payload
    }
}