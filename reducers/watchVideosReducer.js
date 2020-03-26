import { watchVidesActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    watchVideos: [],
    seenWatchVideos: []
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
        default:
            return state
    }
}
export default reducer