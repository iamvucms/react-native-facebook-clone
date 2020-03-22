import { groupDetailActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case groupDetailActions.FETCH_GROUP_DETAIL_REQUEST:
            state = defaultState
            return state
            break
        case groupDetailActions.FETCH_GROUP_DETAIL_SUCCESS:
            state = action.payload
            return state
            break
        case groupDetailActions.FETCH_GROUP_DETAIL_FAILURE:
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