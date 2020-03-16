import { friendActions } from '../constants'
import axios from 'axios'
const taskURI = '/recommand_friends'
export const FetchRecommandFriendsRequest = () => {
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const posts = v.data
            dispatch(FetchRecommandFriendsSuccess(posts))
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
export const FetchRecommandFriendsSuccess = (posts) => {
    return {
        type: friendActions.FETCH_RECOMMAND_FRIENDS_SUCCESS,
        payload: posts
    }
}
