import { userXActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    user: {},
    friends: [],
    highlightPhotos: [],
    posts: []
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case userXActions.RESET_USERX:
            state = defaultState
            return state
            break
        case userXActions.FETCH_USERX_REQUEST:
            state = { ...state, user: {} }
            return state
            break
        case userXActions.FETCH_USERX_SUCCESS:
            state = { ...state, user: action.payload }
            return state
            break
        case userXActions.FETCH_USERX_FAILURE:
            const { message } = action.error
            Alert.alert('Error', message)
            return state
            break
        case userXActions.FETCH_USERX_HIGHLIGHT_PHOTOS_REQUEST:
            state = { ...state, highlightPhotos: [] }
            return state
            break
        case userXActions.FETCH_USERX_HIGHLIGHT_PHOTOS_SUCCESS:
            state = { ...state, highlightPhotos: [...action.payload] }
            return state
            break
        case userXActions.FETCH_USERX_HIGHLIGHT_PHOTOS_FAILURE:
            const { message2 } = action.error
            Alert.alert('Error', message2)
            return state
            break
        case userXActions.FETCH_USERX_FRIENDS_REQUEST:
            state = { ...state, friends: [] }
            return state
            break
        case userXActions.FETCH_USERX_FRIENDS_SUCCESS:
            state = { ...state, friends: [...action.payload] }
            return state
            break
        case userXActions.FETCH_USERX_FRIENDS_FAILURE:
            const { message3 } = action.error
            Alert.alert('Error', message3)
            return state
            break
        case userXActions.FETCH_USERX_PROFILE_POSTS_REQUEST:
            state = { ...state, posts: [] }
            return state
            break
        case userXActions.FETCH_USERX_PROFILE_POSTS_SUCCESS:
            state = { ...state, posts: [...action.payload] }
            return state
            break
        case userXActions.FETCH_USERX_PROFILE_POSTS_FAILURE:
            const { message4 } = action.error
            Alert.alert('Error', message4)
            return state
            break
        default:
            return state
    }
}
export default reducer