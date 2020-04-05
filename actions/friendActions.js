import { friendActions } from '../constants'
import axios from 'axios'
const taskURI = '/recommend_friends?_expand=user'
export const FetchRecommendFriendsRequest = () => {
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friends = v.data
            dispatch(FetchRecommendFriendsSuccess(friends))
        }).catch(error => {
            dispatch(FetchRecommendFriendsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: friendActions.FETCH_RECOMMEND_FRIENDS_REQUEST,
    }
}
export const FetchRecommendFriendsFailure = (error) => {
    return {
        type: friendActions.FETCH_RECOMMEND_FRIENDS_FAILURE,
        error
    }
}
export const FetchRecommendFriendsSuccess = (friends) => {
    return {
        type: friendActions.FETCH_RECOMMEND_FRIENDS_SUCCESS,
        payload: friends
    }
}
//
export const FetchFriendRequestsRequest = () => {
    const taskURI = '/friend_requests?_expand=user'
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friends = v.data
            dispatch(FetchFriendRequestsSuccess(friends))
        }).catch(error => {
            dispatch(FetchFriendRequestsFailure(error))
        })
    }
}
export const FetchFriendRequestsFailure = (error) => {
    return {
        type: friendActions.FETCH_FRIEND_REQUESTS_FAILURE,
        error
    }
}
export const FetchFriendRequestsSuccess = (friends) => {
    return {
        type: friendActions.FETCH_FRIEND_REQUESTS_SUCCESS,
        payload: friends
    }
}
