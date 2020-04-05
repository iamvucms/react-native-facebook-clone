import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import ExTouchableOpacity from '../ExTouchableOpacity'
import * as navigation from '../../rootNavigation'
export default class WatchSearchRecommendItem extends Component {
    onPressRecommendHandler() {
        // navigation.
    }
    render() {
        const { recommend } = this.props
        return (
            <ExTouchableOpacity onPress={this.onPressRecommendHandler.bind(this)}>
                <View style={styles.container}>
                    <Image source={{ uri: recommend.page.avatar_url }} style={styles.recommendAvatar}></Image>
                    <Text style={styles.recommendTxt}>{recommend.page.name}</Text>
                </View>
            </ExTouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        alignItems: "center",
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    recommendAvatar: {
        height: 30,
        width: 30,
        borderRadius: 50,
        borderColor: '#333',
        borderWidth: 0.3,
        marginRight: 10
    },
    recommendTxt: {
        fontSize: 16,
        fontWeight: '500'
    }
})
