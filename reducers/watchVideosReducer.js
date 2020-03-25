import { watchVidesActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case watchVidesActions.FETCH_WATCH_VIDEOS_REQUEST:
            state = defaultState
            return state
            break
        case watchVidesActions.FETCH_WATCH_VIDEOS_SUCCESS:
            state = action.payload
            return state
            break
        case watchVidesActions.FETCH_WATCH_VIDEOS_FAILURE:
            const { message } = action.error
            Alert.alert('Erorr', message)
            return defaultState
            break
        default:
            return state
    }
}
export default reducer