import { groupPostsActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    allGroups: [],
    inGroup: []
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case groupPostsActions.FETCH_GROUP_POSTS_REQUEST:
            state = defaultState
            return state
            break
        case groupPostsActions.FETCH_ALLGROUP_POSTS_SUCCESS:
            state = { ...state, allGroups: action.payload }
            return state
            break
        case groupPostsActions.FETCH_INGROUP_POSTS_SUCCESS:
            state = { ...state, inGroup: action.payload }
            return state
            break
        case groupPostsActions.FETCH_GROUP_POSTS_FAILURE:
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