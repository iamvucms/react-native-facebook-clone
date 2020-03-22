import { groupDetailActions } from '../constants'
import axios from 'axios'

export const FetchGroupDetailRequest = (id) => {
    const taskURI = `/groups/${id}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const group = v.data
            dispatch(FetchGroupDetailSuccess(group))
        }).catch(error => {
            dispatch(FetchGroupDetailFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: groupDetailActions.FETCH_GROUP_DETAIL_REQUEST,
    }
}
export const FetchGroupDetailFailure = (error) => {
    return {
        type: groupDetailActions.FETCH_GROUP_DETAIL_FAILURE,
        error
    }
}
export const FetchGroupDetailSuccess = (group) => {
    return {
        type: groupDetailActions.FETCH_GROUP_DETAIL_SUCCESS,
        payload: group
    }
}
