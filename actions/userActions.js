import { userActions } from '../constants'
import axios from 'axios'
export const LoginRequest = (username, password) => {
    const taskURI = `/users?username=${username}&password=${password}`
    return (dispatch) => {
        dispatch(FetchDefaultState())
        axios.get(taskURI).then(v => {
            const users = v.data 
            if(users.length>0){
                const user = users[0]
                dispatch(LoginSuccess(user))
            }else dispatch(LoginFailure({message:"Your email and password are not correct!"}))
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
