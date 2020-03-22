import { groupPostsActions } from '../constants'
import axios from 'axios'
const taskURI = '/group_posts'
export const FetchGroupPostsRequest = () => {
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const posts = v.data
            dispatch(FetchGroupPostsSuccess(posts))
        }).catch(error => {
            dispatch(FetchGroupPostsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: groupPostsActions.FETCH_GROUP_POSTS_REQUEST,
    }
}
export const FetchGroupPostsFailure = (error) => {
    return {
        type: groupPostsActions.FETCH_GROUP_POSTS_FAILURE,
        error
    }
}
export const FetchGroupPostsSuccess = (posts) => {
    return {
        type: groupPostsActions.FETCH_GROUP_POSTS_SUCCESS,
        payload: posts
    }
}
