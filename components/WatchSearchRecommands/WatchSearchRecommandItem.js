import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import ExTouchableOpacity from '../ExTouchableOpacity'
import * as navigation from '../../rootNavigation'
export default class WatchSearchRecommandItem extends Component {
    onPressRecommandHandler() {
        // navigation.
    }
    render() {
        const { recommand } = this.props
        return (
            <ExTouchableOpacity onPress={this.onPressRecommandHandler.bind(this)}>
                <View style={styles.container}>
                    <Image source={{ uri: recommand.page.avatar_url }} style={styles.recommandAvatar}></Image>
                    <Text style={styles.recommandTxt}>{recommand.page.name}</Text>
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
    recommandAvatar: {
        height: 30,
        width: 30,
        borderRadius: 50,
        borderColor: '#333',
        borderWidth: 0.3,
        marginRight: 10
    },
    recommandTxt: {
        fontSize: 16,
        fontWeight: '500'
    }
})
