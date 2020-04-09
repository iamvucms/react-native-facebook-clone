import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Animated } from 'react-native'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { STATUSBAR_HEIGHT, SCREEN_WIDTH, pageNavigationTypes } from '../../constants'
import { connect } from 'react-redux'
import { FetchPageDetailRequest } from '../../actions/pageDetailActions'
import { navigation } from '../../rootNavigation'
import {
    Home, Introduction, Posts,
    Videos, Photos, Event, Community
} from '../../components/PageNavigations'
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOverScrollLimit: false,
            currentNavigationTab: pageNavigationTypes.HOME,
            isFixedNavigationBar: false
        }
        this._currentScrollOffsetY = 0
    }
    componentDidMount() {
        const { pageId } = this.props.route.params
        const { fetchPageDetail } = this.props
        fetchPageDetail(pageId)
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onPressChangeTabHandler(tabId) {
        setTimeout(() => {
            this.refs._mainScrollRef.scrollTo({
                x: 0,
                y: this._currentScrollOffsetY,
                animated: true
            })
        }, 200);
        this.refs._tabScrollRef.scrollTo({
            x: tabId * SCREEN_WIDTH,
            y: 0,
            animated: true
        })
        switch (tabId) {
            case pageNavigationTypes.HOME:
                this.setState({
                    ...this.state,
                    currentNavigationTab: pageNavigationTypes.HOME
                })
                break;
            case pageNavigationTypes.INTRODUCTION:
                this.setState({
                    ...this.state,
                    currentNavigationTab: pageNavigationTypes.INTRODUCTION
                })
                break;
            case pageNavigationTypes.POSTS:
                this.setState({
                    ...this.state,
                    currentNavigationTab: pageNavigationTypes.POSTS
                })
                break;
            case pageNavigationTypes.VIDEOS:
                this.setState({
                    ...this.state,
                    currentNavigationTab: pageNavigationTypes.VIDEOS
                })
                break;
            case pageNavigationTypes.PHOTOS:
                this.setState({
                    ...this.state,
                    currentNavigationTab: pageNavigationTypes.PHOTOS
                })
                break;
            case pageNavigationTypes.EVENT:
                this.setState({
                    ...this.state,
                    currentNavigationTab: pageNavigationTypes.EVENT
                })
                break;
            case pageNavigationTypes.COMMUNICATION:
                this.setState({
                    ...this.state,
                    currentNavigationTab: pageNavigationTypes.COMMUNICATION
                })
                break;
        }
    }
    onScrollHandler({ nativeEvent }) {
        const offsetY = nativeEvent.contentOffset.y
        this._currentScrollOffsetY = offsetY
        const { isOverScrollLimit, isFixedNavigationBar } = this.state
        if (offsetY > OFFSETY_LIMIT_FOR_FIX_NAVIGATION_BAR) {
            if (!isFixedNavigationBar) {
                this.setState({
                    ...this.state,
                    isFixedNavigationBar: true
                })
            }
        } else {
            if (isFixedNavigationBar) {
                this.setState({
                    ...this.state,
                    isFixedNavigationBar: false
                })
            }
        }
        if (isOverScrollLimit && offsetY < 250) {
            this.setState({
                ...this.state,
                isOverScrollLimit: false
            })
        }
        if (!isOverScrollLimit && offsetY > 250) {
            this.setState({
                ...this.state,
                isOverScrollLimit: true
            })
        }
    }
    render() {
        const { currentNavigationTab, isOverScrollLimit, isFixedNavigationBar } = this.state
        const { pageDetail } = this.props
        if (!pageDetail.hasOwnProperty("id")) return <View></View>
        const friendsLikePage = [...pageDetail.friendsLikePage]
        return (
            <View style={styles.container}>
                <View style={{
                    ...styles.bottomOptions,
                    display: isFixedNavigationBar ? 'flex' : 'none',
                }}>
                    <View style={{
                        ...styles.introOptionsWrapper,
                        marginTop: 0,
                    }}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnAddStory}>
                            <FontAwesome5Icon size={20} color="#fff" name={"video"} />
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginLeft: 5 }}>Watch video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnOption}>
                            <FontAwesome5Icon size={20} color="#000" name="facebook-messenger" />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnOption}>
                            <FontAwesome5Icon size={20} color="#000" name="ellipsis-h" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    ...styles.navigationBar,
                    backgroundColor: isOverScrollLimit ? '#fff' : 'rgba(0,0,0,0)'
                }}>
                    <ExTouchableOpacity
                        onPress={this.onPressGoBackHandler}
                        style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={20} color={isOverScrollLimit ? '#000' : "#fff"} />
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.mockInput}>
                        <FontAwesome5Icon name="search" size={16} color="#333" />
                        <Text style={{
                            color: '#333',
                            fontSize: 16, marginLeft: 10
                        }}>{pageDetail.name}</Text>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.btnBack}>
                        <FontAwesome5Icon name="share" size={20} color={isOverScrollLimit ? '#000' : "#fff"} />
                    </ExTouchableOpacity>
                    <View style={{
                        borderTopColor: '#ddd',
                        borderTopWidth: 0.5,
                        borderBottomColor: '#ddd',
                        borderBottomWidth: 1,
                        display: isFixedNavigationBar ? 'flex' : 'none',
                        opacity: isFixedNavigationBar ? 1 : 0,
                        position: 'absolute',
                        top: STATUSBAR_HEIGHT + 50,
                        left: 0,
                        width: '100%',
                        zIndex: 999
                    }}>
                        <ScrollView
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            style={styles.navigationTabs}>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.HOME)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.HOME ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.HOME ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.INTRODUCTION)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.INTRODUCTION ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.INTRODUCTION ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>About</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.POSTS)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.POSTS ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.POSTS ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Posts</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.VIDEOS)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.VIDEOS ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.VIDEOS ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Videos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.PHOTOS)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.PHOTOS ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.PHOTOS ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Photos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.EVENT)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.EVENT ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.EVENT ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Events</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.COMMUNICATION)} style={{
                                ...styles.tab,
                                marginRight: 20,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.COMMUNICATION ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.COMMUNICATION ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Community</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                </View>
                <ScrollView
                    ref="_mainScrollRef"
                    scrollEventThrottle={60}
                    onScroll={this.onScrollHandler.bind(this)}
                    bounces={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.wrapper}>
                        <Image style={styles.cover} source={{ uri: pageDetail.cover_url }} />
                        <View style={styles.Info}>
                            <View style={styles.mainInfo}>
                                <Image source={{ uri: pageDetail.avatar_url }} style={styles.avatar} />
                                <View style={styles.nameWrapper} >
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>{pageDetail.name}</Text>
                                    <Text style={{
                                        color: 'gray',
                                        fontWeight: "500"
                                    }}>{pageDetail.categoryName}</Text>
                                </View>
                                <TouchableOpacity style={styles.btnLike} >
                                    <FontAwesome5Icon name="thumbs-up" size={24} color="#318bfb" />
                                    <Text></Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.introOptionsWrapper}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnAddStory}>
                                    <FontAwesome5Icon size={20} color="#fff" name={"video"} />
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', marginLeft: 5 }}>Watch video</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnOption}>
                                    <FontAwesome5Icon size={20} color="#000" name="facebook-messenger" />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnOption}>
                                    <FontAwesome5Icon size={20} color="#000" name="ellipsis-h" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.friendsLikePage}>
                                <View style={styles.friendAvatarsWrapper}>
                                    {friendsLikePage.splice(0, 3).map((friend, index) => (
                                        <Image
                                            source={{ uri: friend.avatar_url }}
                                            key={index}
                                            style={{
                                                ...styles.friendAvatar,
                                                marginLeft: index === 0 ? 0 : -10,
                                                zIndex: friendsLikePage.length - index
                                            }} />
                                    ))}
                                </View>
                                <Text style={{
                                    fontSize: 14,
                                    marginLeft: 10,
                                    width: SCREEN_WIDTH - 30 - 88,
                                    color: '#333'
                                }}>
                                    {friendsLikePage.splice(0, 3)
                                        .map(friend => friend.name.split(' ')[1]).join(', ')} and {pageDetail.like_count} another people liked this page.
                                </Text>
                            </View>
                        </View>
                        <ScrollView
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            style={styles.navigationTabs}>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.HOME)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.HOME ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.HOME ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.INTRODUCTION)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.INTRODUCTION ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.INTRODUCTION ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>About</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.POSTS)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.POSTS ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.POSTS ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Posts</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.VIDEOS)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.VIDEOS ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.VIDEOS ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Videos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.PHOTOS)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.PHOTOS ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.PHOTOS ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Photos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.EVENT)} style={{
                                ...styles.tab,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.EVENT ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.EVENT ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Events</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressChangeTabHandler.bind(this, pageNavigationTypes.COMMUNICATION)} style={{
                                ...styles.tab,
                                marginRight: 20,
                                borderBottomWidth: currentNavigationTab === pageNavigationTypes.COMMUNICATION ? 2 : 0,
                            }}>
                                <Text style={{
                                    color: currentNavigationTab === pageNavigationTypes.COMMUNICATION ? '#318bfb' : 'gray',
                                    fontWeight: '600'
                                }}>Community</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        <ScrollView
                            style={styles.tabScreensWrapper}
                            ref="_tabScrollRef"
                            bounces={false}
                            scrollEnabled={false}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            <View style={{
                                width: SCREEN_WIDTH,
                                opacity: currentNavigationTab === pageNavigationTypes.HOME ? 1 : 0,
                                height: currentNavigationTab === pageNavigationTypes.HOME ? 'auto' : 0
                            }}>
                                <Home page={pageDetail} />
                            </View>
                            <View style={{
                                width: SCREEN_WIDTH,
                                opacity: currentNavigationTab === pageNavigationTypes.INTRODUCTION ? 1 : 0,
                                height: currentNavigationTab === pageNavigationTypes.INTRODUCTION ? 'auto' : 0
                            }}>
                                <Introduction page={pageDetail} />
                            </View>
                            <View style={{
                                width: SCREEN_WIDTH,
                                opacity: currentNavigationTab === pageNavigationTypes.POSTS ? 1 : 0,
                                height: currentNavigationTab === pageNavigationTypes.POSTS ? 'auto' : 0
                            }}>
                                <Posts page={pageDetail} />
                            </View>
                            <View style={{
                                width: SCREEN_WIDTH,
                                opacity: currentNavigationTab === pageNavigationTypes.VIDEOS ? 1 : 0,
                                height: currentNavigationTab === pageNavigationTypes.VIDEOS ? 'auto' : 0
                            }}>
                                <Videos />
                            </View>
                            <View style={{
                                width: SCREEN_WIDTH,
                                opacity: currentNavigationTab === pageNavigationTypes.PHOTOS ? 1 : 0,
                                height: currentNavigationTab === pageNavigationTypes.PHOTOS ? 'auto' : 0
                            }}>
                                <Photos page={pageDetail} />
                            </View>
                            <View style={{
                                width: SCREEN_WIDTH,
                                opacity: currentNavigationTab === pageNavigationTypes.EVENT ? 1 : 0,
                                height: currentNavigationTab === pageNavigationTypes.EVENT ? 'auto' : 0
                            }}>
                                <Event />
                            </View>
                            <View style={{
                                width: SCREEN_WIDTH,
                                opacity: currentNavigationTab === pageNavigationTypes.COMMUNICATION ? 1 : 0,
                                height: currentNavigationTab === pageNavigationTypes.COMMUNICATION ? 'auto' : 0
                            }}>
                                <Community page={pageDetail} />
                            </View>



                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        pageDetail: state.page.page,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPageDetail: pageId => dispatch(FetchPageDetailRequest(pageId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)
const OFFSETY_LIMIT_FOR_FIX_NAVIGATION_BAR = 250 + 64 + 10 + 15 + 40 + 36 + 30 - STATUSBAR_HEIGHT - 50
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    bottomOptions: {
        bottom: 0,
        zIndex: 99999,
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        backgroundColor: 'rgb(242,242,242)',
        padding: 5,
        paddingBottom: 20
    },
    navigationBar: {
        zIndex: 999,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        paddingTop: STATUSBAR_HEIGHT,
        height: STATUSBAR_HEIGHT + 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnBack: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mockInput: {
        flexDirection: 'row',
        height: 40,
        width: SCREEN_WIDTH - 120,
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: 'rgba(242,242,242,0.5)',
        paddingHorizontal: 15
    },
    cover: {
        height: 250
    },
    Info: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    mainInfo: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    avatar: {
        height: 64,
        width: 64,
        borderRadius: 64,
        borderColor: '#333',
        borderWidth: 0.2
    },
    nameWrapper: {
        width: SCREEN_WIDTH - 30 - 64 - 50,
        paddingHorizontal: 10
    },
    btnLike: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    introOptionsWrapper: {
        marginTop: 15,
        flexDirection: 'row'
    },
    btnAddStory: {
        backgroundColor: '#318bfb',
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 30 - 100 - 20, //paddingHorizontal optionBtnWidth, marginLeft
    },
    btnOption: {
        marginLeft: 10,
        borderRadius: 5,
        height: 40,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd'
    },
    friendsLikePage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15
    },
    friendAvatarsWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    friendAvatar: {
        height: 36,
        width: 36,
        borderRadius: 36,
        borderColor: '#fff',
        borderWidth: 3
    },
    navigationTabs: {
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    tab: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderBottomColor: '#318bfb'
    },
    tabScreensWrapper: {
    }
})
