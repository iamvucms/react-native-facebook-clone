import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SCREEN_WIDTH } from '../../constants'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { navigation } from '../../rootNavigation'

export default class Community extends Component {
    constructor(props) {
        super(props)
    }
    onPressProfileXHandler(userId) {
        navigation.navigate('ProfileX', {
            userId
        })
    }
    render() {
        const { page } = this.props
        const fans = [...page.fans].splice(0, 3)
        const friendsLikePage = [...page.friendsLikePage].splice(0, 6)
        const previewFriendLikepage = [...page.friendsLikePage].splice(0, 3)
        return (
            <View style={styles.container}>
                <View style={styles.topFansWrapper}>
                    <View style={styles.topFanTitle}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            marginVertical: 5,
                        }}>Top Fans </Text>
                        <Text style={{
                            color: '#333',
                            fontWeight: '500'
                        }}>You 're a top fans! Keep engagin with this </Text>
                        <Text style={{
                            color: '#333',
                            fontWeight: '500'
                        }}>Page to maintain your top fan status </Text>
                    </View>
                    <View style={styles.fansWrapper}>
                        {fans.map((people, index) => (
                            <View key={index} style={{
                                ...styles.fanItem,
                                borderBottomWidth: index === fans.length - 1 ? 0 : 0.5
                            }}>
                                <Image style={styles.fanAvatar} source={{ uri: people.avatar_url }} />
                                <View style={{
                                    width: SCREEN_WIDTH - 30 - 50 - 30,
                                    paddingHorizontal: 10
                                }}>
                                    <Text style={{
                                        fontWeight: '500',
                                        fontSize: 16
                                    }}>{people.name}</Text>
                                    <Text style={{
                                        color: 'gray',
                                        fontWeight: '500'
                                    }}>New top fan</Text>
                                </View>
                                <View style={{
                                    width: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <FontAwesome5Icon color="#333" size={24} name="facebook-messenger" />
                                </View>
                            </View>
                        ))}
                    </View>
                    <ExTouchableOpacity style={styles.btnSeeAll}>
                        <Text style={{
                            fontWeight: "500",
                            marginRight: 5,
                        }}>See all top fans</Text>
                        <FontAwesome5Icon name="chevron-right" color="#333" />
                    </ExTouchableOpacity>
                </View>
                <View style={styles.statisticWrapper}>
                    <View style={styles.statistic}>
                        <View style={styles.statisticItem}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>{page.like_count > 1000 ? Math.round(page.like_count / 1000) + 'k' : page.like_count}</Text>
                            <Text style={{
                                color: 'gray',
                                fontSize: 16
                            }}>Total like count</Text>
                        </View>
                        <View style={{
                            ...styles.statisticItem,
                            borderLeftColor: '#ddd',
                            borderLeftWidth: 2
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>
                                {page.follow_count > 1000 ? Math.round(page.follow_count / 1000) + 'k' : page.follow_count}
                            </Text>
                            <Text style={{
                                color: 'gray',
                                fontSize: 16
                            }}>Total follow count</Text>
                        </View>
                    </View>
                    <View style={styles.inviteFriends}>
                        <View style={styles.friendsWrapper}>
                            {friendsLikePage.map((friend, index) => (
                                <Image
                                    source={{ uri: friend.avatar_url }}
                                    key={index}
                                    style={{
                                        ...styles.friendAvatar,
                                        marginLeft: index === 0 ? 0 : -10,
                                        zIndex: friendsLikePage.length - index
                                    }} />
                            ))}
                        </View>
                        <Text style={{
                            fontWeight: '500'
                        }}>Invite Friends to Like This Page</Text>
                        <Text style={{
                            textAlign: 'center',
                            marginVertical: 5,
                            color: 'gray'
                        }}>Help more people discover this Page by inviting friends to like it.</Text>
                        <View style={styles.inviteBtnWrapper}>
                            <ExTouchableOpacity style={{
                                ...styles.inviteBtn,
                                backgroundColor: '#318bfb'
                            }}>
                                <FontAwesome5Icon name="user-plus" size={16} color="#fff" />
                                <Text style={{
                                    marginLeft: 5,
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#fff'
                                }}>Invite Friends</Text>
                            </ExTouchableOpacity>
                            <ExTouchableOpacity style={{
                                ...styles.inviteBtn,
                                backgroundColor: '#1cb39b'
                            }}>
                                <FontAwesome5Icon name="whatsapp" color="#fff" size={20} />
                                <Text style={{
                                    marginLeft: 5,
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#fff'
                                }}>Invite on WhatsApp</Text>
                            </ExTouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.friendsLikePageWrapper}>
                    <View style={styles.friendsLikePageTitle}>
                        <Text style={{
                            fontWeight: '500',
                        }}>Friend Who Like {page.name}</Text>
                        <Text> - </Text>
                        <Text style={{
                            color: 'gray'
                        }}>{page.friendsLikePage?.length - 1}+</Text>
                    </View>
                    <View style={styles.friendLikePageList}>
                        {previewFriendLikepage.map((friend, index) => (
                            <ExTouchableOpacity
                                key={index}
                                onPress={this.onPressProfileXHandler.bind(this, friend.id)}
                                style={styles.friendLikePageItem}>
                                <Image source={{ uri: friend.avatar_url }}
                                    style={styles.friendLikePageAvatar} />
                                <View style={{
                                    width: SCREEN_WIDTH - 30 - 50 - 30,
                                    paddingHorizontal: 10
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: '500'
                                    }}>{friend.name}</Text>
                                </View>
                                <View style={{
                                    width: 30
                                }}>
                                    <FontAwesome5Icon name="facebook-messenger"
                                        color="#333" size={24} />
                                </View>
                            </ExTouchableOpacity>
                        ))}
                    </View>
                    <ExTouchableOpacity style={styles.btnSeeAll}>
                        <Text style={{
                            fontWeight: "500",
                            marginRight: 5,
                        }}>See all friends</Text>
                        <FontAwesome5Icon name="chevron-right" />
                    </ExTouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    topFansWrapper: {
        backgroundColor: '#fff',
        marginTop: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    topFanTitle: {
        marginHorizontal: 15,
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        borderBottomColor: '#ddd'

    },
    fansWrapper: {
        padding: 15
    },
    fanItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    fanAvatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderColor: '#333',
        borderWidth: 0.2
    },
    btnSeeAll: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        flexDirection: 'row'
    },
    statisticWrapper: {
        backgroundColor: '#fff',
        marginVertical: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    statistic: {
        flexDirection: 'row',
        padding: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    statisticItem: {
        width: (SCREEN_WIDTH - 30) / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inviteFriends: {
        alignItems: 'center',
        padding: 20,
    },
    inviteBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    },
    inviteBtn: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5
    },
    friendsWrapper: {
        flexDirection: 'row',
        marginVertical: 10
    },
    friendAvatar: {
        height: 30,
        width: 30,
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 2
    },
    friendsLikePageWrapper: {

        marginBottom: 10,
        paddingBottom: 0,
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    friendsLikePageTitle: {
        padding: 15,
        flexDirection: 'row'
    },
    friendLikePageList: {
        paddingHorizontal: 15,
    },
    friendLikePageItem: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: 10
    },
    friendLikePageAvatar: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
})
