import { systemImagesActions } from '../constants'
import * as FileSystem from 'expo-file-system';
import axios from 'axios'
const taskURI = '/'
//waiting for next solution
export const FetchSystemImagesRequest = () => {
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const images = v.data
            dispatch(FetchSystemImagesSuccess(images))
        }).catch(error => {
            dispatch(FetchSystemImagesFailure(error))
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
