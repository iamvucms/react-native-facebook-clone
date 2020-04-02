import { friendActions } from '../constants'
import axios from 'axios'
const taskURI = '/recommand_friends?_expand=user'
export const FetchRecommandFriendsRequest = () => {
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const friends = v.data
            dispatch(FetchRecommandFriendsSuccess(friends))
        }).catch(error => {
            dispatch(FetchRecommandFriendsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: friendActions.FETCH_RECOMMAND_FRIENDS_REQUEST,
    }
}
export const FetchRecommandFriendsFailure = (error) => {
    return {
        type: friendActions.FETCH_RECOMMAND_FRIENDS_FAILURE,
        error
    }
}
export const FetchRecommandFriendsSuccess = (friends) => {
    return {
        type: friendActions.FETCH_RECOMMAND_FRIENDS_SUCCESS,
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
