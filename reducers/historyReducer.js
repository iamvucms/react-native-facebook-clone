import { historyActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    groups: [],
    home: []
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case historyActions.FETCH_GROUP_HISTORIES_REQUEST:
            state = { ...state, groups: [] }
            return state
            break
        case historyActions.FETCH_GROUP_HISTORIES_SUCCESS:
            state = { ...state, groups: [...action.payload] }
            return state
            break
        case historyActions.FETCH_GROUP_HISTORIES_FAILURE:
            const { message } = action.error
            Alert.alert("Error", message)
            state = defaultState
            return state
            break
        case historyActions.FETCH_HOME_HISTORIES_REQUEST:
            state = { ...state, home: [] }
            return state
            break
        case historyActions.FETCH_HOME_HISTORIES_SUCCESS:
            state = { ...state, home: [...action.payload] }
            return state
            break
        case historyActions.FETCH_HOME_HISTORIES_FAILURE:
            const { message2 } = action.error
            Alert.alert("Error", message2)
            state = defaultState
            return state
            break
        default:
            return state
    }
}
export default reducer