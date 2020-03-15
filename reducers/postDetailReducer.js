import { postDetailActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    isShowModal: false,
    isShowCommentModal: false
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case postDetailActions.CLOSE_POST_DETAIL_MODAL:
            state = { ...state, isShowModal: false }
            return state
            break
        case postDetailActions.OPEN_COMMENTS_MODAL:
            state = { ...state, isShowCommentModal: true, isShowModal: false }
            return state
            break
        case postDetailActions.CLOSE_COMMENTS_MODAL:
            state = { ...state, isShowModal: true, isShowCommentModal: false }
            return state
            break
        case postDetailActions.FETCH_POST_DETAIL_REQUEST:
            state = defaultState
            return state
            break
        case postDetailActions.FETCH_POST_DETAIL_SUCCESS:
            state = action.payload
            return state
            break
        case postDetailActions.FETCH_POST_DETAIL_FAILURE:
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