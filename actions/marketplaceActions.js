import { marketplaceActions } from '../constants'
import axios from 'axios'
export const FetchMarketplaceProductsRequest = () => {
    const taskURI = '/products?_expand=user'
    return (dispatch) => {
        axios.get(taskURI).then(async result => {
            let products = result.data
            products.map(async (product) => {
                const ids = product.relatedGroups
                const queryIds = ids.join('&id=')
                const taskURI2 = '/groups?id=' + queryIds
                const result2 = await axios.get(taskURI2)
                const groups = result2.data
                product.relatedGroups = groups
            })
            dispatch(FetchMarketplaceProductsSuccess(products))
        }).catch(error => {
            dispatch(FetchMarketplaceProductsFailure(error))
        })
    }
}
const FetchDefaultState = () => {
    return {
        type: marketplaceActions.FETCH_PRODUCTS_REQUEST,
    }
}
export const FetchMarketplaceProductsFailure = (error) => {
    return {
        type: marketplaceActions.FETCH_PRODUCTS_FAILURE,
        error
    }
}
export const FetchMarketplaceProductsSuccess = (products) => {
    return {
        type: marketplaceActions.FETCH_PRODUCTS_SUCCESS,
        payload: products
    }
}
