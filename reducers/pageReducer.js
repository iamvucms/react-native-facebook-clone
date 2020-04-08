import { pageDetailActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    page: {},
    posts: [],
    videos: [],
    photos: [],
    postDetail: {},
    events: [],
    pageNavigation: 0
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case pageDetailActions.FETCH_PAGE_DETAIL_REQUEST:
            state = { ...this.state, page: {} }
            return state
            break
        case pageDetailActions.FETCH_PAGE_DETAIL_SUCCESS:
            state = { ...state, page: { ...action.payload } }
            return state
            break
        case pageDetailActions.FETCH_PAGE_DETAIL_FAILURE:
            const { message } = action.error
            Alert.alert("Error", message)
            state = defaultState
            return state
            break
        case pageDetailActions.FETCH_PAGE_VIDEOS_REQUEST:
            state = { ...this.state, videos: [] }
            return state
            break
        case pageDetailActions.FETCH_PAGE_VIDEOS_SUCCESS:
            state = { ...state, videos: [...action.payload] }
            return state
            break
        case pageDetailActions.FETCH_PAGE_VIDEOS_FAILURE:
            const { message2 } = action.error
            Alert.alert("Error", message2)
            state = defaultState
            return state
            break
        case pageDetailActions.FETCH_PAGE_PHOTOS_REQUEST:
            state = { ...this.state, photos: [] }
            return state
            break
        case pageDetailActions.FETCH_PAGE_PHOTOS_SUCCESS:
            state = { ...state, photos: [...action.payload] }
            return state
            break
        case pageDetailActions.FETCH_PAGE_PHOTOS_FAILURE:
            const { message3 } = action.error
            Alert.alert("Error", message3)
            state = defaultState
            return state
            break
        case pageDetailActions.FETCH_PAGE_POSTS_REQUEST:
            state = { ...this.state, posts: [] }
            return state
            break
        case pageDetailActions.FETCH_PAGE_POSTS_SUCCESS:
            state = { ...state, posts: [...action.payload] }
            return state
            break
        case pageDetailActions.FETCH_PAGE_POSTS_FAILURE:
            const { message4 } = action.error
            Alert.alert("Error", message4)
            state = defaultState
            return state
            break
        case pageDetailActions.FETCH_PAGE_POST_DETAIL_REQUEST:
            state = { ...this.state, postDetail: {} }
            return state
            break
        case pageDetailActions.FETCH_PAGE_POST_DETAIL_SUCCESS:
            state = { ...state, postDetail: { ...action.payload } }
            return state
            break
        case pageDetailActions.FETCH_PAGE_POST_DETAIL_FAILURE:
            const { message5 } = action.error
            Alert.alert("Error", message5)
            state = defaultState
            return state
            break
        case pageDetailActions.FETCH_PAGE_EVENTS_REQUEST:
            state = { ...this.state, events: [] }
            return state
            break
        case pageDetailActions.FETCH_PAGE_EVENTS_SUCCESS:
            state = { ...state, events: [...action.payload] }
            return state
            break
        case pageDetailActions.SET_PAGE_NAVIGATION_TAB:
            state = { ...state, pageNavigation: action.payload }
            return state
            break
        case pageDetailActions.FETCH_PAGE_EVENTS_FAILURE:
            const { message6 } = action.error
            Alert.alert("Error", message6)
            state = defaultState
            return state
            break
        default:
            return state
    }
}
export default reducer