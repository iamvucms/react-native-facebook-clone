import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import ScaledImage from '../ScaledImage'
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { permission } from '../../constants'
import VideoController from './VideoController'
import { connect } from 'react-redux'
import { SetFixedHeighWatchingVideo } from '../../actions/videoControlActions'
class WatchItem extends Component {
    constructor(props) {
        super(props)
    }
    onPressHandle() {
        const { comments } = this.props.item
        navigation.navigate('CommentsPopUp', {
            comments
        })
    }
    onPressWatchOptionsIconHandler() {
        const { item } = this.props
        navigation.navigate('WatchOptions', {
            watchDetail: item
        })
    }
    onPressWatchVideoHandler(id, threadId) {
        navigation.navigate('WatchDetailList', {
            id,
            threadId
        })
    }
    onPressShareHandler() {
        const { item } = this.props
        navigation.navigate('SharePost', {
            id: item.id
        })
    }
    onLayoutHandler({ nativeEvent }) {
        const { setFixedHeighWatchingVideo } = this.props
        setFixedHeighWatchingVideo(nativeEvent.layout.height)
    }
    render() {
        const { item, user } = this.props
        return (
            <View onLayout={this.onLayoutHandler.bind(this)} style={styles.item}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.customListView}>
                        <Image style={styles.avatar} source={{ uri: item.page.avatar_url }}></Image>
                        <View style={styles.infoWrapper}>
                            <View style={styles.namesWrapper}>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.page.name}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.extraInfoWrapper}>
                                <Text style={{ color: '#333', fontSize: 14 }}>{item.create_at}</Text>
                                <Text style={{ fontSize: 16, marginHorizontal: 5 }}>·</Text>
                                {item.permission == permission.PUBLIC && (
                                    <FontAwesome5Icon color='#333' name="globe-asia" />
                                )}
                                {item.permission == permission.SETTING && (
                                    <FontAwesome5Icon color='#333' name="cogs" />
                                )}
                                {item.permission == permission.GROUP && (
                                    <FontAwesome5Icon color='#333' name="newspaper" />
                                )}
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.onPressWatchOptionsIconHandler.bind(this)} style={{ width: 25, alignItems: 'center' }}>
                        <Icon name="ellipsis-h" color="#000"></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.paragraph}>{item.content}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={this.onPressWatchVideoHandler.bind(this, item.id, item.watch_threadId)}>
                    <View style={styles.videoContainer}>
                        <VideoController item={item} />
                    </View>
                </TouchableOpacity>
                <View horizontal={true} style={styles.reactionContainer}>
                    <TouchableOpacity><Icon
                        name="thumbs-up"
                        color="#318bfb"
                        backgroundColor="#fff"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        name="heart"
                        color="#e8304a"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        name="grin-squint"
                        color="#f7ca51"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        name="surprise"
                        color="#f7ca51"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        name="sad-tear"
                        color="#f7ca51"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        lineBreakMode={false}
                        name="angry"
                        color="#dc4311"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressHandle.bind(this)}><Icon
                        lineBreakMode={false}
                        name="comment-alt"
                        color="gray"
                        backgroundColor="white"
                        style={{ ...styles.reactionIcon, fontSize: 14 }}
                    ><Text style={{ fontSize: 12 }}> {item.comments.length} comments</Text></Icon></TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressShareHandler.bind(this)} style={styles.shareIcon}><Icon name="share-alt"
                        color="gray" ><Text style={{ fontSize: 12, textAlignVertical: 'center' }}> Share</Text></Icon></TouchableOpacity>
                </View>
                <View style={styles.commentContainer}>
                    <Image source={{ uri: user.avatar_url }} style={styles.commentAvatar}></Image>
                    <View style={styles.commentInput}>
                        <TouchableOpacity onPress={this.onPressHandle.bind(this)} style={styles.commentInputWrapper}>
                            <Text>Comment...</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity><Icon style={styles.btnSendComment} name="paper-plane" color="gray"></Icon></TouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setFixedHeighWatchingVideo: (height) => dispatch(SetFixedHeighWatchingVideo(height))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WatchItem)
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    customListView: {
        padding: 15,
        width: screenWidth - 40,
        flexDirection: 'row'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    infoWrapper: {
        marginLeft: 8
    },
    namesWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    extraInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { height: 0, width: 0 },
        marginBottom: 10
    },
    commentInputWrapper: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: 15
    },
    paragraph: {

    },
    contentContainer: {
        paddingHorizontal: 15
    },
    videoContainer: {
        width: screenWidth,
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reactionContainer: {
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center'
    },
    reactionIcon: {
        fontSize: 20,
        padding: 10
    },
    shareIcon: {
        position: 'absolute',
        fontSize: 14,
        padding: 10,
        right: 0
    },
    commentContainer: {
        flexDirection: 'row',
        padding: 10,
        borderColor: "red",
        borderStyle: 'dashed',
        flexWrap: 'nowrap'
    },
    commentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    commentInput: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 20,
        marginLeft: 10,
        height: 30,
        width: screenWidth - 15 * 2 - 60,
    },
    btnSendComment: {
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30
    }
})