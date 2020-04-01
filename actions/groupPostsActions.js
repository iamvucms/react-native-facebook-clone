import { groupPostsActions } from '../constants'
import axios from 'axios'
export const FetchGroupPostsRequest = (id = null) => {
    let taskURI = null
    if (id !== null) taskURI = `/group_posts?_expand=user&group.id=${id}`
    else taskURI = `/group_posts?_expand=user`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const posts = v.data
            if (id !== null) dispatch(FetchInGroupPostsSuccess(posts))
            else dispatch(FetchAllGroupPostsSuccess(posts))
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
export const FetchInGroupPostsSuccess = (posts) => {
    return {
        type: groupPostsActions.FETCH_INGROUP_POSTS_SUCCESS,
        payload: posts
    }
}
export const FetchAllGroupPostsSuccess = (posts) => {
    return {
        type: groupPostsActions.FETCH_ALLGROUP_POSTS_SUCCESS,
        payload: posts
    }
}
