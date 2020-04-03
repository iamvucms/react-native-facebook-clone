import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import VideoThreadItem from './VideoThreadItem'
import { FetchVideosFromThreadRequest, SetThreadWatchingStatus } from '../../actions/watchVideosActions'
import { SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../../constants'
class index extends Component {
    constructor(props) {
        super(props)
        this.threadHeightMap = []
    }
    componentDidMount() {
        const { threadId, videoId, fetchVideosFromThread, setThreadWatchingStatus } = this.props
        fetchVideosFromThread(threadId, videoId)
        setThreadWatchingStatus(videoId, true)
    }
    componentWillUnmount() {
        this.threadHeightMap = []
    }
    shouldComponentUpdate(nextProps) {
        this.threadHeightMap = nextProps.threadHeightMap
        return JSON.stringify(this.props.videosFromThread) !== JSON.stringify(nextProps.videosFromThread)
    }
    onScrollHandler({ nativeEvent }) {
        let offsetY = nativeEvent.contentOffset.y
        const { videosFromThread, setThreadWatchingStatus } = this.props
        const idsMap = this.threadHeightMap.map(video => video.videoId)
        let sortedThreadHeightMap = []
        for (let video of videosFromThread) {
            let index = idsMap.indexOf(video.id)
            let height = this.threadHeightMap[index].height
            sortedThreadHeightMap.push({
                videoId: video.id,
                height
            })
        }
        let nextIndex = 0
        let needSubtractIndex = false
        while (offsetY > 0) {
            if (offsetY - sortedThreadHeightMap[nextIndex].height <= 0) {
                // console.log(nextIndex , offsetY / sortedThreadHeightMap[nextIndex].height)
                needSubtractIndex = offsetY / sortedThreadHeightMap[nextIndex].height < 0.5
            }
            offsetY -= sortedThreadHeightMap[nextIndex].height
            nextIndex++
        }
        if (needSubtractIndex) nextIndex = nextIndex - 1 < 0 ? 0 : nextIndex - 1
        setThreadWatchingStatus(sortedThreadHeightMap[nextIndex].videoId, true)
    }
    scrollToItem(videoId) {
        const { videosFromThread, setThreadWatchingStatus } = this.props
        const idsMap = this.threadHeightMap.map(video => video.videoId)
        let sortedThreadHeightMap = []
        let sortedIds = []
        let nextIndex;
        for (let video of videosFromThread) {
            let index = idsMap.indexOf(video.id)
            let height = this.threadHeightMap[index].height
            sortedThreadHeightMap.push({
                videoId: video.id,
                height
            })
            sortedIds.push(video.id)
        }
        nextIndex = sortedIds.indexOf(videoId)
        nextIndex = nextIndex + 1 === sortedIds.length ? 0 : nextIndex + 1
        let nextOffsetY = 0
        for (let i = 0; i < nextIndex; i++) {
            nextOffsetY += sortedThreadHeightMap[i].height
        }
        this.refs._scrollRef.scrollTo({
            x: 0,
            y: nextOffsetY,
            animated: true
        })
    }
    render() {
        const { videosFromThread } = this.props
        if (videosFromThread.length === 0) return <View></View>
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="_scrollRef"
                    onMomentumScrollEnd={this.onScrollHandler.bind(this)}
                    onScrollEndDrag={this.onScrollHandler.bind(this)}
                    scrollEventThrottle={40}
                    style={styles.videosWrapper}
                    bounces={false}
                    showsVerticalScrollIndicator={false}>
                    {videosFromThread.map((video, index) => (
                        <VideoThreadItem
                            scrollToItem={this.scrollToItem.bind(this)}
                            key={index}
                            video={video}
                        />
                    ))}
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        videosFromThread: state.watch.videosFromThread,
        threadHeightMap: state.watch.threadHeightMap
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchVideosFromThread: (threadId, videoId) => dispatch(FetchVideosFromThreadRequest(threadId, videoId)),
        setThreadWatchingStatus: (playingId, isPlaying) => dispatch(SetThreadWatchingStatus(playingId, isPlaying))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
const styles = StyleSheet.create({
    container: {

    },
    videosWrapper: {
        height: SCREEN_HEIGHT - STATUSBAR_HEIGHT - 40 // statusBar - topOptionsTool
    }
})
