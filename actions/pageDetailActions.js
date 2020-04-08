import { pageDetailActions } from '../constants'
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import { Alert } from 'react-native';

export const FetchPageDetailRequest = (pageId) => {
    const taskURI = '/pages/' + pageId
    return (dispatch) => {
        dispatch(FetchPageVideosRequest(pageId))
        dispatch(FetchPagePhotosRequest(pageId))
        dispatch(FetchPagePostsRequest(pageId))
        dispatch(FetchPageEventsRequest(pageId))
        axios.get(taskURI).then(result => {
            let page = result.data
            const fanIdsQueryString = page.fans.join('&id=')
            const friendsIdsQueryString = page.friendsLikePage.join('&id=')
            axios.get(`/users?id=${fanIdsQueryString}`).then(result2 => {
                page.fans = result2.data
                axios.get(`/users?id=${friendsIdsQueryString}`).then(result3 => {
                    page.friendsLikePage = result3.data
                    dispatch(FetchPageDetailSuccess(page))
                }).catch(err => {
                    dispatch(FetchPageDetailFailure(err))
                })
            }).catch(err => {
                dispatch(FetchPageDetailFailure(err))
            })
        }).catch(err => {
            dispatch(FetchPageDetailFailure(err))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: pageDetailActions.FETCH_PAGE_DETAIL_REQUEST,
    }
}
export const FetchPageDetailFailure = (error) => {
    return {
        type: pageDetailActions.FETCH_PAGE_DETAIL_FAILURE,
        error
    }
}
export const FetchPageDetailSuccess = (page) => {
    return {
        type: pageDetailActions.FETCH_PAGE_DETAIL_SUCCESS,
        payload: page
    }
}
//
export const FetchPageVideosRequest = (pageId) => {
    const taskURI = `/pages/${pageId}/watch_videos`
    return (dispatch) => {
        axios.get(taskURI).then(result => {
            const videos = result.data
            dispatch(FetchPageVideosSuccess(videos))
        }).catch(err => {
            dispatch(FetchPageVideosFailure(err))
        })
    }
}
export const FetchPageVideosFailure = (error) => {
    return {
        type: pageDetailActions.FETCH_PAGE_VIDEOS_FAILURE,
        error
    }
}
export const FetchPageVideosSuccess = (videos) => {
    return {
        type: pageDetailActions.FETCH_PAGE_VIDEOS_SUCCESS,
        payload: videos
    }
}
//
export const FetchPagePhotosRequest = (pageId) => {
    const taskURI = `/pages/${pageId}/page_posts`
    return (dispatch) => {
        axios.get(taskURI).then(result => {
            let photos = result.data
            photos = photos.map(photo => {
                photo = {
                    id: photo.id,
                    image: photo.image
                }
                return photo
            })
            dispatch(FetchPagePhotosSuccess(photos))
        }).catch(err => {
            dispatch(FetchPagePhotosFailure(err))
        })
    }
}
export const FetchPagePhotosFailure = (error) => {
    return {
        type: pageDetailActions.FETCH_PAGE_PHOTOS_FAILURE,
        error
    }
}
export const FetchPagePhotosSuccess = (photos) => {
    return {
        type: pageDetailActions.FETCH_PAGE_PHOTOS_SUCCESS,
        payload: photos
    }
}
//
export const FetchPagePostsRequest = (pageId) => {
    const taskURI = `/pages/${pageId}/page_posts?_expand=page`
    return (dispatch) => {
        axios.get(taskURI).then(result => {
            const posts = result.data
            dispatch(FetchPagePostsSuccess(posts))
        }).catch(err => {
            dispatch(FetchPagePostsFailure(err))
        })
    }
}
export const FetchPagePostsFailure = (error) => {
    return {
        type: pageDetailActions.FETCH_PAGE_POSTS_FAILURE,
        error
    }
}
export const FetchPagePostsSuccess = (posts) => {
    return {
        type: pageDetailActions.FETCH_PAGE_POSTS_SUCCESS,
        payload: posts
    }
}
//
export const FetchPagePostDetailRequest = (postId) => {
    const taskURI = `/page_posts/${postId}?_expand=page`
    return (dispatch) => {
        axios.get(taskURI).then(result => {
            const post = result.data
            dispatch(FetchPagePostDetailSuccess(post))
        }).catch(err => {
            dispatch(FetchPagePostDetailFailure(err))
        })
    }
}
export const FetchPagePostDetailFailure = (error) => {
    return {
        type: pageDetailActions.FETCH_PAGE_POST_DETAIL_FAILURE,
        error
    }
}
export const FetchPagePostDetailSuccess = (post) => {
    return {
        type: pageDetailActions.FETCH_PAGE_POST_DETAIL_SUCCESS,
        payload: post
    }
}
//
export const FetchPageEventsRequest = (pageId) => {
    const taskURI = `/pages/${pageId}/events?_expand=page`
    return (dispatch) => {
        axios.get(taskURI).then(result => {
            const events = result.data
            dispatch(FetchPageEventsSuccess(events))
        }).catch(err => {
            dispatch(FetchPageEventsFailure(err))
        })
    }
}
export const FetchPageEventsFailure = (error) => {
    return {
        type: pageDetailActions.FETCH_PAGE_EVENTS_FAILURE,
        error
    }
}
export const FetchPageEventsSuccess = (events) => {
    return {
        type: pageDetailActions.FETCH_PAGE_EVENTS_SUCCESS,
        payload: events
    }
}
export const SetPageNavigationTab = (tabId) => {
    return {
        type: pageDetailActions.SET_PAGE_NAVIGATION_TAB,
        payload: tabId
    }
}