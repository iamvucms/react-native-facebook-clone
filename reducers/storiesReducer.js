import { actionStories } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionStories.FETCH_STORIES_REQUEST:
            state = defaultState
            return state
            break
        case actionStories.FETCH_STORIES_SUCCESS:
            state = action.payload
            return state
            break
        case actionStories.FETCH_STORIES_FAILURE:
            const {message} = action.error
            Alert.alert('Erorr',message)
            return defaultState
            break
        default:
            return state
    }
}
export default reducer