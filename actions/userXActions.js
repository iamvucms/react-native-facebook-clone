import { userXActions } from '../constants'
import axios from 'axios'
export const FetchUserXRequest = (userId) => {
    const taskURI = `/users/${userId}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            let user = v.data
            delete user.username
            delete user.password
            dispatch(FetchUserXHighLightPhotosRequest(userId))
            dispatch(FetchUserXFriendsRequest(userId))
            dispatch(FetchUserXProfilePostsRequest(userId))
            const watch_list = user.watch_list.slice(0, 3).map(page => page.pageId)
            const watchListQuery = watch_list.join("&id=")
            let taskURI2 = `/pages?id=${watchListQuery}`
            axios.get(taskURI2).then(result => {
                const pages = result.data
                user.watch_list = pages
                dispatch(FetchUserXSuccess(user))
            }).catch(error => {
                dispatch(FetchUserXFailure(error))
            })
        }).catch(error => {
            dispatch(FetchUserXFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: userXActions.FETCH_USERX_REQUEST,
    }
}
export const FetchUserXFailure = (error) => {
    return {
        type: userXActions.FETCH_USERX_FAILURE,
        error
    }
}
export const FetchUserXSuccess = (user) => {
    return {
        type: userXActions.FETCH_USERX_SUCCESS,
        payload: user
    }
}
export const FetchUserXHighLightPhotosRequest = (userId) => {
    const taskURI = `users/${userId}/photos?_limit=9&isHighLight=true`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const photos = v.data
            dispatch(FetchUserXHighLightPhotosSuccess(photos))
        }).catch(error => {
            dispatch(FetchUserXHighLightPhotosFailure(error))
        })
    }
}
export const FetchUserXHighLightPhotosFailure = (error) => {
    return {
        type: userXActions.FETCH_USERX_HIGHLIGHT_PHOTOS_FAILURE,
        error
    }
}
export const FetchUserXHighLightPhotosSuccess = (photos) => {
    return {
        type: userXActions.FETCH_USERX_HIGHLIGHT_PHOTOS_SUCCESS,
        payload: photos
    }
}
//Friends
export const FetchUserXFriendsRequest = (userId) => {
    const taskURI = `/users/${userId}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const user = v.data
            const friendsWithRecent = user.friends
            const ids = friendsWithRecent?.map(friend => friend.userId)
            const queryIds = ids.join("&id=")
            const taskURI2 = `/users?id=${queryIds}`
            axios.get(taskURI2).then(result => {
                let friends = result.data
                friends = friends.map((friend, index) => {
                    friend.isRecent = friendsWithRecent[index].isRecent || false
                    friend.mutualFriends = friendsWithRecent[index].mutualFriends
                    return friend
                })
                dispatch(FetchUserXFriendsSuccess(friends))
            }).catch(error => {
                dispatch(FetchUserXFriendsFailure(error))
            })
        }).catch(error => {
            dispatch(FetchUserXFriendsFailure(error))
        })
    }
}
export const ResetUserX = () => {
    return {
        type: userXActions.RESET_USERX,
    }
}
export const FetchUserXFriendsFailure = (error) => {
    return {
        type: userXActions.FETCH_USERX_FRIENDS_FAILURE,
        error
    }
}
export const FetchUserXFriendsSuccess = (friends) => {
    return {
        type: userXActions.FETCH_USERX_FRIENDS_SUCCESS,
        payload: friends
    }
}
//Profie posts
export const FetchUserXProfilePostsRequest = (userId) => {
    const taskURI = `users/${userId}/posts?_expand=user`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const posts = v.data
            dispatch(FetchUserXProfilePostsSuccess(posts))
        }).catch(error => {
            dispatch(FetchUserXProfilePostsFailure(error))
        })
    }
}
export const FetchUserXProfilePostsFailure = (error) => {
    return {
        type: userXActions.FETCH_USERX_PROFILE_POSTS_FAILURE,
        error
    }
}
export const FetchUserXProfilePostsSuccess = (posts) => {
    return {
        type: userXActions.FETCH_USERX_PROFILE_POSTS_SUCCESS,
        payload: posts
    }
}
