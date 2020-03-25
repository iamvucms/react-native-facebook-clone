import { videoControlActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    playingId: undefined,
    isPlaying: false,
    fixedHeightWatchVideo: undefined
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case videoControlActions.RESET_WATCHING_STATUS:
            state = defaultState
            return state
            break
        case videoControlActions.SET_WATCHING_VIDEO:
            state = { ...state, ...action.payload }
            return state
            break
        case videoControlActions.SET_FIXED_HEIGH_WATCHING_VIDEO:
            if (state.fixedHeightWatchVideo === undefined) state = { ...state, ...action.payload }
            return state
            break
        // case videoControlActions.LOGIN_FAILURE:
        //     const { message } = action.error
        //     Alert.alert('Error', message)
        //     return state
        //     break
        default:
            return state
    }
}
export default reducer