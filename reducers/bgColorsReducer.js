import { bgColorsActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case bgColorsActions.FETCH_BGCOLORS_REQUEST:
            state = defaultState
            return state
            break
        case bgColorsActions.FETCH_BGCOLORS_SUCCESS:
            state = action.payload
            return state
            break
        case bgColorsActions.FETCH_BGCOLORS_FAILURE:
            const { message } = action.error
            Alert.alert("Error", message)
            state = defaultState
            return state
            break
        default:
            return state
    }
}
export default reducer