import { watchSearchRecommendActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case watchSearchRecommendActions.FETCH_WATCH_SEARCH_RECOMMENDS_REQUEST:
            state = defaultState
            return state
            break
        case watchSearchRecommendActions.FETCH_WATCH_SEARCH_RECOMMENDS_SUCCESS:
            state = action.payload
            return state
            break
        case watchSearchRecommendActions.FETCH_WATCH_SEARCH_RECOMMENDS_REQUEST:
            const { message } = action.error
            Alert.alert('Error', message)
            return defaultState
            break
        default:
            return state
    }
}
export default reducer