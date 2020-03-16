import { friendActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case friendActions.FETCH_RECOMMAND_FRIENDS_REQUEST:
            state = defaultState
            return state
            break
        case friendActions.FETCH_RECOMMAND_FRIENDS_SUCCESS:
            state = action.payload
            return state
            break
        case friendActions.FETCH_RECOMMAND_FRIENDS_FAILURE:
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