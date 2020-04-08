import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { Video } from 'expo-av'
import { connect } from 'react-redux'
import { SCREEN_WIDTH } from '../../constants'
import ExTouchableOpacity from '../ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { navigation } from '../../rootNavigation'

class Videos extends Component {
    constructor(props) {
        super(props)
    }
    onPressWatchVideoHandler(id, threadId) {
        navigation.navigate('WatchDetailList', {
            id,
            threadId
        })
    }
    render() {
        const { videos } = this.props
        if(videos.length===0) return <View></View>
        const mostPopularVideo = videos.filter(video => video.isPopular === true)[0]
        let reactionValue = 0;
        for (let emoji in mostPopularVideo.reactions) {
            reactionValue += mostPopularVideo.reactions[emoji];
        }
        return (
            <View style={styles.container}>
                <ExTouchableOpacity
                    onPress={this.onPressWatchVideoHandler.bind(this,
                        mostPopularVideo.id, mostPopularVideo.watch_threadId)}
                    activeOpacity={1}
                    style={styles.mostPopularVideos}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        padding: 15
                    }}>Most popular</Text>
                    <Video
                        usePoster={true}
                        source={{ uri: mostPopularVideo.video.video_url }}
                        style={{
                            width: SCREEN_WIDTH,
                            height: 250
                        }} />
                    <View style={styles.popularVideoInfo}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500'
                        }}>{mostPopularVideo.title}</Text>
                        <View style={styles.reactionsWrapper}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <FontAwesome5Icon name="thumbs-up" color="#318bfb" size={16} />
                                <Text style={{
                                    marginLeft: 5
                                }}>{reactionValue} reactions</Text>
                            </View>
                            <Text>{mostPopularVideo.comments?.length || 0} comments</Text>
                        </View>
                    </View>
                </ExTouchableOpacity>
                <View style={styles.videosWrapper}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Lasted Videos</Text>
                    <View style={styles.videos}>
                        {videos.map((video, index) => (
                            <ExTouchableOpacity
                                onPress={this.onPressWatchVideoHandler.bind(this,
                                    video.id, video.watch_threadId)}
                                style={styles.videoItem} key={index}>
                                <View style={styles.previewImageWrapper}>
                                    <Video
                                        resizeMode="cover"
                                        source={{ uri: video.video.video_url }}
                                        style={{
                                            height: 100,
                                            width: '100%'
                                        }} />
                                    <View style={styles.timeTxt}>
                                        <Text></Text>
                                    </View>
                                </View>
                                <View style={styles.videoInfoWrapper}>
                                    <Text style={{
                                        fontWeight: '500',
                                        fontSize: 16
                                    }}>{video.title}</Text>
                                    <Text style={{
                                        marginVertical: 5,
                                        fontWeight: '400',
                                        color: '#333'
                                    }}>{video.create_at} - {video.seeCount > 1000
                                        ? Math.round(video.seeCount / 1000) + 'k'
                                        : video.seeCount} views</Text>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            width: 55,
                                            justifyContent: 'space-between'
                                        }}>
                                            <FontAwesome5Icon
                                                size={16}
                                                name="thumbs-up"
                                                color="#318bfb" />
                                            <FontAwesome5Icon size={16}
                                                name="heart"
                                                color="#e8304a" />
                                            <FontAwesome5Icon size={16}
                                                name="grin-squint"
                                                color="#f7ca51" />
                                        </View>
                                        <Text style={{
                                            color: '#333',
                                            marginLeft: 5
                                        }}>{Object.values(video.reactions).reduce((a, b) => a + b, 0)} people liked</Text>
                                    </View>
                                </View>
                            </ExTouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        videos: state.page.videos
    }
}
export default connect(mapStateToProps, null)(Videos)
const styles = StyleSheet.create({
    container: {
        marginVertical: 10,

    },
    mostPopularVideos: {
        position: 'relative',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    popularVideoInfo: {
        paddingHorizontal: 15,
        marginVertical: 5
    },
    reactionsWrapper: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    videosWrapper: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    videoItem: {
        flexDirection: 'row',
        marginVertical: 10,
        overflow: 'hidden'
    },
    previewImageWrapper: {
        width: SCREEN_WIDTH * 0.5,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10
    },
    timeTxt: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    videoInfoWrapper: {
        paddingHorizontal: 10
    }
})
