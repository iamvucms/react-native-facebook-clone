import { pageDetailActions } from '../constants'
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import { Alert } from 'react-native';

export const FetchPageDetailRequest = (pageId) => {
    const taskURI = '/pages/' + pageId
    return (dispatch) => {
        dispatch(FetchPageVideosRequest(pageId))
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
