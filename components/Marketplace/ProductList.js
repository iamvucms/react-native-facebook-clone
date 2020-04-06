import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ProductItem from './ProductItem'
import { productTypes } from '../../constants'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { navigation } from '../../rootNavigation'

class ProductList extends Component {
    constructor(props) {
        super(props)
    }
    onPressViewAllHandler() {
        const { productType, products } = this.props
        navigation.navigate('MarketplaceCategory', {
            products,
            productType
        })
    }
    onPressAreaHandler(){
        navigation.navigate('MarketplaceArea')
    }
    render() {
        const { productType, user, products, isInCategory } = this.props
        let previewProducts = [...products]
        if (!isInCategory) {
            if (products.length > 4) {
                previewProducts = previewProducts.splice(0, 4)
            } else if (products.length > 2) previewProducts = previewProducts.splice(0, 2)
        }
        const isShowMoreInfo = productTypes.RECOMMEND === productType || isInCategory;
        let categoryTitle;
        switch (productType) {
            case productTypes.RECOMMEND:
                categoryTitle = 'Recommend today'
                break
            case productTypes.COMPUTER:
                categoryTitle = 'Electronic & Computer'
                break
            case productTypes.COMMON:
                categoryTitle = 'Common'
                break
            case productTypes.FURNITURE:
                categoryTitle = 'Furniture'
                break
            case productTypes.TOOL:
                categoryTitle = 'Tool'
                break
            case productTypes.MY_AREA:
                categoryTitle = 'Selling products in your area'
                break
            case productTypes.GARDEN:
                categoryTitle = 'Garden'
                break
            case productTypes.MUSICAL_INSTRUMENT:
                categoryTitle = 'Musical instrument'
                break
        }
        return (
            <View style={styles.container}>
                {!isInCategory && (
                    <View style={styles.categoryOptions}>
                        <Text style={styles.categoryTitle}>
                            {categoryTitle}
                        </Text>
                        <View style={styles.rightOption}>
                            {productType !== productTypes.RECOMMEND ? (
                                <>
                                    <ExTouchableOpacity style={styles.btnHide}>
                                        <FontAwesome5Icon name="minus-square" color="#333" />
                                        <Text style={{ color: '#333', marginLeft: 5 }}>Hide</Text>
                                    </ExTouchableOpacity>
                                    <ExTouchableOpacity style={styles.btnOption}>
                                        <FontAwesome5Icon name="ellipsis-h" size={16} />
                                    </ExTouchableOpacity>
                                </>
                            ) : (
                                    <ExTouchableOpacity
                                        onPress={this.onPressAreaHandler}
                                        style={styles.btnHide}>
                                        <FontAwesome5Icon name="map-marker-alt" color="#318bfb" size={16} />
                                        <Text style={{ color: '#318bfb', marginLeft: 5, fontWeight: '500' }}>{user.live_in}</Text>
                                    </ExTouchableOpacity>
                                )}
                        </View>
                    </View>

                )}
                <View style={styles.productsWrapper}>
                    {previewProducts.map((product, index) => (
                        <ProductItem
                            item={product}
                            key={index}
                            isShowMoreInfo={isShowMoreInfo} />
                    ))}
                </View>
                {!isInCategory && (
                    <ExTouchableOpacity onPress={this.onPressViewAllHandler.bind(this)} style={styles.btnSeeMore}>
                        <Text>See all products</Text>
                        <FontAwesome5Icon name="chevron-right" />
                    </ExTouchableOpacity>
                )}
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}
export default connect(mapStateToProps, null)(ProductList);
const styles = StyleSheet.create({
    container: {

    },
    productsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    categoryOptions: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        marginHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categoryTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    btnSeeMore: {
        flexDirection: 'row',
        height: 40,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightOption: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center'
    },
    btnHide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnOption: {
        marginLeft: 10,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
