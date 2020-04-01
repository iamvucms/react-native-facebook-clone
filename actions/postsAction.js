import {postsActions} from '../constants'
import axios from 'axios'
const taskURI  = '/posts?_expand=user'
export const FetchPostsRequest = ()=>{
    return (dispatch)=>{
        dispatch(FetchDefaultState())
        axios.get(taskURI).then(v => {
            const posts = v.data
            dispatch(FetchPostsSuccess(posts))
        }).catch(error =>{
            dispatch(FetchPostsFailure(error))
        })
    }
}
const FetchDefaultState = ()=>{
    return {
        type:postsActions.FETCH_POSTS_REQUEST,
    }
}
export const FetchPostsFailure = (error)=>{
    return {
        type:postsActions.FETCH_POSTS_FAILURE,
        error
    }
}
export const FetchPostsSuccess = (posts)=>{
    return {
        type:postsActions.FETCH_POSTS_SUCCESS,
        payload:posts
    }
}
