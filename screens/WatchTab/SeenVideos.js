import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import SeenVideoItem from '../../components/SeenVideoItem'
import { connect } from 'react-redux'
import { FetchSeenWatchVideosRequest } from '../../actions/watchVideosActions'
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../../constants'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import * as navigation from '../../rootNavigation'
class SeenVideos extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchSeenWatchVideos } = this.props
        fetchSeenWatchVideos()
    }
    onPressBackHandler() {
        navigation.goBack()
    }
    render() {
        const { seenVideos } = this.props
        if (seenVideos.length === 0) return <View></View>
        return (
            <View style={styles.container}>
                <View style={styles.statusBar}>

                </View>
                <View style={styles.topBar}>
                    <ExTouchableOpacity onPress={this.onPressBackHandler}>
                        <FontAwesome5Icon name="arrow-left" size={20} color="#fff"></FontAwesome5Icon>
                    </ExTouchableOpacity>
                    <Text style={styles.title}>Watched Video</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false} style={styles.seenVideosWrapper}>
                    {seenVideos.map((video, index) => (
                        <SeenVideoItem item={video} key={index}></SeenVideoItem>
                    ))}
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        seenVideos: state.watch.seenWatchVideos
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchSeenWatchVideos: () => dispatch(FetchSeenWatchVideosRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SeenVideos);
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(28,33,46)'
    },
    statusBar: {
        height: 44,
        backgroundColor: '#fff'
    },
    topBar: {
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10
    },
    wrapper: {
        backgroundColor: 'rgb(28,33,46)'
    },
    seenVideosWrapper: {
        paddingHorizontal: 10,
        marginVertical: 7.5,
        // marginBottom: 101.5,
        height: SCREEN_HEIGHT - (STATUSBAR_HEIGHT + 50) - 15 //topBarHeight marginVertical
    }
})
