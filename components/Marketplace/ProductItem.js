import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { navigation } from '../../rootNavigation'
import { IntlProvider, FormattedNumber } from 'react-intl'
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
        return (
            <ExTouchableOpacity
                onPress={this.onPressProductHandler.bind(this)}
                style={styles.container}>
                <ImageBackground style={styles.bgContainer} source={{ uri: item.images[0] }}>
                    {!isShowMoreInfo && (
                        <View style={styles.priceWrapper}>
                            <IntlProvider textComponent={Text} locale="en">
                                <Text style={{ color: '#fff', fontWeight: '500' }}><FormattedNumber value={item.price} /> VND</Text>
                            </IntlProvider>
                        </View>
                    )}
                </ImageBackground>
                {isShowMoreInfo && (
                    <View style={styles.moreInfo}>
                        <IntlProvider textComponent={Text} locale="en">
                            <Text style={{ fontWeight: 'bold' }}><FormattedNumber value={item.price} /> VND</Text>
                        </IntlProvider>

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
