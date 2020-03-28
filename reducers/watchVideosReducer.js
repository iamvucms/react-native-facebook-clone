import { watchVidesActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    watchVideos: [],
    seenWatchVideos: [],
    watchVideoDetail: {},
    currentWatchTimePosition: 0
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
            Alert.alert('Error', message)
            return state
            break
        case watchVidesActions.SET_CURRENT_WATCHING_POSITION:
            state = { ...state, currentWatchTimePosition: action.payload }
            return state
            break
        default:
            return state
    }
}
export default reducer