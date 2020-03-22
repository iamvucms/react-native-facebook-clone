import { categoryGroupListActions } from '../constants'
import axios from 'axios'
export const FetchCategoryGroupListRequest = (arrID) => {
    arrID = arrID.join('&id=')
    const taskURI = `/groups?id=${arrID}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            const groups = v.data
            dispatch(FetchCategoryGroupListSuccess(groups))
        }).catch(error => {
            dispatch(FetchCategoryGroupListFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: categoryGroupListActions.FETCH_CATEGORY_GROUPS_REQUEST,
    }
}
export const FetchCategoryGroupListFailure = (error) => {
    return {
        type: categoryGroupListActions.FETCH_CATEGORY_GROUPS_FAILURE,
        error
    }
}
export const FetchCategoryGroupListSuccess = (groups) => {
    return {
        type: categoryGroupListActions.FETCH_CATEGORY_GROUPS_SUCCESS,
        payload: groups
    }
}
