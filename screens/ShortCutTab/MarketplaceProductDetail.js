import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ScrollView, Animated, TextInput, Button, TouchableOpacity } from 'react-native'
import { STATUSBAR_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants'
import SwiperImages from '../../components/SwiperImages'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { navigation } from '../../rootNavigation'
import { IntlProvider, FormattedNumber } from 'react-intl'
export default class MarketplaceProductDetail extends Component {
    constructor(props) {
        super(props)
        this._titleOpacity = new Animated.Value(0)
        this.state = {
            isOverLimitY: false
        }
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onPressViewProfileHandler() {
        const { item } = this.props.route.params
        navigation.push('ProfileX', {
            userId: item.user.id
        })
    }
    onPressViewGroupDetailHandler(id) {
        navigation.push('GroupProfile', {
            id
        })
    }
    onScrollHandler({ nativeEvent }) {
        const offsetY = nativeEvent.contentOffset.y
        if (offsetY > 450) {
            if (!this.state.isOverLimitY) {
                this.setState({
                    ...this.state,
                    isOverLimitY: true
                })
            }
        } else {
            if (this.state.isOverLimitY) {
                this.setState({
                    ...this.state,
                    isOverLimitY: false
                })
            }
        }
        this._titleOpacity.setValue(offsetY / 450)
    }
    render() {
        const { item } = this.props.route.params
        return (
            <View style={styles.container}>
                <View style={styles.statusBar} >

                </View>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler}
                        style={{ ...styles.btnBack, backgroundColor: this.state.isOverLimitY ? '#ddd' : '#fff' }}>
                        <FontAwesome5Icon name="arrow-left" size={16} />
                    </ExTouchableOpacity>
                    <Animated.View style={{ ...styles.hiddenTitle, opacity: this._titleOpacity }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '500' }}>{item.title}</Text>
                    </Animated.View>
                </View>

                <ScrollView
                    scrollEventThrottle={60}
                    onScroll={this.onScrollHandler.bind(this)}
                    style={styles.wrapper}
                    bounces={false}
                >
                    <SwiperImages images={item.images} />
                    <View style={styles.infoWrapper}>
                        <View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>{item.title}</Text>
                            <IntlProvider textComponent={Text} locale="en">
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: '500', marginVertical: 10
                                }}><FormattedNumber value={item.price} /> VND</Text>
                            </IntlProvider>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '500', color: '#333'
                            }}>Posted at {item.create_at} in {item.sell_in}</Text>
                        </View>
                        <View style={styles.messengerBox}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10
                            }}>
                                <FontAwesome5Icon
                                    size={20}
                                    name="facebook-messenger"
                                    color="#318bfb" />
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    marginHorizontal: 5
                                }}>Send message to seller</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput value="Is this item still available?" style={styles.msgInput} />
                                <TouchableOpacity
                                    style={styles.btnSend}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.optionsWrapper}>
                            <TouchableOpacity style={styles.btnOption}>
                                <View style={styles.optionIcon}>
                                    <FontAwesome5Icon
                                        name="facebook-messenger" size={24} />
                                </View>
                                <Text style={{ fontWeight: 'bold' }}>Message</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnOption}>
                                <View style={styles.optionIcon}>
                                    <FontAwesome5Icon
                                        name="bookmark" size={24} />
                                </View>
                                <Text style={{ fontWeight: 'bold' }}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnOption}>
                                <View style={styles.optionIcon}>
                                    <FontAwesome5Icon
                                        name="share" size={24} />
                                </View>
                                <Text style={{ fontWeight: 'bold' }}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnOption}>
                                <View style={styles.optionIcon}>
                                    <FontAwesome5Icon
                                        name="ellipsis-h" size={24} />
                                </View>
                                <Text style={{ fontWeight: 'bold' }}>More</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userInfoWrapper}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    Information about seller
                                </Text>
                                <ExTouchableOpacity onPress={this.onPressViewProfileHandler.bind(this)}>
                                    <Text style={{
                                        color: '#318bfb',
                                        fontSize: 16,
                                        fontWeight: '500'
                                    }}>View profile</Text>
                                </ExTouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 10
                            }}>
                                <Image style={styles.avatar} source={{ uri: item.user.avatar_url }} />
                                <Text style={{
                                    width: SCREEN_WIDTH - 30 - 62 - 50,
                                    paddingHorizontal: 10,
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}>{item.user.name}</Text>
                                <TouchableOpacity style={styles.btnFollow}>
                                    <Text style={{ fontWeight: '600' }}>Follow</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            paddingVertical: 10,
                            borderBottomColor: '#ddd',
                            borderBottomWidth: 0.5
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 5
                            }}>
                                <View style={{ width: 20 }}>
                                    <FontAwesome5Icon name="map-marker-alt"
                                        color="#333" size={16} />
                                </View>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 16, fontWeight: '500'
                                }}>Live in {item.user.live_in}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 5
                            }}>
                                <View style={{ width: 20 }}>
                                    <FontAwesome5Icon name="briefcase"
                                        color="#333" size={16} />
                                </View>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 16, fontWeight: '500'
                                }}>Work in {item.user.work_at}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 5
                            }}>
                                <View style={{ width: 20 }}>
                                    <FontAwesome5Icon name="graduation-cap"
                                        color="#333" size={16} />
                                </View>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 16, fontWeight: '500'
                                }}>Learnt at {item.user.learn_at}</Text>
                            </View>
                        </View>
                        <View style={{
                            paddingVertical: 10,
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#ddd'
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Detail</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                height: 40,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '600'
                                }}>Name</Text>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                    color: '#333'
                                }}>{item.title}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                height: 40,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '600'
                                }}>Status</Text>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                    color: '#333'
                                }}>{item.statusTxt}</Text>
                            </View>
                        </View>
                        <View style={{
                            paddingVertical: 10,
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#ddd'
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 20
                            }}>
                                Description</Text>
                            <Text style={{
                                fontSize: 16,
                                marginTop: 10,
                                fontWeight: '500'
                            }}>{item.description}</Text>
                        </View>
                        <View style={styles.relatedGroupsWrapper}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Related Groups</Text>
                            {item.relatedGroups.map((group, index) => (
                                <ExTouchableOpacity
                                    onPress={this.onPressViewGroupDetailHandler.bind(null, group.id)}
                                    key={index} style={styles.relatedGroupItem}>
                                    <Image style={styles.groupAvatar} source={{ uri: group.avatar_url }} />
                                    <View style={{
                                        width: SCREEN_WIDTH - 30 - 40 - 50,
                                        paddingHorizontal: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '600'
                                        }}>{group.name}</Text>
                                        <Text>{group.member > 1000
                                            ? Math.round(group.member / 1000) + 'k'
                                            : group.member} members</Text>
                                    </View>
                                    <TouchableOpacity style={styles.btnJoin}>
                                        <Text style={{ fontWeight: 'bold' }}>Join</Text>
                                    </TouchableOpacity>
                                </ExTouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    navigationBar: {
        position: 'absolute',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        left: 0,
        top: STATUSBAR_HEIGHT,
        zIndex: 2,
    },
    hiddenTitle: {
        position: 'absolute',
        width: '100%',
        height: 50,
        left: 0,
        top: 0,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        paddingLeft: 40 + 20,
        backgroundColor: '#fff'
    },
    btnBack: {
        marginLeft: 10,
        zIndex: 2,
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        height: SCREEN_HEIGHT - STATUSBAR_HEIGHT
    },
    infoWrapper: {
        padding: 15
    },
    messengerBox: {
        marginVertical: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    msgInput: {
        height: 36,
        paddingHorizontal: 15,
        width: SCREEN_WIDTH - 30 - 20 - 46 - 10,
        fontWeight: '500',
        borderRadius: 36,
        backgroundColor: '#ddd'
    },
    btnSend: {
        backgroundColor: '#318bfb',
        height: 36,
        width: 46,
        marginLeft: 10,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center'
    },
    optionsWrapper: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    btnOption: {
        width: 62,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15
    },
    optionIcon: {
        backgroundColor: '#ddd',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    btnFollow: {
        backgroundColor: '#ddd',
        height: 32,
        width: 62,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    relatedGroupsWrapper: {
        paddingVertical: 10
    },
    relatedGroupItem: {
        flexDirection: 'row',
        marginVertical: 10
    },
    groupAvatar: {
        height: 40,
        width: 40,
        borderWidth: 0.2,
        borderColor: '#333',
        borderRadius: 5
    },
    btnJoin: {
        backgroundColor: '#ddd',
        height: 32,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})
