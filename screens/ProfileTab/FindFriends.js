import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../../constants'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { navigation } from '../../rootNavigation'

class FindFriends extends Component {
    constructor(props) {
        super(props)
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onPressAllFriendsHandler() {
        const { friends } = this.props
        navigation.push('FullFriends', {
            friends
        })
    }
    onPressFriendRequestsHandler() {
        navigation.push('FriendRequests')
    }
    render() {
        const { recommendFriends } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={20} />
                    </ExTouchableOpacity>
                    <ExTouchableOpacity

                        activeOpacity={0.8}
                        style={styles.searchInput}>
                        <FontAwesome5Icon name="search" size={16} color="gray" />
                        <Text style={{ color: 'gray', marginLeft: 10, fontSize: 16 }}>Search</Text>
                    </ExTouchableOpacity>
                </View>
                <ScrollView
                    style={styles.scrollContainer}
                    bounces={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.btnNavigationsWrapper}>
                        <TouchableOpacity onPress={this.onPressFriendRequestsHandler.bind(this)} style={{ ...styles.btnNavigation, marginRight: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Friend Requests</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPressAllFriendsHandler.bind(this)} style={styles.btnNavigation}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>All Friends</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recommendFriendsWrapper}>
                        <Text style={styles.recommendFriendsTitle}>People you may know</Text>
                        <View style={styles.recommendFriends}>
                            {recommendFriends.map((recommend, index) => (
                                <ExTouchableOpacity key={index} style={styles.recommendFriendItem}>
                                    <Image style={styles.avatar} source={{ uri: recommend.user.avatar_url }} />
                                    <View style={styles.recommendInfo}>
                                        <Text style={styles.name}>{recommend.user.name}</Text>
                                        <Text style={styles.mutualCount}>{recommend.mutualCount} mutual friends</Text>
                                        <View style={styles.btnActionsWrapper}>
                                            <TouchableOpacity style={styles.btnAddFriend}>
                                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>Add Friend</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.btnHide}>
                                                <Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>Hide</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ExTouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const maptStateToProps = state => {
    return {
        recommendFriends: state.friends.recommendFriends,
        friends: state.user.friends,
    }
}
export default connect(maptStateToProps, null)(FindFriends)
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    navigationBar: {
        flexDirection: 'row',
        paddingTop: STATUSBAR_HEIGHT,
        height: 94,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        width: SCREEN_WIDTH - 40 - 15,
        height: 36,
        borderRadius: 40,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    btnNavigationsWrapper: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 15
    },
    btnNavigation: {
        height: 36,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: "#ddd"
    },
    scrollContainer: {
        paddingHorizontal: 15,
        height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 50)
    },
    recommendFriendsWrapper: {
        paddingVertical: 15
    },
    recommendFriendsTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    recommendFriends: {
        paddingVertical: 7.5
    },
    recommendFriendItem: {
        flexDirection: 'row',
        marginVertical: 7.5,
        alignItems: 'center'
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100
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
