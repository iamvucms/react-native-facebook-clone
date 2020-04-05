import { friendActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = {
    recommendFriends: [],
    friendRequests: []
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case friendActions.FETCH_RECOMMEND_FRIENDS_REQUEST:
            state = { ...state, recommendFriends: [] }
            return state
            break
        case friendActions.FETCH_RECOMMEND_FRIENDS_SUCCESS:
            state = { ...state, recommendFriends: [...action.payload] }
            return state
            break
        case friendActions.FETCH_RECOMMEND_FRIENDS_FAILURE:
            const { message } = action.error
            Alert.alert("Error", message)
            state = defaultState
            return state
            break
        case friendActions.FETCH_FRIEND_REQUESTS_REQUEST:
            state = { ...state, friendRequests: [] }
            return state
            break
        case friendActions.FETCH_FRIEND_REQUESTS_SUCCESS:
            state = { ...state, friendRequests: [...action.payload] }
            return state
            break
        case friendActions.FETCH_FRIEND_REQUESTS_FAILURE:
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