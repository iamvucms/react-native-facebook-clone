import { systemImagesActions, permission } from '../constants'
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import { Alert } from 'react-native';
const taskURI = '/'
//waiting for next solution
export const FetchSystemImagesRequest = () => {
    const getPhotos = (dispatch) => {
        MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.photo
        }).then(result => {
            dispatch(FetchSystemImagesSuccess(result.assets))
        }).catch(error => {
            dispatch(FetchSystemImagesFailure(error))
        })
    }
    return (dispatch) => {
        MediaLibrary.getPermissionsAsync().then(permission => {
            if (permission.granted) {
                getPhotos(dispatch)
            } else {
                MediaLibrary.requestPermissionsAsync().then(permission => {
                    if (permission.granted) {
                        getPhotos(dispatch)
                    } else Alert.alert("You need to grant permission to get system photos")
                })
            }
        })

    }
}
const FetchDefaultState = () => {
    return {
        type: systemImagesActions.FETCH_SYSTEM_IMAGES_REQUEST,
    }
}
export const FetchSystemImagesFailure = (error) => {
    return {
        type: systemImagesActions.FETCH_SYSTEM_IMAGES_FAILURE,
        error
    }
}
export const FetchSystemImagesSuccess = (images) => {
    return {
        type: systemImagesActions.FETCH_SYSTEM_IMAGES_SUCCESS,
        payload: images
    }
}
