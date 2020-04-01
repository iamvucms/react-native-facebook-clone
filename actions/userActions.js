import { userActions } from '../constants'
import axios from 'axios'
export const LoginRequest = (username, password) => {
    const taskURI = `/users?username=${username}&password=${password}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const users = v.data
            if (users.length > 0) {
                let user = users[0]
                dispatch(FetchHighLightPhotosRequest(user.id))
                dispatch(FetchFriendsRequest(user.id))
                dispatch(FetchProfilePostsRequest(user.id))
                const watch_list = user.watch_list.slice(0, 3).map(page => page.pageId)
                const watchListQuery = watch_list.join("&id=")
                let taskURI2 = `/pages?id=${watchListQuery}`
                axios.get(taskURI2).then(result => {
                    const pages = result.data
                    user.watch_list = pages
                    dispatch(LoginSuccess(user))
                }).catch(error => {
                    dispatch(LoginFailure(error))
                })

            } else dispatch(LoginFailure({ message: "Your email and password are not correct!" }))
        }).catch(error => {
            dispatch(LoginFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: userActions.LOGIN_REQUEST,
    }
}
export const LoginFailure = (error) => {
    return {
        type: userActions.LOGIN_FAILURE,
        error
    }
}
export const LoginSuccess = (user) => {
    return {
        type: userActions.LOGIN_SUCCESS,
        payload: user
    }
}
export const FetchHighLightPhotosRequest = (userId) => {
    const taskURI = `users/${userId}/photos?_limit=9&isHighLight=true`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const photos = v.data
            dispatch(FetchHighLightPhotosSuccess(photos))
        }).catch(error => {
            dispatch(FetchHighLightPhotosFailure(error))
        })
    }
}
export const FetchHighLightPhotosFailure = (error) => {
    return {
        type: userActions.FETCH_HIGHLIGHT_PHOTOS_FAILURE,
        error
    }
}
export const FetchHighLightPhotosSuccess = (photos) => {
    return {
        type: userActions.FETCH_HIGHLIGHT_PHOTOS_SUCCESS,
        payload: photos
    }
}
//Friends
export const FetchFriendsRequest = (userId) => {
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
                dispatch(FetchFriendsSuccess(friends))
            }).catch(error => {
                dispatch(FetchFriendsFailure(error))
            })
        }).catch(error => {
            dispatch(FetchFriendsFailure(error))
        })
    }
}
export const FetchFriendsFailure = (error) => {
    return {
        type: userActions.FETCH_FRIENDS_FAILURE,
        error
    }
}
export const FetchFriendsSuccess = (friends) => {
    return {
        type: userActions.FETCH_FRIENDS_SUCCESS,
        payload: friends
    }
}
//Profie posts
export const FetchProfilePostsRequest = (userId) => {
    const taskURI = `users/${userId}/posts?_expand=user`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const posts = v.data
            dispatch(FetchProfilePostsSuccess(posts))
        }).catch(error => {
            dispatch(FetchProfilePostsFailure(error))
        })
    }
}
export const FetchProfilePostsFailure = (error) => {
    return {
        type: userActions.FETCH_PROFILE_POSTS_FAILURE,
        error
    }
}
export const FetchProfilePostsSuccess = (posts) => {
    return {
        type: userActions.FETCH_PROFILE_POSTS_SUCCESS,
        payload: posts
    }
}
