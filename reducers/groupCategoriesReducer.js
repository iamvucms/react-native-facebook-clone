import { groupCategoriesActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case groupCategoriesActions.FETCH_GROUP_CATEGORIES_REQUEST:
            state = defaultState
            return state
            break
        case groupCategoriesActions.FETCH_GROUP_CATEGORIES_SUCCESS:
            state = action.payload
            return state
            break
        case groupCategoriesActions.FETCH_GROUP_CATEGORIES_FAILURE:
            const { message } = action.error
            Alert.alert("Error", message)
            state = defaultState
            return state
            break
        default:
            return state
    }
}
export default reducer