import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { navigation } from '../../rootNavigation'

export default class VerticalRecommendItem extends Component {
    constructor(props) {
        super(props)
    }
    onPressRecommendItemHandler() {
        const { item } = this.props
        navigation.navigate('ProfileX', {
            userId: item.user.id
        })
    }
    render() {
        const { item } = this.props
        return (
            <ExTouchableOpacity
                onPress={this.onPressRecommendItemHandler.bind(this)}
                style={styles.container}>
                <Image style={styles.avatar} source={{ uri: item.user.avatar_url }} />
                <View style={styles.recommendInfo}>
                    <Text style={styles.name}>{item.user.name}</Text>
                    <Text style={styles.mutualCount}>{item.mutualCount} mutual friends</Text>
                    <View style={styles.btnActionsWrapper}>
                        <TouchableOpacity style={styles.btnAddFriend}>
                            <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>Add Friend</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnHide}>
                            <Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ExTouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: 'row'
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 64,
        borderColor: "#333",
        borderWidth: 0.3
    },
    recommendInfo: {
        width: SCREEN_WIDTH - 30 - 100,
        paddingLeft: 10
    },
    name: {
        fontSize: 16,
        fontWeight: '500'
    },
    mutualCount: {
        fontSize: 14,
        color: '#333',
        marginVertical: 5
    },
    btnActionsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnAddFriend: {
        width: '48.5%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#318bfb',
        borderRadius: 5
    },
    btnHide: {
        width: '48.5%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#ddd'
    }
})
