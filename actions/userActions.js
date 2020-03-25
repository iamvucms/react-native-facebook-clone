import { userActions } from '../constants'
import axios from 'axios'
export const LoginRequest = (username, password) => {
    const taskURI = `/users?username=${username}&password=${password}`
    return (dispatch) => {
        dispatch(FetchDefaultState())
        axios.get(taskURI).then(v => {
            const users = v.data
            if (users.length > 0) {
                let user = users[0]
                const watch_list = user.watch_list.slice(0, 3).map(page => page.pageId)
                const watchListQuery = watch_list.join("&id=")
                let taskURI2 = `/pages?id=${watchListQuery}`
                axios.get(taskURI2).then(result => {
                    const pages = result.data
                    user.watch_list = pages
                    dispatch(LoginSuccess(user))
                }).catch(error => {
                    dispatch(LoginFailure(error))
                })

            } else dispatch(LoginFailure({ message: "Your email and password are not correct!" }))
        }).catch(error => {
            dispatch(LoginFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: userActions.LOGIN_REQUEST,
    }
}
export const LoginFailure = (error) => {
    return {
        type: userActions.LOGIN_FAILURE,
        error
    }
}
export const LoginSuccess = (user) => {
    return {
        type: userActions.LOGIN_SUCCESS,
        payload: user
    }
}
