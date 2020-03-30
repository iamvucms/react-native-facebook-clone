import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { connect, useSelector, useDispatch } from 'react-redux'
import { SetCurrentWatchingPosition, SetThreadWatchingStatus } from '../../actions/watchVideosActions'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
import { Video } from 'expo-av'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants'
import { PanGestureHandler, State, TouchableOpacity as TouchableOpacity2, TouchableWithoutFeedback } from 'react-native-gesture-handler'
class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videoSize: {},
            maxTimeString: ""
        }
        const { onRefReady } = props
        if (typeof onRefReady === 'function') onRefReady(this)
        //install context
        this.pause = this.pause.bind(this)
        this.play = this.play.bind(this)
        this.hideController = this.hideController.bind(this)
        this.showController = this.showController.bind(this)

        this._isShowController = false
        this._maxPositionMillis = 0
        this._currentPositionMillis = 0
        this._offsetXTimePoint = 0
        this._isLiked = { isLiked: false }
        this._optionRight = new Animated.Value(-SCREEN_WIDTH)
        this._videoRef = {}
        this._handleVideoRef = component => {
            if (!component) return;
            this._videoRef = component;
        }
        this._isPaused = !props.shouldPlay
        this._playBtnOpacity = new Animated.Value(0)
        this._currentVideoPosition = new Animated.Value(0)
        this._isDraggingTimePoint = false
        this._startDraggingPosition = 0
        this._isShowOptions = false
        this._zIndexController = new Animated.Value(-1)
    }
    componentDidMount() {
        const { setThreadWatchingStatus, videoId } = this.props
        if (this._isPaused) {
            setThreadWatchingStatus(videoId, false)
            this._playBtnOpacity.setValue(1)
        } else {
            setThreadWatchingStatus(videoId, true)
            this._playBtnOpacity.setValue(0)
        }
    }
    pause() {
        this._isPaused = true
        this._videoRef.pauseAsync()
        this._playBtnOpacity.setValue(1)
    }
    play() {
        this._isPaused = false
        this._videoRef.playAsync()
        this._playBtnOpacity.setValue(0)
    }
    showController() {
        this._isShowController = true
        this._zIndexController.setValue(1)
    }
    hideController() {
        this._isShowController = false
        this._zIndexController.setValue(-1)
    }
    onPressOptionIconHandler() {
        Animated.timing(this._optionRight, {
            toValue: 0,
            duration: 300
        }).start(() => this._isShowOptions = true)
    }
    onPressBackdropOptionListHandler() {
        Animated.timing(this._optionRight, {
            toValue: -SCREEN_WIDTH,
            duration: 400
        }).start(() => this._isShowOptions = false)
    }
    onReadyForDisplay({ naturalSize, status }) {
        if (this._videoRef.hasOwnProperty("_nativeRef") && !this._isPaused) {
            this._playBtnOpacity.setValue(0)
            this._videoRef.replayAsync()
        }
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
        const { videoId, setThreadWatchingStatus } = this.props
        if (this._isPaused) {
            setThreadWatchingStatus(videoId, true)
            this._videoRef.playAsync()
            this._playBtnOpacity.setValue(0)
            this._isPaused = false
            const { onPlay } = this.props
            if (typeof onPlay === 'function') onPlay()
        } else {
            setThreadWatchingStatus(videoId, false)
            this._videoRef.pauseAsync()
            this._playBtnOpacity.setValue(1)
            this._isPaused = true
            const { onPause } = this.props
            if (typeof onPause === 'function') onPause()
        }
    }
    onPlaybackStatusUpdateHandler(status) {
        if (this.props.videoId === 4) console.log(this._currentPositionMillis)
        if (this._currentPositionMillis >= this._maxPositionMillis && this._currentPositionMillis !== 0) {
            const { onFinish } = this.props
            this._playBtnOpacity.setValue(1)
            if (typeof onFinish === 'function') onFinish()
        }
        this._currentPositionMillis = status.positionMillis
        if (!this._isDraggingTimePoint) {
            this._currentVideoPosition.setValue(status.positionMillis)
            const { setCurrentWatchingPosition, videoId } = this.props
            if (!isNaN(videoId)) setCurrentWatchingPosition(status.positionMillis, videoId)
        }
    }
    onGestureEventHandler({ nativeEvent }) {
        const { translationX } = nativeEvent
        let nextPositionMillis = this._startDraggingPosition + translationX / maxTimeBarWidth * this._maxPositionMillis
        nextPositionMillis = nextPositionMillis < 0 ? 0 : (nextPositionMillis > this._maxPositionMillis ? this._maxPositionMillis : nextPositionMillis)
        this._currentVideoPosition.setValue(nextPositionMillis)
        const { setCurrentWatchingPosition, videoId } = this.props
        if (!isNaN(videoId)) setCurrentWatchingPosition(nextPositionMillis, videoId)
    }
    async onHandlerStateChangeHandler({ nativeEvent }) {

        const { state, translationX } = nativeEvent
        if (state === State.END) {
            let nextPositionMillis = this._startDraggingPosition + translationX / maxTimeBarWidth * this._maxPositionMillis
            nextPositionMillis = nextPositionMillis < 0 ? 0 : (nextPositionMillis > this._maxPositionMillis ? this._maxPositionMillis : nextPositionMillis)
            await this._videoRef.setPositionAsync(nextPositionMillis, {
                toleranceMillisBefore: 0,
                toleranceMillisAfter: 0
            });
            this._currentPositionMillis = nextPositionMillis
            console.log("nextPositionMillis", nextPositionMillis)
            const { setCurrentWatchingPosition, videoId } = this.props
            if (!isNaN(videoId)) setCurrentWatchingPosition(nextPositionMillis, videoId)
            this._isDraggingTimePoint = false
        } else if (state === State.BEGAN) {
            this._startDraggingPosition = this._currentPositionMillis
            this._isDraggingTimePoint = true
            console.log(this._startDraggingPosition)
        }
    }
    async onPressTimeBarHandler({ nativeEvent }) {
        const { locationX } = nativeEvent
        let nextPositionMillis = locationX / maxTimeBarWidth * this._maxPositionMillis
        nextPositionMillis = nextPositionMillis < 0 ? 0 : (nextPositionMillis > this._maxPositionMillis ? this._maxPositionMillis : nextPositionMillis)
        await this._videoRef.setPositionAsync(nextPositionMillis, {
            toleranceMillisBefore: 0,
            toleranceMillisAfter: 0
        });
    }
    onOptionsGestureEventHandler({ nativeEvent }) {
        const { translationX } = nativeEvent
        if (translationX < 0 || !this._isShowOptions) return;
        this._optionRight.setValue(-translationX)
    }
    onOptionsandlerStateChangeHandler({ nativeEvent }) {
        const { translationX, state } = nativeEvent
        if (state === State.END) {
            if (translationX > SCREEN_WIDTH / 9) {
                this._isShowOptions = false
                Animated.timing(this._optionRight, {
                    toValue: -SCREEN_WIDTH,
                    duration: 400
                }).start()
            } else {
                this._isShowOptions = true
                Animated.timing(this._optionRight, {
                    toValue: 0,
                    duration: 200
                }).start()
            }
        }
    }
    onPressToggleControllerHandler() {
        const { isAutoToggleController, onShowController, onHideController } = this.props
        if (isAutoToggleController) {
            if (this._isShowController) {
                this._zIndexController.setValue(-1)
                this._isShowController = false
                if (typeof onHideController === 'function') onHideController()
            } else {
                this._zIndexController.setValue(1)
                this._isShowController = true
                if (typeof onShowController === 'function') onShowController()
            }
        }
    }
    render() {

        const playBtnOpacity = this._playBtnOpacity
        const pauseBtnOpacity = this._playBtnOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        })
        const { source, showController, containerStyle, isCenterVertical, videoId } = this.props
        if (source === undefined) return <View></View>
        const { videoSize, maxTimeString } = this.state
        const fixedVideoHeight = videoSize.hasOwnProperty('height') ? SCREEN_WIDTH / videoSize.width * videoSize.height : 0
        let videoWrapperOffsetTop;
        if (isCenterVertical) videoWrapperOffsetTop = (SCREEN_HEIGHT - fixedVideoHeight) / 2
        else videoWrapperOffsetTop = 0
        const optionRight = this._optionRight
        this._isShowController = showController
        if (showController === true) this._zIndexController.setValue(1)
        else this._zIndexController.setValue(-1)
        return (
            <View style={{ ...styles.postWrapper, ...containerStyle, top: videoWrapperOffsetTop, position: isCenterVertical ? 'absolute' : 'relative' }}>
                <View style={{
                    ...styles.videoWrapper,
                    width: SCREEN_WIDTH,
                    height: fixedVideoHeight
                }}>
                    <TouchableOpacity activeOpacity={1} onPress={this.onPressToggleControllerHandler.bind(this)}>
                        <Video
                            progressUpdateIntervalMillis={250}
                            onPlaybackStatusUpdate={this.onPlaybackStatusUpdateHandler.bind(this)}
                            ref={this._handleVideoRef}
                            onReadyForDisplay={this.onReadyForDisplay.bind(this)}
                            style={{
                                ...styles.video,
                                width: SCREEN_WIDTH,
                                height: fixedVideoHeight
                            }}
                            source={source}>
                        </Video>
                    </TouchableOpacity>
                    <Animated.View style={{ ...styles.postContentWrapper, zIndex: this._zIndexController }}>
                        <TouchableOpacity
                            activeOpacity={1} onPress={this.onPressToggleControllerHandler.bind(this)}
                            style={{
                                ...styles.videoToolWrapper, height: fixedVideoHeight / 2 + 35,
                            }}>
                            <View style={styles.btnControlWrapper}>
                                <TouchableWithoutFeedback ref="sss" style={{ height: 75, width: 60 }}
                                    onPress={this.onPressTogglePlayVideoHandler.bind(this)}>
                                    <Animated.View style={{ position: 'absolute', opacity: pauseBtnOpacity }}>
                                        <FontAwesome5Icon name="pause-circle" size={60} color="#fff" />
                                    </Animated.View>
                                    <Animated.View style={{ opacity: playBtnOpacity }}>
                                        <FontAwesome5Icon name="play-circle" size={60} color="#fff" />
                                    </Animated.View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.videoToolBar}>
                                <View style={styles.timeBar}>
                                    <CurrentTimeText videoId={videoId} style={styles.currentTime} />
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
                        </TouchableOpacity>
                    </Animated.View>

                </View>
                <PanGestureHandler
                    onHandlerStateChange={this.onOptionsandlerStateChangeHandler.bind(this)}
                    onGestureEvent={this.onOptionsGestureEventHandler.bind(this)}>
                    <Animated.View style={{ ...styles.optionListWrapper, right: optionRight, height: fixedVideoHeight }}>
                        <View style={styles.optionBackDrop}>
                            <TouchableOpacity onPress={this.onPressBackdropOptionListHandler.bind(this)} style={{ width: "100%", height: "100%" }}>
                                <View></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.allOptionWrapper}>
                            <TouchableOpacity onPress={this.onPressBackdropOptionListHandler.bind(this)}>
                                <View style={styles.optionItemWrapper}>
                                    <Text style={styles.optionText}>Auto</Text>
                                    <Text style={{ fontSize: 12, color: '#333' }}>Always choose best quality</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressBackdropOptionListHandler.bind(this)}>
                                <View style={styles.optionItemWrapper}>
                                    <Text style={styles.optionText}>720p</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressBackdropOptionListHandler.bind(this)}>
                                <View style={styles.optionItemWrapper}>
                                    <Text style={styles.optionText}>360p</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setCurrentWatchingPosition: (position, videoId) => dispatch(SetCurrentWatchingPosition(position, videoId)),
        setThreadWatchingStatus: (playingId, isPlaying) => dispatch(SetThreadWatchingStatus(playingId, isPlaying))
    }
}
const maxTimeBarWidth = SCREEN_WIDTH - 40 - 100 - 20 - 7.5
export default connect(null, mapDispatchToProps)(VideoPlayer)
const CurrentTimeText = (props) => {
    const dispatch = useDispatch()
    const positions = useSelector(state => state.watch.currentWatchTimePosition)
    const { videoId } = props
    const ids = positions.map(position => position.videoId);
    const index = ids.indexOf(videoId)
    if (index < 0) {
        dispatch(SetCurrentWatchingPosition(0, videoId))
        return <Text>00:00</Text>
    }
    const curPosition = positions[index].position
    const maxSeconds = Math.round(curPosition / 1000)
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

    },
    optionListWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 9999999999,
        top: 0,
        backgroundColor: "rgba(0,0,0,0)",
        width: SCREEN_WIDTH,
    },
    allOptionWrapper: {
        backgroundColor: '#fff',
        width: SCREEN_WIDTH / 3,
        padding: 20,
        height: '100%',
    },
    optionBackDrop: {
        width: SCREEN_WIDTH / 3 * 2,
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 999,
        height: "100%",
        flex: 2
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
    videoToolWrapper: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',

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
    videoWrapper: {
        position: 'relative',
        width: '100%'
    },
    video: {
        backgroundColor: "rgba(0,0,0,0)",
    },

})
