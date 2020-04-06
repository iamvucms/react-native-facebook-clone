import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { STATUSBAR_HEIGHT, SCREEN_HEIGHT, productTypes } from '../../constants'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { navigation } from '../../rootNavigation'
import { connect } from 'react-redux'
import ProductList from '../../components/Marketplace/ProductList'
import { FetchMarketplaceProductsRequest } from '../../actions/marketplaceActions'

class Marketplace extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchMarketplaceProducts } = this.props
        fetchMarketplaceProducts()
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onPressMarketplaceSearchHandler() {
        navigation.navigate("MarketplaceSearch")
    }
    render() {
        const { user, marketplaceProducts } = this.props
        //divide by group
        let recommand = []
        let furniture = []
        let common = []
        let myArea = []
        let garden = []
        let computer = []
        let tool = []
        let musicalInstrument = []
        marketplaceProducts.map(product => {
            switch (product.type) {
                case productTypes.RECOMMEND:
                    recommand.push(product)
                    break
                case productTypes.COMPUTER:
                    computer.push(product)
                    break
                case productTypes.COMMON:
                    common.push(product)
                    break
                case productTypes.FURNITURE:
                    furniture.push(product)
                    break
                case productTypes.TOOL:
                    tool.push(product)
                    break
                case productTypes.MY_AREA:
                    myArea.push(product)
                    break
                case productTypes.GARDEN:
                    garden.push(product)
                    break
                case productTypes.MUSICAL_INSTRUMENT:
                    musicalInstrument.push(product)
                    break
            }
        })
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler}>
                        <FontAwesome5Icon name="arrow-left" size={20} />
                    </ExTouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Marketplace</Text>
                    <ExTouchableOpacity onPress={this.onPressMarketplaceSearchHandler}>
                        <FontAwesome5Icon name="search" size={20} />
                    </ExTouchableOpacity>
                </View>
                <ScrollView
                    style={styles.productsWrapper}
                    bounces={false}
                    showsVerticalScrollIndicator={false}>
                    <ScrollView
                        style={styles.optionsWrapper}
                        bounces={false}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={styles.avatarWrapper}>
                            <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOption}>
                            <Text style={{ fontWeight: '500', fontSize: 14 }}>Sell</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOption}>
                            <Text style={{ fontWeight: '500', fontSize: 14 }}>Area</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOption}>
                            <Text style={{ fontWeight: '500', fontSize: 14 }}>Vehicles</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnOption}>
                            <Text style={{ fontWeight: '500', fontSize: 14 }}>Lease</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.btnOption, marginRight: 30 }}>
                            <Text style={{ fontWeight: '500', fontSize: 14 }}>See More</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <ProductList products={recommand}
                        productType={productTypes.RECOMMEND} />
                    <ProductList products={computer}
                        productType={productTypes.COMPUTER} />
                    <ProductList products={common}
                        productType={productTypes.COMMON} />
                    <ProductList products={furniture}
                        productType={productTypes.FURNITURE} />
                    <ProductList products={tool}
                        productType={productTypes.TOOL} />
                    <ProductList products={garden}
                        productType={productTypes.GARDEN} />
                    <ProductList products={musicalInstrument}
                        productType={productTypes.MUSICAL_INSTRUMENT} />

                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user,
        marketplaceProducts: state.marketplaceProducts
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchMarketplaceProducts: () => dispatch(FetchMarketplaceProductsRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Marketplace)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    navigationBar: {
        flexDirection: 'row',
        paddingTop: STATUSBAR_HEIGHT,
        height: STATUSBAR_HEIGHT + 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    optionsWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    avatarWrapper: {
        height: 36,
        width: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#ddd',
        marginRight: 5
    },
    avatar: {
        height: 20,
        width: 20,
        borderRadius: 20
    },
    btnOption: {
        height: 36,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#ddd'
    },
    productsWrapper: {
        height: SCREEN_HEIGHT - STATUSBAR_HEIGHT - 50
    }

})
