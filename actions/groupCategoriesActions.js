import { groupCategoriesActions } from '../constants'
import axios from 'axios'
const taskURI = '/group_categories'
export const FetchGroupCategoriesRequest = () => {
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            let categories = v.data
            dispatch(FetchGroupCategoriesSuccess(categories))
        }).catch(error => {
            dispatch(FetchGroupCategoriesFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: groupCategoriesActions.FETCH_GROUP_CATEGORIES_REQUEST,
    }
}
export const FetchGroupCategoriesFailure = (error) => {
    return {
        type: groupCategoriesActions.FETCH_GROUP_CATEGORIES_FAILURE,
        error
    }
}
export const FetchGroupCategoriesSuccess = (categories) => {
    return {
        type: groupCategoriesActions.FETCH_GROUP_CATEGORIES_SUCCESS,
        payload: categories
    }
}
