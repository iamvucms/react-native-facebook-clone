import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { notificationTypes, SCREEN_WIDTH, reactionTypes } from '../../constants'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ExTouchableOpacity from '../ExTouchableOpacity';
import { navigation } from '../../rootNavigation';
import { connect } from 'react-redux'

class NotificationItem extends Component {
    constructor(props) {
        super(props)
    }
    onShowNotificationOptionsHandler(Description) {
        const { item } = this.props
        navigation.navigate('NotificationOptions', {
            notification: item,
            Description
        })
    }
    onPressNotificationHandler() {
        const { item, stories } = this.props
        const { user } = item
        switch (item.type) {
            case notificationTypes.ANYONE_ACCEPT_YOUR_FRIEND_REQUEST:
                navigation.navigate("ProfileX", {
                    userId: user.id
                })
                break
            case notificationTypes.ANYONE_ADD_TO_STORY:
                const userIds = stories.map(story => story.userId)
                navigation.navigate("StoryDetail", {
                    position: userIds.indexOf(user.id)
                })
                break
            case notificationTypes.ANYONE_ANSWER_YOUR_COMMENT:
                break
            case notificationTypes.ANYONE_ANSWER_YOUR_COMMENT_IN_GROUP:
                break
            case notificationTypes.ANYONE_COMMENT_POST_IN_GROUP_TOO:
                break
            case notificationTypes.ANYONE_COMMENT_POST_OF_ANYONE_TOO:
                break
            case notificationTypes.ANYONE_LIVE_STREAM:
                break
            case notificationTypes.ANYONE_REACT_YOUR_COMMENT:
                break
            case notificationTypes.ANYONE_REACT_YOUR_POST:
                navigation.navigate("PostDetail", {
                    id: item.post.id
                })
                break
            case notificationTypes.ANYONE_TAG_YOU_ON_POST_IN_GROUP:
                navigation.navigate("GroupProfile", {
                    id: item.group.id
                })
                break
            case notificationTypes.ANYONE_TAG_YOU_ON_POST_OF_ANYONE:
                navigation.navigate("PostDetail", {
                    id: item.post.id
                })
                break
            case notificationTypes.NEW_PHOTO_IN_GROUP:
                navigation.navigate("GroupProfile", {
                    id: item.group.id
                })
                break
            case notificationTypes.NEW_POST_IN_GROUP:
                navigation.navigate("GroupProfile", {
                    id: item.group.id
                })
                break
        }
    }
    render() {
        const { item } = this.props
        let displayAvatarUri, Description, icon;
        if (item.type === notificationTypes.NEW_PHOTO_IN_GROUP
            || item.type === notificationTypes.NEW_POST_IN_GROUP
        ) displayAvatarUri = item.group.avatar_url
        else displayAvatarUri = item.user.avatar_url
        let iconName, iconColor;
        switch (item.reactionType) {
            case reactionTypes.LIKE:
                iconName = 'thumbs-up'
                iconColor = '#318bfb'
                break
            case reactionTypes.LOVE:
                iconName = 'heart'
                iconColor = '#e8304a'
                break
            case reactionTypes.HAHA:
                iconName = 'grin-squint'
                iconColor = '#f7ca51'
                break
            case reactionTypes.WOW:
                iconName = 'surprise'
                iconColor = '#f7ca51'
                break
            case reactionTypes.SAD:
                iconName = 'sad-tear'
                iconColor = '#f7ca51'
                break
            case reactionTypes.ANGRY:
                iconName = 'angry'
                iconColor = '#dc4311'
                break
        }
        switch (item.type) {
            case notificationTypes.ANYONE_ACCEPT_YOUR_FRIEND_REQUEST:
                icon = {
                    name: 'user',
                    color: '#fff',
                    size: 14,
                    bgColor: '#318bfb'
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> accept your friend request.</Text>
                break
            case notificationTypes.ANYONE_ADD_TO_STORY:
                icon = {
                    name: 'image',
                    color: '#fff',
                    size: 14,
                    bgColor: '#318bfb'
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> added to my story.</Text>
                break
            case notificationTypes.ANYONE_ANSWER_YOUR_COMMENT:
                icon = {
                    name: 'comment-alt',
                    color: '#fff',
                    size: 14,
                    bgColor: '#63BE09'
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> replied your comment.</Text>
                break
            case notificationTypes.ANYONE_ANSWER_YOUR_COMMENT_IN_GROUP:
                icon = {
                    name: 'comment-alt',
                    color: '#fff',
                    size: 14,
                    bgColor: '#63BE09'
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> replied your comment in group <Text style={styles.hightlightTxt}>{item.group.name}</Text>.</Text>
                break
            case notificationTypes.ANYONE_COMMENT_POST_IN_GROUP_TOO:
                icon = {
                    name: 'comment-alt',
                    color: '#fff',
                    size: 14,
                    bgColor: '#318bfb'
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> commented in a post which you followed in group <Text style={styles.hightlightTxt}>{item.group.name}</Text> too.</Text>
                break
            case notificationTypes.ANYONE_COMMENT_POST_OF_ANYONE_TOO:
                icon = {
                    name: 'comment-alt',
                    color: '#fff',
                    size: 14,
                    bgColor: '#63BE09'
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> commented in <Text style={styles.hightlightTxt}>{item.ownUser?.name}</Text>'s post too.</Text>
                break
            case notificationTypes.ANYONE_LIVE_STREAM:
                icon = {
                    name: 'video',
                    color: '#fff',
                    size: 14,
                    bgColor: '#e8343d'
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> lived stream.</Text>
                break
            case notificationTypes.ANYONE_REACT_YOUR_COMMENT:

                icon = {
                    name: iconName,
                    color: iconColor,
                    size: 24,
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> and {item.remainingCount} another people react your comment.</Text>
                break
            case notificationTypes.ANYONE_REACT_YOUR_POST:
                icon = {
                    name: iconName,
                    color: iconColor,
                    size: 24,
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> and {item.remainingCount} another people react your post.</Text>
                break
            case notificationTypes.ANYONE_TAG_YOU_ON_POST_IN_GROUP:
                icon = {
                    name: 'comment-alt',
                    color: '#fff',
                    size: 14,
                    bgColor: '#63BE09'
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> tagged you in a comment in group <Text style={styles.hightlightTxt}>{item.group.name}</Text>.</Text>
                break
            case notificationTypes.ANYONE_TAG_YOU_ON_POST_OF_ANYONE:
                icon = {
                    name: 'comment-alt',
                    color: '#fff',
                    size: 14,
                    bgColor: '#63BE09'
                }
                Description = () => <Text style={styles.pureTxt}>
                    <Text style={styles.hightlightTxt}>{item.user.name}</Text> tagged you in a comment in <Text style={styles.hightlightTxt}>{item.ownUser?.name}</Text>'s post.</Text>
                break
            case notificationTypes.NEW_PHOTO_IN_GROUP:
                icon = {
                    name: 'users',
                    color: '#fff',
                    size: 14,
                    bgColor: '#318bfb'
                }
                Description = () => {
                    return <Text style={styles.pureTxt}>
                        <Text style={styles.hightlightTxt}>{item.user.name}</Text> post a new photo in group <Text style={styles.hightlightTxt}>{item.group.name}</Text>.</Text>
                }
                break
            case notificationTypes.NEW_POST_IN_GROUP:
                icon = {
                    name: 'users',
                    color: '#fff',
                    bgColor: '#318bfb'
                }
                Description = () => {
                    return <Text style={styles.pureTxt}>
                        <Text style={styles.hightlightTxt}>{item.user.name}</Text> post a new post in group <Text style={styles.hightlightTxt}>{item.group.name}</Text>.</Text>
                }
                break
        }
        return (
            <View style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                <ExTouchableOpacity
                    onPress={this.onPressNotificationHandler.bind(this)}
                    onLongPress={this.onShowNotificationOptionsHandler.bind(this, Description)}
                    style={{ ...styles.container, backgroundColor: item.isSeen ? '#fff' : '#edf2fa' }}>
                    <ImageBackground imageStyle={{ borderRadius: 64 }} style={styles.avatar} source={{ uri: displayAvatarUri }}>
                        <View style={{ ...styles.notificationIcon, backgroundColor: icon.bgColor }}>
                            <FontAwesome5Icon name={icon.name} size={icon.size} color={icon.color} />
                        </View>
                    </ImageBackground>
                    <View style={styles.contentWrapper}>
                        <Description />
                        <Text style={{ color: '#333' }}>{item.create_at}</Text>
                    </View>
                    <ExTouchableOpacity onPress={this.onShowNotificationOptionsHandler.bind(this, Description)} style={styles.btnOptions}>
                        <FontAwesome5Icon name="ellipsis-h" />
                    </ExTouchableOpacity>
                </ExTouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        stories: state.stories
    }
}
export default connect(mapStateToProps, null)(NotificationItem)
const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    avatar: {
        height: 64,
        width: 64,
        position: 'relative',
        borderRadius: 64,
        borderColor: "#ddd",
        borderWidth: 0.5,
    },
    contentWrapper: {
        width: SCREEN_WIDTH - 40 - 30 - 64,
        paddingHorizontal: 10
    },
    mainContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    btnOptions: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignContent: 'center'
    },
    pureTxt: {
        fontSize: 16,
    },
    hightlightTxt: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    notificationIcon: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        height: 25,
        width: 25,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
