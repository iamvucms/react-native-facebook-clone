import { userActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case userActions.LOGIN_REQUEST:
            state = defaultState
            return state
            break
        case userActions.LOGIN_SUCCESS:
            state = action.payload
            return state
            break
        case userActions.LOGIN_FAILURE:
            const {message} = action.error
            Alert.alert('Error',message)
            return state
            break
        default:
            return state
    }
}
export default reducer