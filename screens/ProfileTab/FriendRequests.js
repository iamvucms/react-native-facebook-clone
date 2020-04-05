import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../../constants'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { navigation } from '../../rootNavigation'
import { FetchFriendRequestsRequest } from '../../actions/friendActions'

class FriendRequests extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchFriendRequest } = this.props
        fetchFriendRequest()
    }
    onPressRemoveFriendRequest(index) {

    }
    onPressProfileHandler(userId) {
        navigation.push("ProfileX", {
            userId
        })
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    render() {
        let { friendRequests } = this.props
        if (friendRequests.length === 0) return <View></View>
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

                    <View style={styles.friendRequestsWrapper}>
                        <Text style={styles.friendRequestsTitle}>Friend Requests</Text>
                        <View style={styles.friendRequests}>
                            {friendRequests.map((friendRequest, index) => (
                                <ExTouchableOpacity onPress={this.onPressProfileHandler.bind(this, friendRequest.user.id)} key={index} style={styles.recommendFriendItem}>
                                    <Image style={styles.avatar} source={{ uri: friendRequest.user.avatar_url }} />
                                    <View style={styles.recommendInfo}>
                                        <Text style={styles.name}>{friendRequest.user.name}</Text>
                                        <Text style={styles.mutualCount}>{friendRequest.mutualCount} mutual friends</Text>
                                        <View style={styles.btnActionsWrapper}>
                                            <TouchableOpacity style={styles.btnAddFriend}>
                                                <Text style={{ color: '#fff', fontWeight: '500', fontSize: 16 }}>Confirm</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.onPressRemoveFriendRequest.bind(this, index)} style={styles.btnHide}>
                                                <Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>Remove</Text>
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
        friendRequests: state.friends.friendRequests,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchFriendRequest: () => dispatch(FetchFriendRequestsRequest())
    }
}
export default connect(maptStateToProps, mapDispatchToProps)(FriendRequests)
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
    friendRequestsWrapper: {
        paddingVertical: 15
    },
    friendRequestsTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    friendRequests: {
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
