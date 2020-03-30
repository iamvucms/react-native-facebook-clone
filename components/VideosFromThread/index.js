import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import VideoThreadItem from './VideoThreadItem'
import { FetchVideosFromThreadRequest } from '../../actions/watchVideosActions'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { threadId, videoId, fetchVideosFromThread } = this.props
        fetchVideosFromThread(threadId, videoId)
    }
    render() {
        const { videosFromThread } = this.props
        if (videosFromThread.length === 0) return <View></View>
        return (
            <View>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    {videosFromThread.map((video, index) => (
                        <VideoThreadItem
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
        videosFromThread: state.watch.videosFromThread
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchVideosFromThread: (threadId, videoId) => dispatch(FetchVideosFromThreadRequest(threadId, videoId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
const styles = StyleSheet.create({})
