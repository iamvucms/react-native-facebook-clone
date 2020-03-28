import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native'
import { Video } from 'expo-av';
import { SCREEN_WIDTH } from '../../constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux'
import { SetWatchingVideo, ResetWatchingStatus } from '../../actions/videoControlActions';
class VideoController extends Component {
    constructor(props) {
        super(props)
        this._isMuted = false
        this._videoRef = {}
        this._handleVideoRef = component => {
            this._videoRef = component;
        }
        this._isFinished = false
        this._volumeIconOpacity = new Animated.Value(1)
    }
    componentDidMount() {
        const { item, videoControl } = this.props
        if (videoControl.playingId === item.id && videoControl.isPlaying) {
            this._videoRef.setIsMutedAsync(false)
            this._isMuted = false
            if (this._isFinished) {
                this._videoRef.replayAsync()
                this._isFinished = false
            } else this._videoRef.playAsync()

        } else {
            this._videoRef.pauseAsync()
            this._videoRef.setIsMutedAsync(true)
            this._isMuted = true
        }
        if (this._isMuted) this._volumeIconOpacity.setValue(0)
        else this._volumeIconOpacity.setValue(1)
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { item, videoControl } = nextProps
        return videoControl.playingId === item.id && videoControl.isPlaying
    }
    onPressToggleVolumeHandler() {
        this._isMuted = !this._isMuted
        this._videoRef.setIsMutedAsync(this._isMuted)
        if (this._isMuted) this._volumeIconOpacity.setValue(0)
        else this._volumeIconOpacity.setValue(1)

    }
    onPlaybackStatusUpdateHandler(status) {
        const { item, videoControl, watchVideos, setWatchingVideo } = this.props
        if (videoControl.playingId === item.id && videoControl.isPlaying) {
            if (status.didJustFinish) {
                this._isFinished = true
                watchVideos.every((video, index) => {
                    if (video.id === videoControl.playingId) {
                        const nextIndex = index === watchVideos.length - 1 ? 0 : index + 1
                        const nextId = watchVideos[nextIndex].id
                        if (nextIndex === 0) return false
                        setWatchingVideo(nextId)
                        return false
                    }
                    return true
                })
            }
        }
        else return;
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { item, videoControl } = nextProps
        if (videoControl.playingId === item.id && videoControl.isPlaying) {
            this._videoRef.setIsMutedAsync(false)
            this._isMuted = false
            if (this._isFinished) {
                this._videoRef.replayAsync()
                this._isFinished = false
            } else this._videoRef.playAsync()
        } else {
            this._videoRef.pauseAsync()
            this._videoRef.setIsMutedAsync(true)
            this._isMuted = true
        }
        if (this._isMuted) this._volumeIconOpacity.setValue(0)
        else this._volumeIconOpacity.setValue(1)
    }
    render() {
        const volumeIconOpacity = this._volumeIconOpacity
        const muteVolumeIconOpacity = this._volumeIconOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        })
        const { item, videoControl } = this.props
        const { video } = item
        return (
            <View style={styles.container}>
                <Video
                    onPlaybackStatusUpdate={this.onPlaybackStatusUpdateHandler.bind(this)}
                    ref={this._handleVideoRef}
                    source={{ uri: video.video_url }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    shouldPlay={videoControl.playingId === item.id && videoControl.isPlaying}
                    style={styles.video}
                />
                <TouchableOpacity style={styles.btnToggleVolume} onPress={this.onPressToggleVolumeHandler.bind(this)}>
                    <Animated.View style={{ position: 'absolute', opacity: muteVolumeIconOpacity }}>
                        <FontAwesome5Icon color='#fff' name="volume-mute" size={20} />
                    </Animated.View>
                    <Animated.View style={{ opacity: volumeIconOpacity }}>
                        <FontAwesome5Icon color='#fff' name="volume-up" size={20} />
                    </Animated.View>

                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        videoControl: state.videoControl,
        watchVideos: state.watch.watchVideos
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setWatchingVideo: (playingId, isPlaying = true) => dispatch(SetWatchingVideo(playingId, isPlaying)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoController);
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%'
    },
    video: {
        width: SCREEN_WIDTH,
        height: 300,
        backgroundColor: '#000'
    },
    btnToggleVolume: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    poster: {
        backgroundColor: '#000'
    }
})
