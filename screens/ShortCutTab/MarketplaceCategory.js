import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { STATUSBAR_HEIGHT, SCREEN_WIDTH, productTypes, SCREEN_HEIGHT } from '../../constants'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { navigation } from '../../rootNavigation'
import { connect } from 'react-redux'
import ProductList from '../../components/Marketplace/ProductList'
class MarketplaceCategory extends Component {
    constructor(props) {
        super(props)
    }
    onPressMarketplaceSearchHandler() {
        navigation.push('MarketplaceSearch')
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    render() {
        const { products, productType, } = this.props.route.params
        const { user } = this.props
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
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={16} />
                    </ExTouchableOpacity>
                    <ExTouchableOpacity
                        onPress={this.onPressMarketplaceSearchHandler}
                        style={styles.mockInput}>
                        <FontAwesome5Icon name="search" size={16} color="#333" />
                        <Text style={{ color: '#333', marginLeft: 10 }}>Search on Marketplace</Text>
                    </ExTouchableOpacity>
                </View>
                <ScrollView
                    style={styles.productsWrapper}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.categoryTitleWrapper}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{categoryTitle}</Text>
                        </TouchableOpacity>
                        <ExTouchableOpacity style={styles.btnHide}>
                            <FontAwesome5Icon name="map-marker-alt" color="#318bfb" size={16} />
                            <Text style={{ color: '#318bfb', marginLeft: 5, fontWeight: '500' }}>{user?.live_in}</Text>
                        </ExTouchableOpacity>
                        <View style={styles.filtersWrapper}>
                            <TouchableOpacity style={styles.btnFilter}>
                                <FontAwesome5Icon name="outdent" color="#318bfb" />
                                <Text style={{
                                    color: '#318bfb', marginLeft: 5,
                                    fontWeight: '600'
                                }}>Filter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnFilter}>
                                <FontAwesome5Icon name="sort" color="#318bfb" />
                                <Text style={{
                                    color: '#318bfb', marginLeft: 5,
                                    fontWeight: '600'
                                }}>Sort</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <ProductList
                        isInCategory={true}
                        products={products}
                        productType={productType} />
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}
export default connect(mapStateToProps, null)(MarketplaceCategory);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    navigationBar: {
        paddingTop: STATUSBAR_HEIGHT,
        height: STATUSBAR_HEIGHT + 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    btnBack: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mockInput: {
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#ddd',
        paddingHorizontal: 15,
        width: SCREEN_WIDTH - 40 - 10
    },
    productsWrapper: {
        height: SCREEN_HEIGHT - STATUSBAR_HEIGHT - 50
    },
    categoryTitleWrapper: {
        padding: 15
    },
    btnHide: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    filtersWrapper: {
        flexDirection: 'row'
    },
    btnFilter: {
        flexDirection: 'row',
        height: 36,
        borderRadius: 5,
        marginRight: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#edf2fa'
    },
})
