import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as navigation from '../../rootNavigation'
import VideosFromThread from '../../components/VideosFromThread'
import { SetThreadWatchingStatus, PauseThreadWatchingStatus } from '../../actions/watchVideosActions'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { STATUSBAR_HEIGHT } from '../../constants'
class WatchDetailList extends Component {

    pauseThreadWatchingStatusFn = () => { }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { threadId, id } = this.props.route.params
        const { pauseThreadWatchingStatus } = this.props
        this.pauseThreadWatchingStatusFn = pauseThreadWatchingStatus
    }
    onPressGoBackHandler() {
        this.pauseThreadWatchingStatusFn()
        navigation.goBack()
    }
    onPressWatchSearchHandler() {
        this.pauseThreadWatchingStatusFn()
        navigation.push('WatchSearch')
    }
    render() {
        const { threadId, id } = this.props.route.params
        return (
            <View style={styles.container}>
                <View style={styles.topOptiions}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler.bind(this)}>
                        <FontAwesome5Icon name="arrow-left" size={20} color="#fff" />
                    </ExTouchableOpacity>
                    <ExTouchableOpacity onPress={this.onPressWatchSearchHandler.bind(this)}>
                        <FontAwesome5Icon name="search" size={20} color="#fff" />
                    </ExTouchableOpacity>
                </View>
                <VideosFromThread threadId={threadId} videoId={id} />
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setThreadWatchingStatus: (playingId, isPlaying) => dispatch(SetThreadWatchingStatus(playingId, isPlaying)),
        pauseThreadWatchingStatus: () => dispatch(PauseThreadWatchingStatus())
    }
}
export default connect(null, mapDispatchToProps)(WatchDetailList)
const styles = StyleSheet.create({
    container: {
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: '#000'
    },
    topOptiions: {
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    }
})
