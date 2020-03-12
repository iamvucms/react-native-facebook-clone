import { postsActions } from '../constants' 
import {Alert} from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case postsActions.FETCH_POSTS_REQUEST:
            state = defaultState
            return state
            break
        case postsActions.FETCH_POSTS_SUCCESS:
            state = action.payload
            return state
            break
        case postsActions.FETCH_POSTS_FAILURE:
            const {message} = action.error
            Alert.alert("Error",message)
            state = defaultState
            return state
            break
        default:
            return state
    }
}
export default reducer