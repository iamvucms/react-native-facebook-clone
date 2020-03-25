import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Video } from 'expo-av';
import { SCREEN_WIDTH } from '../../constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux'
import { SetWatchingVideo, ResetWatchingStatus } from '../../actions/videoControlActions';
class VideoController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            muted: true
        }
        this._videoRef = {}
        this._handleVideoRef = component => {
            this._videoRef = component;
        }
    }
    componentDidMount() {
        const { item, videoControl } = this.props
        if (videoControl.playingId === item.id && videoControl.isPlaying && this.state.muted) {
            this.setState({
                ...this.state,
                muted: false
            })
        } else {
            this.setState({
                ...this.state,
                muted: true
            })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { item, videoControl } = nextProps
        // return videoControl.playingId === item.id && videoControl.isPlaying || nextState.muted !== this.state.muted
        return true
    }
    onPressToggleVolumeHandler() {
        this.setState({
            ...this.state,
            muted: !this.state.muted
        })
    }
    onPlaybackStatusUpdateHandler(status) {
        const { item, videoControl, watchVideos, setWatchingVideo } = this.props
        if (videoControl.playingId === item.id && videoControl.isPlaying) {
            if (status.didJustFinish) {
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
        const { muted } = this.state
        const { item, videoControl } = nextProps
        if (videoControl.playingId === item.id && videoControl.isPlaying && muted) {
            this.setState({
                ...this.state,
                muted: false
            })
        } else {
            this.setState({
                ...this.state,
                muted: true
            })
        }
    }
    render() {
        const { muted } = this.state
        const { item, videoControl } = this.props
        const { video } = item
        if (videoControl.playingId === item.id && videoControl.isPlaying && this.state.muted) {
            this.setState({
                ...this.state,
                muted: false
            })
        }
        console.log("renderItem", item.id)
        return (
            <View style={styles.container}>
                <Video
                    progressUpdateIntervalMillis={400}
                    onPlaybackStatusUpdate={this.onPlaybackStatusUpdateHandler.bind(this)}
                    ref={this._handleVideoRef}
                    source={{ uri: video.video_url }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={muted}
                    resizeMode={Video.RESIZE_MODE_CONTAIN}
                    shouldPlay={videoControl.playingId === item.id && videoControl.isPlaying}
                    style={styles.video}
                />
                <TouchableOpacity style={styles.btnToggleVolume} onPress={this.onPressToggleVolumeHandler.bind(this)}>
                    {muted && <FontAwesome5Icon color='#fff' name="volume-mute" size={20} />}
                    {!muted && <FontAwesome5Icon color='#fff' name="volume-up" size={20} />}
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        videoControl: state.videoControl,
        watchVideos: state.watchVideos
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setWatchingVideo: (playingId, isPlaying = true) => dispatch(SetWatchingVideo(playingId, isPlaying)),
        resetWatchingStatus: () => dispatch(ResetWatchingStatus())
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
