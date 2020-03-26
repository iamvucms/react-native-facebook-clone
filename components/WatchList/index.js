import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import WatchItem from './WatchItem'
import { connect } from 'react-redux'
import { FetchWatchVideosRequest } from '../../actions/watchVideosActions'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchWatchVideos } = this.props
        fetchWatchVideos()
    }
    render() {
        const { watchVideos } = this.props
        return (
            <View style={styles.container}>
                {watchVideos.map((watchVideo, index) => (
                    <WatchItem key={index} item={watchVideo}></WatchItem>
                ))}
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        watchVideos: state.watch.watchVideos
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchWatchVideos: () => dispatch(FetchWatchVideosRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
const styles = StyleSheet.create({
    container: {

    }
})
