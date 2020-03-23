import { groupDetailActions } from '../constants'
import axios from 'axios'
export const FetchGroupDetailRequest = (id) => {
    const taskURI = `/groups/${id}`
    return (dispatch) => {
        axios.get(taskURI).then(v => {
            let group = v.data
            const arrID = group.friendsInGroup.map(user => user.userId)
            let arrIdQuery = arrID.join("&id=")
            const newTaskUri = `/users?id=${arrIdQuery}`
            axios.get(newTaskUri).then(result => {
                const friends = result.data.slice(0, 6)
                group.friendsInGroup = friends
                dispatch(FetchGroupDetailSuccess(group))
            }).catch(error => dispatch(FetchGroupDetailFailure(error)))
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
