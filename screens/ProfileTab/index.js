import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { SCREEN_WIDTH } from '../../constants'
import * as navigation from '../../rootNavigation'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import PostTool from '../../components/PostTool'
import FriendsShowing from '../../components/FriendsShowing'
import HighlightPhotos from '../../components/HighlightPhotos'
import ProfilePosts from '../../components/ProfilePosts'
class index extends PureComponent {
    constructor(props) {
        super(props)
    }
    onPressEditPublicInfoHandler() {
        const user = { ...this.props.user }
        const highlightPhotos = [...this.props.highlightPhotos]
        navigation.navigate("EditPublicInfo", {
            userInfo: user,
            highlightPhotos
        })
    }
    scrollToTop() {
        this.refs._scrollView.scrollTo({
            x: 0,
            y: 0,
            animated: true
        })
    }
    onPressAvatarOptionsHandler() {
        navigation.navigate('AvatarOptions')
    }
    onPressProfileSettingHandler(){
        navigation.navigate('ProfileSetting')
    }
    render() {
        const { user, highlightPhotos, profilePosts } = this.props
        if (!user.hasOwnProperty('id')) return <View></View>
        const friends = [...this.props.friends]
        return (
            <ScrollView ref="_scrollView" bounces={false} style={styles.container}>
                <View style={styles.infoWrapper}>
                    <View style={styles.avatarCoverWrapper}>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Image style={styles.cover} source={{ uri: user.cover_url }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnChangeCover}>
                            <FontAwesome5Icon size={18} name="camera" />
                        </TouchableOpacity>
                        <View style={styles.avatarWrapper}>
                            <TouchableOpacity activeOpacity={0.9}>
                                <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressAvatarOptionsHandler} style={styles.btnChangeAvatar}>
                                <FontAwesome5Icon size={18} name="camera" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.introWrapper}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.subName}>({user.subName})</Text>
                        <Text style={styles.introTxt}>{user.introTxt}</Text>
                        <View style={styles.introOptionsWrapper}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btnAddStory}>
                                <FontAwesome5Icon size={16} color="#fff" name="plus-circle" />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginLeft: 5 }}>Add to your story</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressProfileSettingHandler} activeOpacity={0.8} style={styles.btnOption}>
                                <FontAwesome5Icon size={20} color="#000" name="ellipsis-h" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.introListWrapper}>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="briefcase" />
                            <Text style={styles.introLineText}>
                                Work at <Text style={styles.introHightLight}>{user.work_at}</Text>
                            </Text>
                        </View>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="home" />
                            <Text style={styles.introLineText}>
                                Live in <Text style={styles.introHightLight}>{user.live_in}</Text>
                            </Text>
                        </View>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="map-marker-alt" />
                            <Text style={styles.introLineText}>
                                From <Text style={styles.introHightLight}>{user.from}</Text>
                            </Text>
                        </View>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="heart" />
                            <Text style={styles.introLineText}>
                                Relationship <Text style={styles.introHightLight}>{user.relationship}</Text>
                            </Text>
                        </View>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="rss" />
                            <Text style={styles.introLineText}>
                                Followed by <Text style={styles.introHightLight}>{user.follower} </Text>followers
                            </Text>
                        </View>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="github" />
                            <TouchableOpacity>
                                <Text style={styles.introLineText}>
                                    {user.links.github}
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="link" />
                            <TouchableOpacity>
                                <Text style={styles.introLineText}>
                                    {user.links.repl}
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.introLine}>
                            <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="ellipsis-h" />
                            <TouchableOpacity>
                                <Text style={styles.introLineText}>
                                    View more introductory information
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <HighlightPhotos photos={highlightPhotos} />
                    <View style={{ paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#ddd' }}>
                        <TouchableOpacity
                            onPress={this.onPressEditPublicInfoHandler.bind(this)}
                            activeOpacity={0.8}
                            style={styles.btnEditPublicDetail}>
                            <Text style={{ color: '#318bfb', fontSize: 16, fontWeight: '500' }}>Edit public info</Text>
                        </TouchableOpacity>
                    </View>
                    <FriendsShowing friends={friends} />
                </View>
                <PostTool />
                <ScrollView
                    alignItems="center"
                    bounces={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.navigationsWrapper}>
                    <TouchableOpacity style={styles.navigation}>
                        <FontAwesome5Icon style={styles.navigationIcon} color="#000" size={20} name="images" />
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Images</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigation}>
                        <FontAwesome5Icon style={styles.navigationIcon} color="#000" size={20} name="video" />
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Videos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navigation}>
                        <FontAwesome5Icon style={styles.navigationIcon} color="#000" size={20} name="calendar-week" />
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Life event</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.navigation, ...styles.lastNavigation }}>
                        <FontAwesome5Icon style={styles.navigationIcon} color="#000" size={20} name="music" />
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Music</Text>
                    </TouchableOpacity>
                </ScrollView >
                <ProfilePosts highLightPhotos={highlightPhotos} profilePosts={profilePosts}></ProfilePosts>
            </ScrollView>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user,
        highlightPhotos: state.user.highlightPhotos,
        friends: state.user.friends,
        profilePosts: state.user.posts
    }
}
export default connect(mapStateToProps, null)(index);
const styles = StyleSheet.create({
    container: {

    },
    infoWrapper: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    avatarCoverWrapper: {
        paddingBottom: 90,
        position: 'relative'
    },
    cover: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    avatarWrapper: {
        backgroundColor: '#000',
        position: 'absolute',
        borderRadius: 2000,
        left: (SCREEN_WIDTH - 30 - 180) / 2, //paddingHorizontal - avatarWidth
        bottom: 0
    },
    avatar: {
        height: 180,
        width: 180,
        borderRadius: 2000,
        borderColor: '#fff',
        borderWidth: 5
    },
    btnChangeCover: {
        backgroundColor: '#fff',
        position: 'absolute',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 2.5,
        bottom: 90 + 10,
        right: 10

    },
    btnChangeAvatar: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 50,
        width: 45,
        height: 45,
        borderWidth: 2.5,
        borderColor: '#fff',
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    introWrapper: {
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    name: {
        fontSize: 24,
        fontWeight: '500'
    },
    subName: {
        fontSize: 20,
        fontWeight: '500'
    },
    introTxt: {
        color: 'rgba(0,0,0,0.7)',
        marginTop: 10
    },
    introOptionsWrapper: {
        marginTop: 15,
        flexDirection: 'row'
    },
    btnAddStory: {
        backgroundColor: '#318bfb',
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 30 - 50 - 10, //paddingHorizontal optionBtnWidth, marginLeft
    },
    btnOption: {
        marginLeft: 10,
        borderRadius: 5,
        height: 40,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd'
    },
    introListWrapper: {
        paddingVertical: 10
    },
    introLine: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    introIcon: {
        width: 30,
    },
    introLineText: {
        fontSize: 16,
        fontWeight: '400'
    },
    introHightLight: {
        fontWeight: 'bold',
        fontSize: 16
    },
    highlightPhotosWrapper: {
        flexDirection: 'row',
        borderRadius: 10,
        flexWrap: 'wrap',
        overflow: 'hidden',
        justifyContent: 'space-between',
    },
    highLightPhoto: {
    },
    photo: {
        width: (SCREEN_WIDTH - 42) / 3,
        height: (SCREEN_WIDTH - 42) / 3
    },
    btnEditPublicDetail: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9dd0eb',
        width: '100%',
        height: 40,
        borderRadius: 5
    },
    friendsWrapper: {
        paddingVertical: 15
    },
    friendsBar: {
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnFindFriends: {
        paddingHorizontal: 10
    },
    friendGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    friendItem: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        marginBottom: 15
    },
    friendAvatar: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        height: (SCREEN_WIDTH - 30 - 20) / 3,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: '#333'
    },
    btnViewAllFriends: {
        width: '100%',
        borderRadius: 5,
        height: 40,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationsWrapper: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 15,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 100,
        width: SCREEN_WIDTH,
        paddingHorizontal: 10
    },
    navigation: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#ddd',
        borderRadius: 48,
        marginHorizontal: 5
    },
    lastNavigation: {
        marginRight: 25
    },
    navigationIcon: {
        width: 30,
        alignItems: "center"
    }
})
