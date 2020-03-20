import { groupActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case groupActions.FETCH_GROUPS_REQUEST:
            state = defaultState
            return state
            break
        case groupActions.FETCH_GROUPS_SUCCESS:
            state = action.payload
            return state
            break
        case groupActions.FETCH_GROUPS_FAILURE:
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