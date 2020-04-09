import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { navigation } from '../../rootNavigation'
export default class ProductItem extends Component {
    constructor(props) {
        super(props)
    }
    onPressProductHandler() {
        const item = { ...this.props.item }
        navigation.navigate('MarketplaceProductDetail', {
            item
        })
    }
    render() {
        const { isShowMoreInfo, item } = this.props
        const numberFormat = new Intl.NumberFormat('ja-JP')
        return (
            <ExTouchableOpacity
                onPress={this.onPressProductHandler.bind(this)}
                style={styles.container}>
                <ImageBackground style={styles.bgContainer} source={{ uri: item.images[0] }}>
                    {!isShowMoreInfo && (
                        <View style={styles.priceWrapper}>
                            <Text style={{ color: '#fff', fontWeight: '500' }}>{numberFormat.format(item.price)} VND</Text>
                        </View>
                    )}
                </ImageBackground>
                {isShowMoreInfo && (
                    <View style={styles.moreInfo}>
                        <Text style={{ fontWeight: 'bold' }}>{numberFormat.format(item.price)} VND</Text>
                        <Text style={{ color: '#333' }}>{item.sell_in},</Text>
                    </View>
                )}
            </ExTouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SCREEN_WIDTH * 0.01
    },
    bgContainer: {
        position: 'relative',
        width: SCREEN_WIDTH * 0.495,
        height: SCREEN_WIDTH * 0.495,
    },
    priceWrapper: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        padding: 2.5,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    moreInfo: {
        padding: 10
    }
})
