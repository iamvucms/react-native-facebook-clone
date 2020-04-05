import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { navigation } from '../../rootNavigation'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SCREEN_WIDTH } from '../../constants'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowMore: false
        }
        this._maxOptionsHeight = 9 * 50
        this._moreOptionsHeight = new Animated.Value(0)
    }
    onPressViewMyProfileHandler() {
        navigation.navigate('Profile')
    }
    onPressFullFriendsHandler() {
        const { friends } = this.props
        navigation.navigate('FullFriends', { friends })
    }
    onPressWatchVideoHandler() {
        navigation.navigate('Watch')
    }
    onPressGroupsHandler() {
        navigation.navigate('Group')
    }
    onpressFriendAroundHandler() {
        navigation.navigate('FindFriends')
    }
    onPressMarketplaceHandler() {
        navigation.navigate('Marketplace')
    }
    onPressToggleShowHandler() {
        if (this.state.isShowMore) {
            Animated.timing(this._moreOptionsHeight, {
                toValue: 0,
                duration: 400
            }).start()
        } else Animated.timing(this._moreOptionsHeight, {
            toValue: this._maxOptionsHeight,
            duration: 600
        }).start()
        this.setState({
            ...this.state,
            isShowMore: !this.state.isShowMore
        })
    }
    render() {
        const { user } = this.props
        const { isShowMore } = this.state
        return (
            <View style={styles.container}>
                <ScrollView bounces={false}>
                    <ExTouchableOpacity style={styles.btnProfile} onPress={this.onPressViewMyProfileHandler}>
                        <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
                        <View>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={{ color: '#333' }}>View your profile page</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity onPress={this.onPressWatchVideoHandler} style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/video.png')} />
                        <View>
                            <Text style={styles.name}>Video on facebook</Text>
                            <Text style={{ color: '#333' }}>X+ new videos</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/bookmark.png')} />
                        <View>
                            <Text style={styles.name}>Saved</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/live-news.png')} />
                        <View>
                            <Text style={styles.name}>Live video</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity onPress={this.onPressFullFriendsHandler.bind(this)} style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/friendship.png')} />
                        <View>
                            <Text style={styles.name}>Friends</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity onPress={this.onPressGroupsHandler} style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/group.png')} />
                        <View>
                            <Text style={styles.name}>Groups</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity onPress={this.onPressMarketplaceHandler} style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/marketplace.png')} />
                        <View>
                            <Text style={styles.name}>Marketplace</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/calendar.png')} />
                        <View>
                            <Text style={styles.name}>Events</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/history.png')} />
                        <View>
                            <Text style={styles.name}>Past</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/article.png')} />
                        <View>
                            <Text style={styles.name}>Pages</Text>
                            <Text style={{ color: '#333' }}>X+ new pages</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity onPress={this.onpressFriendAroundHandler} style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/planet.png')} />
                        <View>
                            <Text style={styles.name}>Friends around here</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/controller.png')} />
                        <View>
                            <Text style={styles.name}>Play game</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/job.png')} />
                        <View>
                            <Text style={styles.name}>Jobs</Text>
                        </View>
                    </ExTouchableOpacity>
                    <TouchableOpacity style={styles.btnOption} onPress={this.onPressToggleShowHandler.bind(this)}>
                        <Image style={styles.icon} source={require('../../assets/icons/more-options.png')} />
                        <View style={styles.centerBtnShowMore}>
                            <Text style={styles.name}>{isShowMore ? "Hide" : "Show More"}</Text>
                        </View>
                        <FontAwesome5Icon style={{ alignContent: 'center' }} name={isShowMore ? "chevron-up" : "chevron-down"} size={20} color="#333" />
                    </TouchableOpacity>
                    <Animated.View style={{ ...styles.moreOptionsWrapper, height: this._moreOptionsHeight, overflow: 'hidden' }}>
                        <ExTouchableOpacity style={styles.btnOption} >
                            <Image style={styles.icon} source={require('../../assets/icons/recommendation.png')} />
                            <View>
                                <Text style={styles.name}>Recommendation</Text>
                            </View>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.btnOption} >
                            <Image style={styles.icon} source={require('../../assets/icons/time.png')} />
                            <View>
                                <Text style={styles.name}>Recent</Text>
                            </View>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.btnOption} >
                            <Image style={styles.icon} source={require('../../assets/icons/wallet.png')} />
                            <View>
                                <Text style={styles.name}>Send or request send money</Text>
                            </View>
                        </ExTouchableOpacity>

                        <ExTouchableOpacity style={styles.btnOption} >
                            <Image style={styles.icon} source={require('../../assets/icons/speaker.png')} />
                            <View>
                                <Text style={styles.name}>Advertisement</Text>
                            </View>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.btnOption} >
                            <Image style={styles.icon} source={require('../../assets/icons/nature.png')} />
                            <View>
                                <Text style={styles.name}>Weather</Text>
                            </View>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.btnOption} >
                            <Image style={styles.icon} source={require('../../assets/icons/wifi-connection.png')} />
                            <View>
                                <Text style={styles.name}>Find wifi</Text>
                            </View>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.btnOption} >
                            <Image style={styles.icon} source={require('../../assets/icons/heart.png')} />
                            <View>
                                <Text style={styles.name}>Fundraising</Text>
                            </View>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.btnOption} >
                            <Image style={styles.icon} source={require('../../assets/icons/flammable.png')} />
                            <View>
                                <Text style={styles.name}>Emergency response</Text>
                            </View>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.btnOption} >
                            <Image style={styles.icon} source={require('../../assets/icons/key.png')} />
                            <View>
                                <Text style={styles.name}>Request from device</Text>
                            </View>
                        </ExTouchableOpacity>
                    </Animated.View>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/question-mark.png')} />
                        <View>
                            <Text style={styles.name}>Help & Support</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/gear.png')} />
                        <View>
                            <Text style={styles.name}>Setting & Privacy</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnOption} >
                        <Image style={styles.icon} source={require('../../assets/icons/logout.png')} />
                        <View>
                            <Text style={styles.name}>Logout    </Text>
                        </View>
                    </ExTouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user,
        friends: state.user.friends
    }
}
export default connect(mapStateToProps, null)(index);
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    btnProfile: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    btnOption: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: 32,
        marginRight: 10,
        borderColor: '#333',
        borderWidth: 0.2
    },
    icon: {
        height: 24,
        resizeMode: 'contain',
        marginRight: 10
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    centerBtnShowMore: {
        width: SCREEN_WIDTH - 100
    }
})
