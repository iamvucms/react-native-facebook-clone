import { watchVidesActions, postDetailActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    watchVideos: [],
    seenWatchVideos: [],
    watchVideoDetail: {},
    currentWatchTimePosition: [

    ],
    videosFromThread: [],
    threadWatchingController: {
        isPlaying: false,
        playingId: undefined
    },
    threadHeightMap: []
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case watchVidesActions.FETCH_WATCH_VIDEOS_REQUEST:
            state = { ...state, watchVideos: [] }
            return state
            break
        case watchVidesActions.FETCH_WATCH_VIDEOS_SUCCESS:
            state = { ...state, watchVideos: action.payload }
            return state
            break
        case watchVidesActions.FETCH_WATCH_VIDEOS_FAILURE:
            const { message } = action.error
            Alert.alert('Error', message)
            return state
            break
        case watchVidesActions.FETCH_SEEN_WATCH_VIDEOS_REQUEST:
            state = { ...state, seenWatchVideos: [] }
            return state
            break
        case watchVidesActions.FETCH_SEEN_WATCH_VIDEOS_SUCCESS:
            state = { ...state, seenWatchVideos: action.payload }
            return state
            break
        case watchVidesActions.FETCH_SEEN_WATCH_VIDEOS_FAILURE:
            const { message2 } = action.error
            Alert.alert('Error', message2)
            return state
            break
        case watchVidesActions.FETCH_WATCH_VIDEO_DETAIL_REQUEST:
            state = { ...state, watchVideoDetail: {} }
            return state
            break
        case watchVidesActions.FETCH_WATCH_VIDEO_DETAIL_SUCCESS:
            state = { ...state, watchVideoDetail: action.payload }
            return state
            break
        case watchVidesActions.FETCH_WATCH_VIDEO_DETAIL_FAILURE:
            const { message3 } = action.error
            Alert.alert('Error', message3)
            return state
            break
        case watchVidesActions.FETCH_VIDEOS_FROM_THREAD_REQUEST:
            state = { ...state, videosFromThread: [] }
            return state
            break
        case watchVidesActions.FETCH_VIDEOS_FROM_THREAD_SUCCESS:
            state = { ...state, videosFromThread: action.payload }
            return state
            break
        case watchVidesActions.FETCH_VIDEOS_FROM_THREAD_FAILURE:
            const { message4 } = action.error
            Alert.alert('Error', message4)
            return state
            break
        case watchVidesActions.SET_THREAD_WATCHING_STATUS:
            state = { ...state, threadWatchingController: action.payload }
            return state
            break
        case watchVidesActions.SET_CURRENT_WATCHING_POSITION:
            const { payload } = action
            const { currentWatchTimePosition } = state
            const ids = currentWatchTimePosition.map(position => position.videoId)
            const index = ids.indexOf(payload.videoId)
            if (index > -1) {
                currentWatchTimePosition[index].position = payload.position
            } else {
                currentWatchTimePosition.push(payload)
            }
            state = { ...state, currentWatchTimePosition: [...currentWatchTimePosition] }
            return state
            break
        case watchVidesActions.PAUSE_THREAD_WATCHING_STATUS:
            state = { ...state, threadWatchingController: { ...state.threadWatchingController, isPlaying: false } }
            return state
            break
        case watchVidesActions.PUSH_THREAD_HEIGHT_MAP:
            let { threadHeightMap } = state
            const ids2 = threadHeightMap.map(video => video.videoId)
            const index2 = ids2.indexOf(action.payload.videoId)
            if (index2 > -1) {
                threadHeightMap[index2].height = action.payload.height
            } else threadHeightMap.push({
                videoId: action.payload.videoId,
                height: action.payload.height
            })
            state = { ...state, threadHeightMap: [...threadHeightMap] }
            return state
            break
        default:
            return state
    }
}
export default reducer