import { groupActions } from '../constants'
import axios from 'axios'
const taskURI = '/groups'
export const FetchGroupsRequest = () => {
    return (dispatch) => {
        axios.get(taskURI).then(result => {
            const groups = result.data
            dispatch(FetchGroupsSuccess(groups))
        }).catch(error => {
            dispatch(FetchGroupsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: groupActions.FETCH_GROUPS_REQUEST,
    }
}
export const FetchGroupsFailure = (error) => {
    return {
        type: groupActions.FETCH_GROUPS_FAILURE,
        error
    }
}
export const FetchGroupsSuccess = (groups) => {
    return {
        type: groupActions.FETCH_GROUPS_SUCCESS,
        payload: groups
    }
}
