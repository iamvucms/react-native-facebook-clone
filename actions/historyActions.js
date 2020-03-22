import { historyActions } from '../constants'
import axios from 'axios'
export const FetchGroupHistoriesRequest = () => {
    const taskURI = '/history'
    return (dispatch) => {
        axios.get(taskURI).then(result => {
            const groups = result.data.groups
            dispatch(FetchGroupHistoriesSuccess(groups))
        }).catch(error => {
            dispatch(FetchGroupHistoriesFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: historyActions.FETCH_GROUP_HISTORIES_REQUEST,
    }
}
export const FetchGroupHistoriesFailure = (error) => {
    return {
        type: historyActions.FETCH_GROUP_HISTORIES_FAILURE,
        error
    }
}
export const FetchGroupHistoriesSuccess = (groups) => {
    return {
        type: historyActions.FETCH_GROUP_HISTOIES_SUCCESS,
        payload: groups
    }
}
