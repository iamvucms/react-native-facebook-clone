import { bgColorsActions } from '../constants'
import axios from 'axios'
const taskURI = '/bg_colors'
export const FetchBgColorsRequest = () => {
    return (dispatch) => {
        axios.get(taskURI).then(result => {
            const bgcolors = result.data
            dispatch(FetchBgColorsSuccess(bgcolors))
        }).catch(error => {
            dispatch(FetchBgColorsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: bgColorsActions.FETCH_BGCOLORS_REQUEST,
    }
}
export const FetchBgColorsFailure = (error) => {
    return {
        type: bgColorsActions.FETCH_BGCOLORS_FAILURE,
        error
    }
}
export const FetchBgColorsSuccess = (bgcolors) => {
    return {
        type: bgColorsActions.FETCH_BGCOLORS_SUCCESS,
        payload: bgcolors
    }
}
