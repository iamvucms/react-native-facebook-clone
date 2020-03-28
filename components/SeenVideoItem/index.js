import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Video } from 'expo-av'
import { SCREEN_WIDTH } from '../../constants'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { navigate } from '../../rootNavigation'
export default class index extends Component {
    constructor(props) {
        super(props)
    }
    onPressWatchVideoDetail() {
        const { item } = this.props
        navigate('WatchDetail', {
            id: item.id
        })
    }
    render() {
        const { item } = this.props
        const { video } = item
        return (
            <ExTouchableOpacity onPress={this.onPressWatchVideoDetail.bind(this)} style={styles.container}>
                <View style={styles.videoWrapper}>
                    <Video
                        posterStyle={styles.posterStyle}
                        usePoster={true}
                        shouldPlay={false}
                        isMuted={true}
                        resizeMode="cover"
                        source={{ uri: video.video_url }}
                        style={styles.video}>
                    </Video>
                    <View style={styles.seenLable}>
                        <Text style={{ color: '#fff' }}>Seen</Text>
                    </View>
                </View>
                <View style={styles.infoWrapper}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.pageName}>{item.page.name}</Text>
                    <Text style={styles.view}>{item.seeCount > 1000 ? Math.round(item.seeCount / 1000) + 'k' : item.seeCount} views</Text>
                </View>
            </ExTouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 7.5,
        flexDirection: 'row',
    },
    video: {
        width: (SCREEN_WIDTH - 15 * 2 - 20) / 2,
        height: 100,
        marginHorizontal: 5,
        borderRadius: 5
    },
    infoWrapper: {
        marginHorizontal: 5
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    },
    pageName: {
        color: 'rgba(255,255,255,0.6)'
    },
    view: {
        color: 'rgba(255,255,255,0.6)'
    },
    videoWrapper: {
        position: 'relative'
    },
    seenLable: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        bottom: 8,
        right: 13,
        borderRadius: 2.5,
        paddingHorizontal: 2.5
    }
})
