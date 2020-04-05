import { searchingActions } from '../constants'
import axios from 'axios'

export const commonSearchRequest = (keyword) => {
    return dispatch => {
        dispatch(SearchGroupsRequest(keyword))
        dispatch(SearchPostsRequest(keyword))
        dispatch(SearchPagesRequest(keyword))
        dispatch(SearchUsersRequest(keyword))
    }
}
export const SearchUsersRequest = (keyword) => {
    const taskURI = '/users?name_like=' + keyword.trim()
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const users = v.data
            dispatch(SearchUsersSuccess(users))
        }).catch(error => {
            dispatch(SearchUsersFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: searchingActions.SEARCH_USERS_REQUEST,
    }
}
export const SearchUsersFailure = (error) => {
    return {
        type: searchingActions.SEARCH_USERS_FAILURE,
        error
    }
}
export const SearchUsersSuccess = (users) => {
    return {
        type: searchingActions.SEARCH_USERS_SUCCESS,
        payload: users
    }
}
//
export const SearchPagesRequest = (keyword) => {
    const taskURI = '/pages?name_like=' + keyword
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const pages = v.data
            dispatch(SearchPagesSuccess(pages))
        }).catch(error => {
            dispatch(SearchPagesFailure(error))
        })
    }
}
export const SearchPagesFailure = (error) => {
    return {
        type: searchingActions.SEARCH_PAGES_FAILURE,
        error
    }
}
export const SearchPagesSuccess = (pages) => {
    return {
        type: searchingActions.SEARCH_PAGES_SUCCESS,
        payload: pages
    }
}
//
//
export const SearchPostsRequest = (keyword) => {
    const taskURI = '/posts?_expand=user&content_like=' + keyword
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const posts = v.data
            dispatch(SearchPostsSuccess(posts))
        }).catch(error => {
            dispatch(SearchPostsFailure(error))
        })
    }
}
export const SearchPostsFailure = (error) => {
    return {
        type: searchingActions.SEARCH_POSTS_FAILURE,
        error
    }
}
export const SearchPostsSuccess = (posts) => {
    return {
        type: searchingActions.SEARCH_POSTS_SUCCESS,
        payload: posts
    }
}
//
//
export const SearchGroupsRequest = (keyword) => {
    const taskURI = '/groups?name_like=' + keyword
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const groups = v.data
            dispatch(SearchGroupsSuccess(groups))
        }).catch(error => {
            dispatch(SearchGroupsFailure(error))
        })
    }
}
export const SearchGroupsFailure = (error) => {
    return {
        type: searchingActions.SEARCH_GROUPS_FAILURE,
        error
    }
}
export const SearchGroupsSuccess = (groups) => {
    return {
        type: searchingActions.SEARCH_GROUPS_SUCCESS,
        payload: groups
    }
}
//
