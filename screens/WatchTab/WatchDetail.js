import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Animated } from 'react-native'
import { connect, useSelector } from 'react-redux'
import { FetchWatchVideoDetailRequest, SetCurrentWatchingPosition } from '../../actions/watchVideosActions'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
import { Video } from 'expo-av'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import VideoPlayer from '../../components/VideoPlayer'
class WatchDetail extends Component {
    constructor(props) {
        super(props)
        this._videoRef = {}
        this._infoOpacity = new Animated.Value(1)
        this._isLiked = false
        this._isCalledGoBack = false
        this._isShowInfo = true
    }
    componentDidMount() {
        const { id } = this.props.route.params
        const { fetchWatchVideoDetail } = this.props
        fetchWatchVideoDetail(id)
    }

    onPressCommentsHandler() {
        const { watchingVideo } = this.props
        const { comments } = watchingVideo
        navigation.navigate('CommentsPopUp', {
            comments
        })
    }
    onPressHideDetailWrapperHandler() {
        console.log(Math.random())

        if (this._isShowInfo) {
            this._isShowInfo = false
            this._infoOpacity.setValue(0)
            this._videoRef.hideController()
        } else {
            this._isShowInfo = true
            this._infoOpacity.setValue(1)
            this._videoRef.showController()
        }
    }
    onShowControllerHandler() {
        this._infoOpacity.setValue(1)
        this._isShowInfo = true
    }
    onHideControllerHandler() {
        this._infoOpacity.setValue(0)
        this._isShowInfo = false
    }
    onPauseHandler() {
        // this._infoOpacity.setValue(1)
        // this._isShowInfo = true
    }
    onPlayHandler() {
        // this._infoOpacity.setValue(0)
        // this._videoRef.hideController()
    }
    onFinishHandler() {
        if (!this._isCalledGoBack) {
            navigation.goBack()
            this._isCalledGoBack = true
        }
    }
    onRefReadyHandler(ref) {
        this._videoRef = ref
    }
    render() {
        const { watchingVideo } = this.props
        if (!watchingVideo.hasOwnProperty("id")) return <View></View>
        let reactionValue = 0;
        for (let emoji in watchingVideo.reactions) {
            reactionValue += watchingVideo.reactions[emoji];
        }
        return (
            <TouchableWithoutFeedback onPress={this.onPressHideDetailWrapperHandler.bind(this)}>
                <View style={styles.postWrapper}>
                    <View style={{ ...styles.postContentWrapper }}>
                        <Animated.View style={{ ...styles.infoWrapper, opacity: this._infoOpacity }}>
                            <View style={styles.listItemInfoWrapper}>
                                <View style={styles.listItemInfo}>
                                    <Image style={styles.avatar} source={{ uri: watchingVideo.page.avatar_url }}></Image>
                                    <View>
                                        <TouchableOpacity>
                                            <Text style={styles.name}>{watchingVideo.page.name}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.time}>{watchingVideo.create_at}</Text>
                                    </View>
                                </View>
                                {!watchingVideo.isFollowed && (
                                    <ExTouchableOpacity style={styles.btnFollow}>
                                        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>FOLLOW</Text>
                                    </ExTouchableOpacity>
                                )}
                            </View>
                            <Text style={styles.content}>{watchingVideo.content}</Text>
                        </Animated.View>
                        <VideoPlayer
                            onRefReady={this.onRefReadyHandler.bind(this)}
                            videoId={watchingVideo.id}
                            onShowController={this.onShowControllerHandler.bind(this)}
                            onHideController={this.onHideControllerHandler.bind(this)}
                            isAutoToggleController={true}
                            shouldPlay={true}
                            source={{ uri: watchingVideo.video.video_url }}
                            onPause={this.onPauseHandler.bind(this)}
                            onPlay={this.onPlayHandler.bind(this)}
                            onFinish={this.onFinishHandler.bind(this)}
                            isCenterVertical={true}
                            containerStyle={{}}
                            watchingVideo={watchingVideo}
                            showController={true} />
                        <Animated.View style={{ ...styles.reactionsWrapper, opacity: this._infoOpacity }}>
                            <View style={styles.reactionValueWrapper}>
                                <TouchableOpacity >
                                    <View style={styles.reactionNumberWrapper}>
                                        <FontAwesome5Icon name="thumbs-up" color="#318bfb" size={14}>
                                        </FontAwesome5Icon>
                                        <Text style={{ color: '#fff', marginLeft: 5 }}>{reactionValue}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onPressCommentsHandler.bind(this)}>
                                    <Text style={{ color: '#fff' }}>{watchingVideo.comments.length} comments</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onPressCommentsHandler.bind(this)}>
                                    <Text style={{ color: '#fff' }}>
                                        {watchingVideo.seeCount > 1000 ? Math.round(watchingVideo.seeCount / 1000) + 'k' : watchingVideo.seeCount} views</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnReactionWrapper}>
                                <TouchableOpacity style={styles.btnWrapper} onPres={() => this._isLiked.isLiked = !this._isLiked.isLiked}>
                                    <View style={styles.reactionBtn}>
                                        <FontAwesome5Icon name="thumbs-up" color={!this._isLiked.isLiked ? '#fff' : '#318bfb'} size={20}>
                                        </FontAwesome5Icon>
                                        <Text style={styles.reactionBtnText}>Like</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnWrapper} onPress={this.onPressCommentsHandler.bind(this)}>
                                    <View style={styles.reactionBtn}>
                                        <FontAwesome5Icon name="comment-alt" color="#fff" size={20}>
                                        </FontAwesome5Icon>
                                        <Text style={styles.reactionBtnText}>Comment</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnWrapper} >
                                    <View style={styles.reactionBtn}>
                                        <FontAwesome5Icon name="share" color="#fff" size={20}>
                                        </FontAwesome5Icon>
                                        <Text style={styles.reactionBtnText}>Share</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        watchingVideo: state.watch.watchVideoDetail
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchWatchVideoDetail: (id) => dispatch(FetchWatchVideoDetailRequest(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WatchDetail)
const styles = StyleSheet.create({
    postWrapper: {
        width: '100%',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,1)',
        height: SCREEN_HEIGHT
    },
    postContentWrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: "100%",
        height: "100%",

    },
    infoWrapper: {
        marginTop: 44 + 50,
        width: '100%',
        paddingHorizontal: 15
    },
    listItemInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnFollow: {
        height: 30,
        borderRadius: 4,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderColor: 'rgba(255,255,255,0.8)',
        borderWidth: 0.5
    },
    listItemInfo: {
        flexDirection: 'row',
        marginBottom: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10
    },
    name: {
        fontWeight: 'bold',
        color: '#fff'
    },
    content: {
        color: '#fff'
    },
    time: {
        marginTop: 5,
        color: '#fff',
        fontSize: 12,
        textTransform: 'uppercase',
        opacity: 0.5,
    },

    btnControlWrapper: {
        alignItems: 'center'
    },
    reactionsWrapper: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        width: '100%'
    },
    btnReactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    reactionBtnText: {
        color: '#fff',
        marginLeft: 5
    },
    btnWrapper: {
        flex: 1
    },
    reactionBtn: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoWrapper: {
        position: 'absolute',
        left: 0
    },
    video: {
        backgroundColor: "rgba(0,0,0,0)",
    },
    reactionValueWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    reactionNumberWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    }

})
