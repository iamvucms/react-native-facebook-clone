import { marketplaceActions } from '../constants'
import { Alert } from 'react-native'
const defaultState = []
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case marketplaceActions.FETCH_PRODUCTS_REQUEST:
            state = defaultState
            return state
            break
        case marketplaceActions.FETCH_PRODUCTS_SUCCESS:
            state = [...action.payload]
            return state
            break
        case marketplaceActions.FETCH_PRODUCTS_FAILURE:
            const { message } = action.error
            Alert.alert('Erorr', message)
            return defaultState
            break
        default:
            return state
    }
}
export default reducer