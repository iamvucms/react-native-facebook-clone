import { showingStoryActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case showingStoryActions.SET_SHOWING_STORY_REQUEST:
            state = defaultState
            return state
            break
        case showingStoryActions.SET_SHOWING_STORY:
            const { payload } = action
            state = payload
            return state
            break
        default:
            return state
    }
}
export default reducer