import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../../constants'
import * as navigation from '../../rootNavigation'
import HighlightPhotos from '../../components/HighlightPhotos'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
export default class EditPublicInfo extends Component {
    constructor(props) {
        super(props)
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    render() {
        const { userInfo, highlightPhotos } = this.props.route.params
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
                    </ExTouchableOpacity>
                    <Text style={styles.navigationTitle}>Edit your profile</Text>
                </View>
                <ScrollView bounces={false} style={styles.detailsWrapper}>
                    <View style={{ ...styles.detail, paddingTop: 0 }}>
                        <View style={styles.detailTitleWrapper}>
                            <Text style={styles.detailTitle}>Avatar</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: "#318bfb" }}>Modify</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Image source={{ uri: userInfo.avatar_url }} style={styles.avatar}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.detailTitleWrapper}>
                            <Text style={styles.detailTitle}>Cover</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: "#318bfb" }}>Modify</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Image source={{ uri: userInfo.cover_url }} style={styles.cover}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.detailTitleWrapper}>
                            <Text style={styles.detailTitle}>Introduction</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: "#318bfb" }}>Modify</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={styles.introTxt}>{userInfo.introTxt}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.detailTitleWrapper}>
                            <Text style={styles.detailTitle}>Details</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: "#318bfb" }}>Modify</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.introListWrapper}>
                            <View style={styles.introLine}>
                                <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="briefcase" />
                                <Text style={styles.introLineText}>
                                    Work at <Text style={styles.introHightLight}>{userInfo.work_at}</Text>
                                </Text>
                            </View>
                            <View style={styles.introLine}>
                                <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="home" />
                                <Text style={styles.introLineText}>
                                    Live in <Text style={styles.introHightLight}>{userInfo.live_in}</Text>
                                </Text>
                            </View>
                            <View style={styles.introLine}>
                                <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="map-marker-alt" />
                                <Text style={styles.introLineText}>
                                    From <Text style={styles.introHightLight}>{userInfo.from}</Text>
                                </Text>
                            </View>
                            <View style={styles.introLine}>
                                <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="heart" />
                                <Text style={styles.introLineText}>
                                    Relationship <Text style={styles.introHightLight}>{userInfo.relationship}</Text>
                                </Text>
                            </View>
                            <View style={styles.introLine}>
                                <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="rss" />
                                <Text style={styles.introLineText}>
                                    Followed by <Text style={styles.introHightLight}>{userInfo.follower} </Text>followers
                            </Text>
                            </View>
                            <View style={styles.introLine}>
                                <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="github" />
                                <TouchableOpacity>
                                    <Text style={styles.introLineText}>
                                        {userInfo.links.github}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.introLine}>
                                <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="link" />
                                <TouchableOpacity>
                                    <Text style={styles.introLineText}>
                                        {userInfo.links.repl}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.introLine}>
                                <FontAwesome5Icon size={20} color="#333" style={styles.introIcon} name="ellipsis-h" />
                                <TouchableOpacity>
                                    <Text style={styles.introLineText}>
                                        View more introductory information
                                </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.detailTitleWrapper}>
                            <Text style={styles.detailTitle}>Hobbies</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: "#318bfb" }}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ ...styles.detail }}>
                        <View style={styles.detailTitleWrapper}>
                            <Text style={styles.detailTitle}>HighLight Photos</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: "#318bfb" }}>Modify</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} style={styles.highlightGallery}>
                            <HighlightPhotos isFullRadius={true} photos={highlightPhotos} />
                        </TouchableOpacity>
                    </View>
                    <View activeOpacity={0.9} style={{ ...styles.detail, ...styles.lastDetail }}>
                        <TouchableOpacity style={styles.btnModifyMore}>
                            <FontAwesome5Icon />
                            <Text style={{ color: '#318bfb', fontSize: 16, fontWeight: '500' }}>Modify introduction informations</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    navigationBar: {
        paddingTop: STATUSBAR_HEIGHT,
        flexDirection: 'row',
        height: 94,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    btnBack: {
        width: 50,
        alignItems: 'center'
    },
    navigationTitle: {
        fontSize: 18
    },
    detailsWrapper: {
        padding: 15,
        height: SCREEN_HEIGHT - (50 + STATUSBAR_HEIGHT)
    },
    detail: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: 15
    },
    detailTitleWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    avatar: {
        width: 140,
        height: 140,
        alignSelf: "center",
        borderRadius: 140
    },
    cover: {
        width: '100%',
        height: 200,
        marginVertical: 10,
        borderRadius: 10
    },
    introTxt: {
        color: '#333',
        alignSelf: 'center',
        marginVertical: 10
    },
    introListWrapper: {
        paddingVertical: 10
    },
    introLine: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    introIcon: {
        width: 30,
    },
    introLineText: {
        fontSize: 16,
        fontWeight: '400'
    },
    introHightLight: {
        fontWeight: 'bold',
        fontSize: 16
    },
    highlightGallery: {
        marginVertical: 10
    },
    lastDetail: {
        marginBottom: 30,
        borderBottomWidth: 0
    },
    btnModifyMore: {
        height: 40,
        width: '100%',
        backgroundColor: '#9dd0eb',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5
    }
})
