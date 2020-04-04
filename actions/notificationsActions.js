import { notificationsActions } from '../constants'
import axios from 'axios'
export const FetchNotificationsRequest = () => {
    const taskURI = '/notifications?_expand=post&_expand=user&_expand=group&_expand=group_post'
    return (dispatch) => {
        axios.get(taskURI).then(async result => {
            const notifications = result.data
            dispatch(FetchNotificationsSuccess(notifications))
        }).catch(error => {
            dispatch(FetchNotificationsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: notificationsActions.FETCH_NOTIFICATIONS_REQUEST,
    }
}
export const FetchNotificationsFailure = (error) => {
    return {
        type: notificationsActions.FETCH_NOTIFICATIONS_FAILURE,
        error
    }
}
export const FetchNotificationsSuccess = (notifications) => {
    return {
        type: notificationsActions.FETCH_NOTIFICATIONS_SUCCESS,
        payload: notifications
    }
}
