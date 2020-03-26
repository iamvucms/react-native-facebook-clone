import { watchSearchRecommandActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case watchSearchRecommandActions.FETCH_WATCH_SEARCH_RECOMMANDS_REQUEST:
            state = defaultState
            return state
            break
        case watchSearchRecommandActions.FETCH_WATCH_SEARCH_RECOMMANDS_SUCCESS:
            state = action.payload
            return state
            break
        case watchSearchRecommandActions.FETCH_WATCH_SEARCH_RECOMMANDS_REQUEST:
            const { message } = action.error
            Alert.alert('Error', message)
            return defaultState
            break
        default:
            return state
    }
}
export default reducer