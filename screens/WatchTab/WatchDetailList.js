import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import * as navigation from '../../rootNavigation'
import VideosFromThread from '../../components/VideosFromThread'
import { SetThreadWatchingStatus } from '../../actions/watchVideosActions'
class WatchDetailList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { threadId, id } = this.props.route.params
        const { setThreadWatchingStatus } = this.props
        setThreadWatchingStatus(id, true)
    }
    render() {
        const { threadId, id } = this.props.route.params
        return (
            <View style={styles.container}>
                <VideosFromThread threadId={threadId} videoId={id} />
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setThreadWatchingStatus: (playingId, isPlaying) => dispatch(SetThreadWatchingStatus(playingId, isPlaying))
    }
}
export default connect(null, mapDispatchToProps)(WatchDetailList)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000'
    }
})
