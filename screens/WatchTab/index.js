import React, { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import WatchList from '../../components/WatchList'
import { SetWatchingVideo } from '../../actions/videoControlActions'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // const { setWatchingVideo } = this.props

        // setWatchingVideo(1)
    }
    test() {
        this.refs._scrollRef.scrollTo({
            x: 0,
            y: 2636 + 110
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        const { user, videoControl, watchVideos } = this.props
        const nextUser = nextProps.user
        const nextVideoControl = nextProps.videoControl
        if (!isNaN(videoControl.playingId)
            && videoControl.playingId !== nextVideoControl.playingId) {
            watchVideos.every((video, index) => {
                if (video.id === nextVideoControl.playingId) {
                    this.refs._scrollRef.scrollTo({
                        x: 0,
                        y: index * (nextVideoControl.fixedHeightWatchVideo + 10) + 100
                    })
                    return false
                }
                return true
            })

        }
        return JSON.stringify(user) !== JSON.stringify(nextUser)
    }

    render() {
        console.log("renderParent")
        const { user } = this.props
        if (!user.hasOwnProperty('id')) return <View></View>
        const { watch_list } = user
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView ref="_scrollRef"
                        bounces={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>Watch</Text>
                            <View style={styles.rightOptionWrapper}>
                                <ExTouchableOpacity onPress={this.test.bind(this)} style={styles.btnMyList}>
                                    <FontAwesome5Icon name="user-alt" size={20}></FontAwesome5Icon>
                                </ExTouchableOpacity>
                                <ExTouchableOpacity style={styles.btnSearch}>
                                    <FontAwesome5Icon size={20} name="search"></FontAwesome5Icon>
                                </ExTouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.myWatchList}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Your view list </Text>
                            <ExTouchableOpacity style={styles.watchListPreview}>
                                {watch_list.map((page, index) => (
                                    <Image key={index} source={{ uri: page.avatar_url }}
                                        style={{
                                            ...styles.watchListItem,
                                            marginLeft: index === 0 ? 0 : -10,
                                            zIndex: watch_list.length - index
                                        }}></Image>
                                ))}
                            </ExTouchableOpacity>
                        </View>
                        <WatchList>

                        </WatchList>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        videoControl: state.videoControl,
        watchVideos: state.watchVideos
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setWatchingVideo: (playingId, isPlaying = true) => dispatch(SetWatchingVideo(playingId, isPlaying))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)
const styles = StyleSheet.create({
    container: {
    },
    titleWrapper: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    rightOptionWrapper: {
        flexDirection: 'row'
    },
    btnMyList: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSearch: {
        marginLeft: 10,
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    myWatchList: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    watchListPreview: {
        flexDirection: 'row'
    },
    watchListItem: {
        height: 30,
        width: 30,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    }
})
