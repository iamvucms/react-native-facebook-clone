import React, { Component } from 'react'
import { Text, StyleSheet, View, } from 'react-native'
import VideoPlayer from '../VideoPlayer'
import { SCREEN_WIDTH } from '../../constants'
import { connect } from 'react-redux'
class VideoThreadItem extends Component {
    constructor(props) {
        super(props)
        this._videoRef = {}
    }
    onRefReadyHandler(ref) {
        this._videoRef = ref
    }
    componentDidMount() {

    }
    shouldComponentUpdate(nextProps, nextState) {
        let { video } = this.props
        const { threadWatchingController } = nextProps
        let nextVideo = { ...nextProps.video }
        if (threadWatchingController.playingId === nextVideo.id && threadWatchingController.isPlaying) this._videoRef.play()
        else this._videoRef.pause()
        return JSON.stringify(video) !== JSON.stringify(nextVideo)
    }
    render() {
        const { video, threadWatchingController } = this.props
        let shouldPlay = false;
        shouldPlay = threadWatchingController.playingId === video.id && threadWatchingController.isPlaying
        const source = { uri: video.video.video_url }
        return (
            <View style={{ ...styles.container }}>
                <VideoPlayer
                    isMultiVideoPlay={true}
                    isAutoToggleController={true}
                    onRefReady={this.onRefReadyHandler.bind(this)}
                    shouldPlay={shouldPlay}
                    source={source}
                    videoId={video.id}
                    showController={false}
                />
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        threadWatchingController: state.watch.threadWatchingController
    }
}
export default connect(mapStateToProps, null)(VideoThreadItem)
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: SCREEN_WIDTH,
        paddingVertical: 15
    }
})
