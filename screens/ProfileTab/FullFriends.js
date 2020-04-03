import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../../constants'
import { navigation } from '../../rootNavigation'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'

export default class FullFriends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: [...props.route.params.friends],
            filterType: 1,
            keyword: ''
        }
        this._currentTab = 1
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onPressToggleFilter() {
        const { filterType } = this.state
        if (filterType === 1) this.refs._horizontalScrollRef.scrollToEnd({ animated: true })
        else this.refs._horizontalScrollRef.scrollTo({
            x: 0,
            y: 0,
            animated: true
        })
        this.setState({
            ...this.state,
            filterType: filterType === 1 ? 2 : 1
        })
    }
    onChangeSearchInputHandler({ nativeEvent }) {
        const textValue = nativeEvent.text.toLowerCase()
        this.setState({
            ...this.props,
            keyword: textValue
        })
    }
    onScrollToActChangeTab({ nativeEvent }) {
        const offsetX = nativeEvent.contentOffset.x
        if (offsetX > SCREEN_WIDTH / 2) {
            this.refs._horizontalScrollRef.scrollToEnd({ animated: true })
            this.setState({
                ...this.state,
                filterType: 2
            })
        } else {
            this.refs._horizontalScrollRef.scrollTo({
                x: 0,
                y: 0,
                animated: true,
                duration: 100
            })
            this.setState({
                ...this.state,
                filterType: 1
            })
        }
    }
    onPressFriendOptionsHandler(friend) {
        navigation.navigate("FriendOptions", {
            friend
        })
    }
    onPressProfileHandler(userId) {
        navigation.push('ProfileX', {
            userId
        })
    }
    onPressSearchHandler() {

    }
    render() {
        const { filterType, friends, keyword } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
                    </ExTouchableOpacity>
                    <ExTouchableOpacity onPress={this.onPressSearchHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="search" color="#000" size={20} />
                    </ExTouchableOpacity>
                </View>
                <View style={styles.searchToolWrapper}>
                    <View style={styles.filterWrapper}>
                        <TouchableOpacity
                            onPress={this.onPressToggleFilter.bind(this)}
                            activeOpacity={0.6}
                            style={{ ...styles.btnFilter, backgroundColor: filterType === 1 ? '#9dd0eb' : '#ddd' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: filterType === 1 ? "#318bfb" : '#000' }}>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onPressToggleFilter.bind(this)}
                            activeOpacity={0.6}
                            style={{ ...styles.btnFilter, marginLeft: 10, backgroundColor: filterType === 2 ? '#9dd0eb' : '#ddd' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: filterType === 2 ? "#318bfb" : '#000' }}>Recent</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchTool}>
                        <View style={styles.btnSearchIcon}>
                            <FontAwesome5Icon name="search" color="gray" size={16} />
                        </View>
                        <TextInput onChange={this.onChangeSearchInputHandler.bind(this)} style={styles.searchInput} placeholder="Search Friends"></TextInput>
                    </View>
                </View>
                <ScrollView
                    ref="_horizontalScrollRef"
                    onScrollEndDrag={this.onScrollToActChangeTab.bind(this)}
                    bounces={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <ScrollView
                        style={styles.friendsWrapper}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.friendsCount}>{friends.length} Friends</Text>
                        <View style={styles.friends}>
                            {friends.map((friend, index) => (
                                <View key={index}>
                                    {
                                        friend.name.indexOf(keyword) > -1 ? (
                                            <ExTouchableOpacity onPress={this.onPressProfileHandler.bind(this, friend.id)} key={index} style={styles.friendItem}>
                                                <Image source={{ uri: friend.avatar_url }} style={styles.friendAvatar} />
                                                <View style={styles.friendInfoWrapper}>
                                                    <Text style={styles.friendName}>{friend.name}</Text>
                                                    <Text style={styles.friendMutualCount}>{friend.mutualFriends} mutual friends</Text>
                                                </View>
                                                <ExTouchableOpacity onPress={this.onPressFriendOptionsHandler.bind(this, friend)} style={styles.btnFriendOptions}>
                                                    <FontAwesome5Icon name="ellipsis-h" size={20} />
                                                </ExTouchableOpacity>
                                            </ExTouchableOpacity>
                                        ) : <View></View>
                                    }
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <ScrollView
                        style={styles.friendsWrapper}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.friends}>
                            {friends.map((friend, index) => (
                                <View key={index}>
                                    {
                                        friend.isRecent & friend.name.indexOf(keyword) > -1 ? (
                                            <ExTouchableOpacity key={index} style={styles.friendItem}>
                                                <Image source={{ uri: friend.avatar_url }} style={styles.friendAvatar} />
                                                <View style={styles.friendInfoWrapper}>
                                                    <Text style={styles.friendName}>{friend.name}</Text>
                                                    <Text style={styles.friendMutualCount}>{friend.mutualFriends} mutual friends</Text>
                                                </View>
                                                <TouchableOpacity style={styles.btnFriendOptions}>
                                                    <FontAwesome5Icon name="ellipsis-h" size={20} />
                                                </TouchableOpacity>
                                            </ExTouchableOpacity>
                                        ) : <View></View>
                                    }
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    navigationBar: {
        paddingTop: STATUSBAR_HEIGHT,
        flexDirection: 'row',
        height: 94,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    btnBack: {
        width: 50,
        alignItems: 'center'
    },
    navigationTitle: {
        fontSize: 18
    },
    searchToolWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    filterWrapper: {
        flexDirection: 'row',
    },
    btnFilter: {
        paddingHorizontal: 15,
        backgroundColor: '#ddd',// '#9dd0eb'
        borderRadius: 50,
        height: 40,
        justifyContent: 'center'
    },
    btnFilterActived: {
        backgroundColor: '#9dd0eb',// 
    },
    searchTool: {
        flexDirection: 'row',
        marginTop: 10,
        overflow: 'hidden',
        borderRadius: 50
    },
    btnSearchIcon: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ddd",
        width: 40
    },
    searchInput: {
        height: 40,
        width: SCREEN_WIDTH - 30 - 40, //paddingHorizontal btnSearch
        backgroundColor: "#ddd",
        paddingRight: 30
    },
    friendsWrapper: {
        padding: 15,
        paddingTop: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 50) - 120,//navigation bar searchTool
    },
    friendsCount: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    friends: {

    },
    friendItem: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    friendAvatar: {
        height: 80,
        width: 80,
        borderRadius: 80,
        borderColor: '#333',
        borderWidth: 0.2
    },
    friendInfoWrapper: {
        width: SCREEN_WIDTH - 30 - 80 - 30,//paddingHorizontal avatar optionBtn,
        paddingLeft: 15
    },
    friendName: {
        fontSize: 16,
        fontWeight: '600'
    },
    friendMutualCount: {
        color: '#333'
    },
    btnFriendOptions: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
