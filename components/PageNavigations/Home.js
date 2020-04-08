import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import PostTool from '../PostTool'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { Video } from 'expo-av'
import { connect } from 'react-redux'
import { SCREEN_WIDTH } from '../../constants'
import { navigation } from '../../rootNavigation'
import PagePostList from '../PagePostList'
class Home extends Component {
    constructor(props) {
        super(props)
    }
    onPressVideoDetailHandler(videoId) {
        navigation.navigate('WatchDetail', {
            id: videoId
        })
    }
    onPressPhotoDetailHandler(postId) {
        navigation.navigate('PagePostDetail', {
            postId
        })
    }
    render() {
        const { page, videos, photos, posts } = this.props
        const previewVideos = [...videos].splice(0, 4)
        const previewPhotos = [...photos].splice(0, 4)
        const fans = [...page.fans]
        return (
            <View style={styles.container}>
                <View style={styles.topFansWrapper}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Top Fans</Text>
                    <View style={styles.topFans}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500'
                        }}>{page.fan_count} Top Fans</Text>
                        <View style={styles.fansPreviewWrapper}>
                            {fans.splice(0, 6).map((people, index) => (
                                <View style={{
                                    position: 'relative'
                                }} key={index}>
                                    <Image style={{
                                        ...styles.fanAvatar,
                                        marginLeft: index === 0 ? 0 : -10
                                    }} source={{ uri: people.avatar_url }} />
                                    {index === 5 && (
                                        <View style={{
                                            position: 'absolute',
                                            width: 50,
                                            borderRadius: 50,
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            left: -10,
                                            top: 0,
                                            height: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: 12,
                                            }}>
                                                +{page.fan_count - 6}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                        <Text style={{
                            color: '#333'
                        }}>You 're a top fans! Keep engagin with this </Text>
                        <Text style={{
                            color: '#333'
                        }}>Page to maintain your top fan status </Text>
                    </View>
                    <TouchableOpacity style={styles.btnSeeAllTopFans}>
                        <Text style={{
                            color: '#318bfb',
                            fontWeight: '600'
                        }}>See All Top Fans</Text>
                    </TouchableOpacity>
                </View>
                <PostTool isWriteToPage={true} page={page} />
                <View style={styles.introduction}>
                    <View style={styles.topIntro}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>About</Text>
                        <TouchableOpacity style={styles.btnSuggestEditAbout}>
                            <FontAwesome5Icon name="edit" color="#318bfb" size={16} />
                            <Text style={{
                                color: '#318bfb',
                                fontWeight: '500',
                                marginLeft: 5
                            }}>Suggest Edits</Text>
                        </TouchableOpacity>
                    </View>
                    <ExTouchableOpacity style={styles.introLine}>
                        <View style={{
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <FontAwesome5Icon color="#333" name="globe-asia" size={16} />
                        </View>
                        <Text style={{
                            color: '#318bfb',
                            fontWeight: '500'
                        }}>{page.website}</Text>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.introLine}>
                        <View style={{
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <FontAwesome5Icon color="#333" name="facebook-messenger" size={18} />
                        </View>
                        <View>
                            <Text style={{
                                color: "#333",
                                fontWeight: '500'
                            }}>See what {page.name} is doing in Messenger</Text>
                            <Text style={{
                                color: '#318bfb',
                                fontWeight: '500'
                            }}>Get Started</Text>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.introLine}>
                        <View style={{
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <FontAwesome5Icon color="#333" name="phone" size={16} />
                        </View>
                        <Text style={{
                            color: '#318bfb',
                            fontWeight: '500'
                        }}>{page.phone}</Text>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.introLine}>
                        <View style={{
                            width: 30,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <FontAwesome5Icon color="#333" name="table" size={16} />
                        </View>
                        <Text style={{
                            color: '#318bfb',
                            fontWeight: '500'
                        }}>{page.categoryName}</Text>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnSeeAllAbout}>
                        <Text style={{
                            color: '#333',
                            marginRight: 5,
                        }}>See All</Text>
                        <FontAwesome5Icon name="chevron-right" size={16} />
                    </ExTouchableOpacity>
                </View>
                <View style={styles.createYourOwnPage}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500'
                    }}>Create your own page</Text>
                    <TouchableOpacity style={styles.btnCreatePage}>
                        <Text style={{
                            color: '#318bfb',
                            fontWeight: '500'
                        }}>Create page</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.previewVideoWrapper}>
                    <Text style={{
                        padding: 15,
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Videos</Text>
                    <ScrollView
                        bounces={false}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {previewVideos.map((video, index) => (
                            <ExTouchableOpacity
                                key={index}
                                onPress={this.onPressVideoDetailHandler.bind(this, video.id)}
                                style={styles.videoItem}>
                                <Video
                                    style={{
                                        height: 250,
                                        width: SCREEN_WIDTH
                                    }}
                                    usePoster={true}
                                    shouldPlay={false}
                                    source={{ uri: video.video.video_url }}>
                                </Video>
                                <View style={{
                                    paddingHorizontal: 15,
                                    marginVertical: 5
                                }}>
                                    <Text style={{
                                        fontWeight: '500',
                                        fontSize: 16
                                    }}>{video.title}</Text>
                                    <Text style={{
                                        color: '#333'
                                    }}>{video.create_at} - {video.seeCount > 1000 ? Math.round(video.seeCount / 1000) + 'k' : video.seeCount} views</Text>
                                </View>
                            </ExTouchableOpacity>
                        ))}

                    </ScrollView>
                    <ExTouchableOpacity style={styles.btnSeeAllAbout}>
                        <Text style={{
                            marginRight: 5
                        }}>See All</Text>
                        <FontAwesome5Icon name="chevron-right" size={16} />
                    </ExTouchableOpacity>
                </View>
                <View style={styles.previewVideoWrapper}>
                    <Text style={{
                        padding: 15,
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>Photos by {page.name}</Text>
                    <ScrollView
                        style={styles.previewPhotosWrapper}
                        bounces={false}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {previewPhotos.map((photo, index) => (
                            <ExTouchableOpacity
                                key={index}
                                onPress={this.onPressPhotoDetailHandler.bind(this, photo.id)}
                                style={{
                                    marginRight: index === previewPhotos.length - 1 ? 31 : 1
                                }}>
                                <Image style={styles.previewPhotoItem} source={{ uri: photo.image }} />
                            </ExTouchableOpacity>
                        ))}

                    </ScrollView>
                    <ExTouchableOpacity style={styles.btnSeeAllAbout}>
                        <Text style={{
                            marginRight: 5
                        }}>See All</Text>
                        <FontAwesome5Icon name="chevron-right" size={16} />
                    </ExTouchableOpacity>
                </View>
                <PagePostList pagePosts={posts} />
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        videos: state.page.videos,
        photos: state.page.photos,
        posts: state.page.posts
    }
}
export default connect(mapStateToProps, null)(Home);
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    topFansWrapper: {
        padding: 15,
        backgroundColor: "#fff",
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    topFans: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    fansPreviewWrapper: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    fanAvatar: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    btnSeeAllTopFans: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#edf2fa'
    },
    introduction: {
        paddingTop: 15,
        backgroundColor: '#fff',
        marginTop: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        marginBottom: 10
    },
    topIntro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    btnSuggestEditAbout: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    introLine: {
        paddingHorizontal: 15,
        marginVertical: 10,
        flexDirection: 'row'
    },
    btnSeeAllAbout: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    createYourOwnPage: {
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnCreatePage: {
        backgroundColor: '#edf2fa',
        paddingVertical: 5,
        borderRadius: 5,
        paddingHorizontal: 10
    },
    previewVideoWrapper: {
        marginVertical: 10,
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    videoItem: {
        borderWidth: 1,
        borderColor: '#ddd',
    },
    previewPhotoItem: {
        width: SCREEN_WIDTH * 0.4,
        height: 150,
        marginHorizontal: 1
    },
    previewPhotosWrapper: {
        paddingHorizontal: 15,
        paddingBottom: 10,
    }
})
