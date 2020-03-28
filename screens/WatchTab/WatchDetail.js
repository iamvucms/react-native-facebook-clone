import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Animated } from 'react-native'
import Modal from 'react-native-modal'
import { connect, useSelector } from 'react-redux'
import { FetchWatchVideoDetailRequest, SetCurrentWatchingPosition } from '../../actions/watchVideosActions'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
import { Video } from 'expo-av'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
class WatchDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDisplay: 'none',
            videoSize: {},
            maxTimeString: ""
        }
        this._maxPositionMillis = 0
        this._currentPositionMillis = 0
        this._offsetXTimePoint = 0
        this._isLiked = { isLiked: false }
        this.optionBottom = new Animated.Value(-screenHeight)
        this._videoRef = {}
        this._handleVideoRef = component => {
            if (!component) return;
            this._videoRef = component;
        }
        this._isPaused = false
        this._playBtnOpacity = new Animated.Value(0)
        this._currentVideoPosition = new Animated.Value(0)
        this._isDraggingTimePoint = false
        this._startDraggingPosition = 0
    }
    componentDidMount() {
        const { id } = this.props.route.params
        const { fetchWatchVideoDetail } = this.props
        fetchWatchVideoDetail(id)
    }
    onPressOptionIconHandler() {
        Animated.timing(this.optionBottom, {
            toValue: 0,
            duration: 300
        }).start()
    }
    onPressProfileLinkHandler() {

    }
    onPressCommentsHandler() {
        const { watchingVideo } = this.props
        const { comments } = watchingVideo
        navigation.navigate('CommentsPopUp', {
            comments
        })
    }
    onPressHideDetailWrapperHandler() {
        this.setState({
            ...this.state,
            detailDisplay: this.state.detailDisplay === 'flex' ? 'none' : 'flex'
        })
    }
    onPressBackdropOptionListHandler() {
        Animated.timing(this.optionBottom, {
            toValue: -screenHeight,
            duration: 400
        }).start()
    }
    onReadyForDisplay({ naturalSize, status }) {
        if (this._videoRef.hasOwnProperty("_nativeRef")) this._videoRef.replayAsync()
        this._offsetXTimePoint = this._currentVideoPosition.interpolate({
            inputRange: [0, status.durationMillis],
            outputRange: [0, maxTimeBarWidth]
        })
        this._maxPositionMillis = status.durationMillis
        const maxSeconds = Math.round(this._maxPositionMillis / 1000)
        const hours = Math.floor(maxSeconds / 3600) >= 10 ? Math.floor(maxSeconds / 3600) : `0${Math.floor(maxSeconds / 3600)}`
        const minutes = Math.floor((maxSeconds - hours * 3600) / 60) >= 10 ? Math.floor((maxSeconds - hours * 3600) / 60) : `0${Math.floor((maxSeconds - hours * 3600) / 60)}`
        const minutes2 = Math.floor(maxSeconds / 60) >= 10 ? Math.floor(maxSeconds / 60) : `0${Math.floor(maxSeconds / 60)}`
        const second = maxSeconds - hours * 3600 - minutes * 60 >= 10 ? maxSeconds - hours * 3600 - minutes * 60 : `0${maxSeconds - hours * 3600 - minutes * 60}`
        const second2 = maxSeconds - minutes2 * 60 >= 10 ? maxSeconds - minutes2 * 60 : `0${maxSeconds - minutes2 * 60}`
        const maxTimeString = maxSeconds >= 3600 ? `${hours}:${minutes}:${second}`
            : `${minutes2}:${second2}`

        this.setState({
            ...this.state,
            videoSize: naturalSize,
            maxTimeString: maxTimeString
        })
    }
    onPressTogglePlayVideoHandler() {
        if (this._isPaused) {
            this._videoRef.playAsync()
            this._playBtnOpacity.setValue(0)
            this._isPaused = false
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    detailDisplay: 'none'
                })
            }, 2000)
        } else {
            this._videoRef.pauseAsync()
            this._playBtnOpacity.setValue(1)
            this._isPaused = true
        }
    }
    onPlaybackStatusUpdateHandler(status) {
        this._currentPositionMillis = status.positionMillis
        if (!this._isDraggingTimePoint) {
            this._currentVideoPosition.setValue(status.positionMillis)
            const { setCurrentWatchingPosition } = this.props
            setCurrentWatchingPosition(status.positionMillis)
        }
    }
    onGestureEventHandler({ nativeEvent }) {
        const { translationX } = nativeEvent
        let nextPositionMillis = this._startDraggingPosition + translationX / maxTimeBarWidth * this._maxPositionMillis
        nextPositionMillis = nextPositionMillis < 0 ? 0 : (nextPositionMillis > this._maxPositionMillis ? this._maxPositionMillis : nextPositionMillis)
        this._currentVideoPosition.setValue(nextPositionMillis)
        const { setCurrentWatchingPosition } = this.props
        setCurrentWatchingPosition(nextPositionMillis)

    }
    onHandlerStateChangeHandler({ nativeEvent }) {
        const { state, translationX } = nativeEvent
        if (state === State.END) {
            let nextPositionMillis = this._startDraggingPosition + translationX / maxTimeBarWidth * this._maxPositionMillis
            nextPositionMillis = nextPositionMillis < 0 ? 0 : (nextPositionMillis > this._maxPositionMillis ? this._maxPositionMillis : nextPositionMillis)
            this._videoRef.setPositionAsync(nextPositionMillis)
            this._isDraggingTimePoint = false
        } else if (state === State.BEGAN) {
            this._startDraggingPosition = this._currentPositionMillis
            this._isDraggingTimePoint = true
        }
    }
    onPressTimeBarHandler({ nativeEvent }) {
        const { locationX } = nativeEvent
        const nextPositionMillis = locationX / maxTimeBarWidth * this._maxPositionMillis
        if (nextPositionMillis < 0) this._videoRef.setPositionAsync(0)
        else if (nextPositionMillis > this._maxPositionMillis) this._videoRef.setPositionAsync(this._maxPositionMillis)
        else this._videoRef.setPositionAsync(nextPositionMillis)
    }
    onPressReactionValueHandler() {

    }
    render() {
        const playBtnOpacity = this._playBtnOpacity
        const pauseBtnOpacity = this._playBtnOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        })
        const { watchingVideo } = this.props
        const { videoSize, maxTimeString } = this.state
        const playedBarWidth = this._playedBarWidth
        const fixedVideoHeight = videoSize.hasOwnProperty('height') ? SCREEN_WIDTH / videoSize.width * videoSize.height : 0
        const videoWrapperOffsetTop = (SCREEN_HEIGHT - fixedVideoHeight) / 2
        if (!watchingVideo.hasOwnProperty("id")) return <View></View>
        let reactionValue = 0;
        for (let emoji in watchingVideo.reactions) {
            reactionValue += watchingVideo.reactions[emoji];
        }
        const optionBottom = this.optionBottom
        return (
            <TouchableWithoutFeedback onPress={this.onPressHideDetailWrapperHandler.bind(this)}>
                <View style={styles.postWrapper}>
                    <View style={{ ...styles.videoWrapper, top: videoWrapperOffsetTop }}>
                        <Video
                            progressUpdateIntervalMillis={250}
                            onPlaybackStatusUpdate={this.onPlaybackStatusUpdateHandler.bind(this)}
                            ref={this._handleVideoRef}
                            onReadyForDisplay={this.onReadyForDisplay.bind(this)}
                            style={{
                                ...styles.video, width: SCREEN_WIDTH,
                                height: fixedVideoHeight
                            }}
                            source={{ uri: watchingVideo.video.video_url }}>
                        </Video>
                    </View>
                    <Animated.View style={{ ...styles.optionListWrapper, bottom: optionBottom }}>
                        <View style={styles.optionBackDrop}>
                            <TouchableOpacity onPress={this.onPressBackdropOptionListHandler.bind(this)} style={{ width: "100%", height: "100%" }}>
                                <View></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.allOptionWrapper}>
                            <TouchableOpacity>
                                <View style={styles.optionItemWrapper}>
                                    <Text style={styles.optionText}>Auto</Text>
                                    <Text style={{ fontSize: 12, color: '#333' }}>Always choose best quality</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.optionItemWrapper}>
                                    <Text style={styles.optionText}>720p</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.optionItemWrapper}>
                                    <Text style={styles.optionText}>360p</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <View style={{ ...styles.postContentWrapper, display: this.state.detailDisplay }}>
                        <View style={styles.infoWrapper}>
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
                        </View>
                        <View style={{
                            ...styles.videoToolWrapper, height: fixedVideoHeight / 2 + 35,
                            top: videoWrapperOffsetTop + fixedVideoHeight / 2 - 35
                        }}>
                            <View style={styles.btnControlWrapper}>
                                <TouchableOpacity style={{ height: 75, width: 60 }}
                                    onPress={this.onPressTogglePlayVideoHandler.bind(this)}>
                                    <Animated.View style={{ position: 'absolute', opacity: pauseBtnOpacity }}>
                                        <FontAwesome5Icon name="pause-circle" size={60} color="#fff" />
                                    </Animated.View>
                                    <Animated.View style={{ opacity: playBtnOpacity }}>
                                        <FontAwesome5Icon name="play-circle" size={60} color="#fff" />
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.videoToolBar}>
                                <View style={styles.timeBar}>
                                    <CurrentTimeText style={styles.currentTime} />
                                    <TouchableOpacity onPress={this.onPressTimeBarHandler.bind(this)} activeOpacity={1} style={styles.timingBar}>
                                        <TouchableOpacity activeOpacity={1}>
                                            <PanGestureHandler
                                                onHandlerStateChange={this.onHandlerStateChangeHandler.bind(this)}
                                                onGestureEvent={this.onGestureEventHandler.bind(this)}>
                                                <Animated.View style={{ ...styles.btnTimeControl, left: this._offsetXTimePoint }}></Animated.View>
                                            </PanGestureHandler>
                                        </TouchableOpacity>
                                        <Animated.View style={{ ...styles.playedBar, width: this._offsetXTimePoint }}></Animated.View>
                                    </TouchableOpacity>
                                    <Text style={styles.maxTime}>
                                        {maxTimeString}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={this.onPressOptionIconHandler.bind(this)} style={styles.btnSetting}>
                                    <FontAwesome5Icon name="cog" color="#fff" size={20}>

                                    </FontAwesome5Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.reactionsWrapper}>
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
                        </View>
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
        fetchWatchVideoDetail: (id) => dispatch(FetchWatchVideoDetailRequest(id)),
        setCurrentWatchingPosition: (position) => dispatch(SetCurrentWatchingPosition(position))
    }
}
const maxTimeBarWidth = SCREEN_WIDTH - 40 - 100 - 20 - 7.5
const screenHeight = Math.round(Dimensions.get('window').height);
export default connect(mapStateToProps, mapDispatchToProps)(WatchDetail)
const CurrentTimeText = (props) => {
    const position = useSelector(state => state.watch.currentWatchTimePosition)
    const maxSeconds = Math.round(position / 1000)
    const hours = Math.floor(maxSeconds / 3600) >= 10 ? Math.floor(maxSeconds / 3600) : `0${Math.floor(maxSeconds / 3600)}`
    const minutes = Math.floor((maxSeconds - hours * 3600) / 60) >= 10 ? Math.floor((maxSeconds - hours * 3600) / 60) : `0${Math.floor((maxSeconds - hours * 3600) / 60)}`
    const minutes2 = Math.floor(maxSeconds / 60) >= 10 ? Math.floor(maxSeconds / 60) : `0${Math.floor(maxSeconds / 60)}`
    const second = maxSeconds - hours * 3600 - minutes * 60 >= 10 ? maxSeconds - hours * 3600 - minutes * 60 : `0${maxSeconds - hours * 3600 - minutes * 60}`
    const second2 = maxSeconds - minutes2 * 60 >= 10 ? maxSeconds - minutes2 * 60 : `0${maxSeconds - minutes2 * 60}`
    const maxTimeString = maxSeconds >= 3600 ? `${hours}:${minutes}:${second}`
        : `${minutes2}:${second2}`
    return <Text {...props}>{maxTimeString}</Text>
}
const styles = StyleSheet.create({
    postWrapper: {
        width: '100%',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,1)',
        height: SCREEN_HEIGHT
    },
    optionIconWrapper: {
        position: 'absolute',
        right: 30,
        top: 50,
        zIndex: 999999,
    },
    cycleWrapper: {
        padding: 10
    },

    optionListWrapper: {
        position: 'absolute',
        left: 0,
        height: "100%",
        zIndex: 999999,
        backgroundColor: "rgba(0,0,0,0)",
        width: "100%"
    },
    allOptionWrapper: {
        backgroundColor: "#fff",
        padding: 20,
        position: 'absolute',
        bottom: 0,
        width: "100%",
        zIndex: 2
    },
    optionBackDrop: {
        // backgroundColor: "red",
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: "100%",
        width: "100%"
    },
    optionItemWrapper: {
        paddingVertical: 15,
        justifyContent: 'center'
    },
    optionText: {
        fontSize: 16
    },
    postContentWrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: "100%",
        height: "100%",
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    infoWrapper: {
        position: 'absolute',
        top: 44 + 50,
        left: 0,
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
    videoToolWrapper: {
        position: 'absolute',
        left: 0,
        width: '100%'
    },
    btnControlWrapper: {
        alignItems: 'center'
    },
    videoToolBar: {
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        alignItems: 'center'
    },
    timeBar: {
        flexDirection: 'row',
        width: SCREEN_WIDTH - 40,
        alignItems: 'center'
    },
    currentTime: {
        color: '#fff',
        fontWeight: '500',
        width: 50,
        textAlign: 'center'
    },
    timingBar: {
        position: 'relative',
        width: SCREEN_WIDTH - 40 - 100 - 20,
        height: 5,
        marginHorizontal: 10,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    playedBar: {
        height: 5,
        left: 0,
        top: 0,
        backgroundColor: '#318bfb',
        zIndex: 1
    },
    btnTimeControl: {
        zIndex: 2,
        width: 15,
        height: 15,
        borderRadius: 50,
        position: 'absolute',
        top: -(15 - 5) / 2,
        backgroundColor: '#fff'
    },
    maxTime: {
        color: '#fff',
        fontWeight: '500',
        width: 50,
        textAlign: 'center'
    },
    btnSetting: {
        width: 40,
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
