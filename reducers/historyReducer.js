import { historyActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    groups: [],
    home: []
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case historyActions.FETCH_GROUP_HISTORIES_REQUEST:
            state = defaultState
            return state
            break
        case historyActions.FETCH_GROUP_HISTOIES_SUCCESS:
            state = { ...state, groups: action.payload }
            return state
            break
        case historyActions.FETCH_GROUP_HISTORIES_FAILURE:
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