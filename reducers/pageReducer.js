import { pageDetailActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    page: {},
    posts: [],
    videos: [],
    images: []
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
        default:
            return state
    }
}
export default reducer