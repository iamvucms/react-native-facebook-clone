import { systemImagesActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case systemImagesActions.FETCH_SYSTEM_IMAGES_REQUEST:
            state = defaultState
            return state
            break
        case systemImagesActions.FETCH_SYSTEM_IMAGES_SUCCESS:
            state = action.payload
            return state
            break
        case systemImagesActions.FETCH_SYSTEM_IMAGES_FAILURE:
            const {message} = action.error
            Alert.alert('Erorr',message)
            return defaultState
            break
        default:
            return state
    }
}
export default reducer