import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import VideoPlayer from '../VideoPlayer'
import { SCREEN_WIDTH, SCREEN_HEIGHT, permission } from '../../constants'
import { connect } from 'react-redux'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Animated } from 'react-native'
import * as navigation from '../../rootNavigation'
import { PushThreadHeightMap } from '../../actions/watchVideosActions'
class VideoThreadItem extends Component {
    constructor(props) {
        super(props)
        this._videoRef = {}
        this.optionsLayout = new Animated.ValueXY({
            x: 0,
            y: 0
        })
        this._isShowOptions = false
        this.threadHeightMap = []
    }
    onRefReadyHandler(ref) {
        this._videoRef = ref
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        this.threadHeightMap = []
    }
    shouldComponentUpdate(nextProps, nextState) {
        let { video } = this.props
        const { threadWatchingController } = nextProps
        this.threadHeightMap = nextProps.threadHeightMap
        let nextVideo = { ...nextProps.video }
        if (threadWatchingController.playingId === video.id && threadWatchingController.isPlaying) this._videoRef.play()
        else this._videoRef.pause()
        return JSON.stringify(video) !== JSON.stringify(nextVideo)
    }
    onPressToggleControllerHandler() {
        
        // if (this._videoRef._isShowController) {
        //      this._videoRef.hideController()
        // } else {
        //     if (!this._videoRef.isPaused) this._videoRef.showController()
        // }
    }

    onPressCommentsHandler() {
        const { video } = this.props
        const { comments } = video
        navigation.navigate('CommentsPopUp', {
            comments
        })
    }
    onPressOptionIconHandler() {
        if (this._isShowOptions) {
            this._isShowOptions = false
            Animated.timing(this.optionsLayout, {
                toValue: {
                    x: 0,
                    y: 0
                },
                duration: 400
            }).start()
        } else {
            this._isShowOptions = true
            Animated.spring(this.optionsLayout, {
                toValue: {
                    x: SCREEN_WIDTH * 0.6,
                    y: 340
                },
                duration: 400
            }).start()
        }

    }
    onThreadItemLayoutHandler({ nativeEvent }) {
        const { height } = nativeEvent.layout
        const { video, pushThreadHeightMap } = this.props
        if (typeof pushThreadHeightMap === 'function') {
            pushThreadHeightMap(video.id, height)
        }
    }
    onFinishHandler() {
        const { video, scrollToItem } = this.props
        const videoId = video.id
        scrollToItem(videoId)
    }
    render() {
        console.log("render")
        const { video, threadWatchingController } = this.props
        let shouldPlay = false;
        shouldPlay = threadWatchingController.playingId === video.id && threadWatchingController.isPlaying
        const source = { uri: video.video.video_url }
        let reactionValue = 0;
        for (let emoji in video.reactions) {
            reactionValue += video.reactions[emoji];
        }
        return (
            <View
                onLayout={this.onThreadItemLayoutHandler.bind(this)}
                style={{ ...styles.container }}>
                <View style={styles.infoListItem}>
                    <Image style={styles.pageAvatar} source={{ uri: video.page.avatar_url }} />
                    <View style={styles.centerInfoWrapper}>
                        <View style={styles.centerInfoUp}>
                            <TouchableOpacity>
                                <Text style={styles.name}>{video.page.name}</Text>
                            </TouchableOpacity>
                            <Text style={{ color: '#318bfb' }}> • </Text>
                            <TouchableOpacity>
                                <Text style={{ color: '#318bfb' }}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.centerInfoDown}>
                            <Text style={{ color: '#333' }}>{video.create_at}</Text>
                            <Text style={{ color: '#333' }}> • </Text>
                            {video.permission == permission.PUBLIC && (
                                <FontAwesome5Icon color='#333' name="globe-asia" />
                            )}
                            {video.permission == permission.SETTING && (
                                <FontAwesome5Icon color='#333' name="cogs" />
                            )}
                            {video.permission == permission.GROUP && (
                                <FontAwesome5Icon color='#333' name="newspaper" />
                            )}
                        </View>
                    </View>
                    <View style={styles.btnOptions} onPress={this.onPressOptionIconHandler.bind(this)}>
                        <TouchableOpacity style={styles.btnOptions} onPress={this.onPressOptionIconHandler.bind(this)}>
                            <FontAwesome5Icon name="ellipsis-v" color="#fff" size={20}></FontAwesome5Icon>
                        </TouchableOpacity>
                        <Animated.View
                            style={{
                                ...styles.optionListWrapper,
                                top: 30,
                                width: this.optionsLayout.x,
                                height: this.optionsLayout.y,
                                opacity: Animated.divide(this.optionsLayout.x, SCREEN_WIDTH * 0.6)
                            }}>
                            <View>

                            </View>
                            <View style={styles.allOptionWrapper}>
                                <TouchableOpacity>
                                    <View style={styles.optionItemWrapper}>
                                        <FontAwesome5Icon name="download" size={20}></FontAwesome5Icon>
                                        <View>
                                            <Text style={styles.optionText}>Save video</Text>
                                            <Text style={{ ...styles.optionText, fontSize: 10 }}>Add to your saved video list</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>


                                <TouchableOpacity>
                                    <View style={styles.optionItemWrapper}>
                                        <FontAwesome5Icon name="minus-square" size={20}></FontAwesome5Icon>
                                        <View>
                                            <Text style={styles.optionText}>Hide {video.page.name}</Text>
                                            <Text style={{ ...styles.optionText, fontSize: 10 }}>Hide this page in 30 days</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.optionItemWrapper}>
                                        <FontAwesome5Icon name="exclamation-triangle" size={20}></FontAwesome5Icon>
                                        <View>
                                            <Text style={styles.optionText}>Report or find supporting</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.optionItemWrapper}>
                                        <FontAwesome5Icon name="clone" size={20}></FontAwesome5Icon>
                                        <View>
                                            <Text style={styles.optionText}>Copy video's link</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.optionItemWrapper}>
                                        <FontAwesome5Icon name="plus-circle" size={20}></FontAwesome5Icon>
                                        <View>
                                            <Text style={styles.optionText}>Create shortcut</Text>
                                            <Text style={{ ...styles.optionText, fontSize: 10 }}>Add to your saved video list</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.optionItemWrapper}>
                                        <FontAwesome5Icon name="bug" size={20}></FontAwesome5Icon>
                                        <View>
                                            <Text style={styles.optionText}>Save video</Text>
                                            <Text style={{ ...styles.optionText, fontSize: 10 }}>Add to your saved video list</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>

                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.onPressToggleControllerHandler.bind(this)}
                >
                    <VideoPlayer
                        onFinish={this.onFinishHandler.bind(this)}
                        isInThreadList={true}
                        isMultiVideoPlay={true}
                        isAutoToggleController={true}
                        onRefReady={this.onRefReadyHandler.bind(this)}
                        shouldPlay={shouldPlay}
                        source={source}
                        videoId={video.id}
                        showController={false}
                    />
                </TouchableOpacity>
                <View style={{ ...styles.postContentWrapper }}>
                    <View>
                        <Text style={styles.content}>{video.content}</Text>
                    </View>
                    <View style={styles.reactionValueWrapper}>
                        <TouchableOpacity >
                            <View style={styles.reactionNumberWrapper}>
                                <FontAwesome5Icon name="thumbs-up" color="#318bfb" size={14}>
                                </FontAwesome5Icon>
                                <Text style={{ color: '#fff', marginLeft: 5 }}>{reactionValue}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPressCommentsHandler.bind(this)}>
                            <Text style={{ color: '#fff' }}>{video.comments.length} comments</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnReactionWrapper}>
                        <TouchableOpacity style={styles.btnWrapper} >
                            <View style={styles.reactionBtn}>
                                <FontAwesome5Icon name="thumbs-up" color={'#318bfb'} size={20}>
                                </FontAwesome5Icon>
                                <Text style={styles.reactionBtnText}>Like</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnWrapper} onPress={this.onPressCommentsHandler.bind(this)}>
                            <View style={styles.reactionBtn}>
                                <FontAwesome5Icon name="comment-alt" color="#fff" size={20}>
                                </FontAwesome5Icon>
                                <Text style={styles.reactionBtnText}>Comment</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnWrapper} >
                            <View style={styles.reactionBtn}>
                                <FontAwesome5Icon name="share" color="#fff" size={20}>
                                </FontAwesome5Icon>
                                <Text style={styles.reactionBtnText}>Share</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        threadWatchingController: state.watch.threadWatchingController,
        threadHeightMap: state.watch.threadHeightMap
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        pushThreadHeightMap: (videoId, height) => dispatch(PushThreadHeightMap(videoId, height))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoThreadItem)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#060807',
        position: 'relative',
        width: SCREEN_WIDTH,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    optionListWrapper: {
        borderRadius: 5,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        backgroundColor: "rgba(0,0,0,0)",
    },
    allOptionWrapper: {
        backgroundColor: "#fff",
        padding: 20,
        width: "100%",
        zIndex: 2
    },
    optionItemWrapper: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16
    },
    postContentWrapper: {
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    infoListItem: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingRight: 0,
        paddingVertical: 10,
        zIndex: 99999
    },
    pageAvatar: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    centerInfoWrapper: {
        width: SCREEN_WIDTH - 15 - 30 - 40,//padding btnoptionWidth avatarWidth
        paddingHorizontal: 10
    },
    centerInfoUp: {
        flexDirection: 'row'
    },
    centerInfoDown: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25
    },
    btnOptions: {
        position: 'relative',
        width: 30,
        height: 30,
        alignItems: 'center'
    },
    name: {
        fontWeight: 'bold',
        color: '#fff'
    },
    content: {
        color: '#fff'
    },
    time: {
        marginTop: 5,
        color: '#fff',
        textTransform: 'uppercase',
        opacity: 0.5
    },
    btnReactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,

    },
    reactionBtnText: {
        color: '#fff',
        marginLeft: 5
    },
    btnWrapper: {
        flex: 1
    },
    reactionBtn: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageWrapper: {

    },
    image: {
        backgroundColor: "rgba(0,0,0,0)",
        height: "100%"
    },
    reactionValueWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    reactionNumberWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    }

})
