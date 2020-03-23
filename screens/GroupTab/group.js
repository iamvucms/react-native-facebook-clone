import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, ImageBackground, Image, Modal } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import GroupPostTool from '../../components/PostTool/GroupPostTool'
import { connect } from 'react-redux'
import { FetchGroupDetailRequest } from '../../actions/groupDetailActions'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants'
import * as navigation from '../../rootNavigation'
import GroupPosts from '../../components/GroupPosts'
class Group extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { id } = this.props.route.params
        const { fetchGroupDetail } = this.props
        fetchGroupDetail(id)
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    render() {
        const { groupDetail } = this.props
        if (!groupDetail.hasOwnProperty('id')) return <View></View>
        const { friendsInGroup } = groupDetail
        return (
            <View style={styles.container}>
                <View style={styles.searchToolWrapper}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler}>
                        <FontAwesome5Icon size={20} color="#fff" name="arrow-left"></FontAwesome5Icon>
                    </ExTouchableOpacity>
                    <View style={styles.rightIconsWrapper}>
                        <ExTouchableOpacity>
                            <FontAwesome5Icon name="search" size={20} color="#fff"></FontAwesome5Icon>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity>
                            <FontAwesome5Icon name="ellipsis-h" size={20} color="#fff"></FontAwesome5Icon>
                        </ExTouchableOpacity>
                    </View>
                </View>
                <ScrollView bounces={false}>
                    <ImageBackground source={{ uri: groupDetail.cover_url }}
                        style={styles.cover}>
                        <View style={styles.darkBox}></View>
                    </ImageBackground>
                    <View style={styles.introWrapper}>
                        <ExTouchableOpacity>
                            <View style={styles.nameWrapper}>
                                <Text style={styles.groupName}>{groupDetail.name}</Text>
                                <FontAwesome5Icon name="chevron-right"></FontAwesome5Icon>
                            </View>
                            <Text style={{ color: 'gray' }}>{groupDetail.isPublic ? 'PUBLIC GROUP' : 'PRIVATE GROUP'} - {groupDetail.member} MEMBERS</Text>
                        </ExTouchableOpacity>
                        <View style={styles.friendsInGroup}>
                            <ExTouchableOpacity style={styles.friendAvatarsWrapper}>
                                {friendsInGroup.map((friend, index) => (
                                    <ImageBackground key={index} source={{ uri: friend.avatar_url }}
                                        style={{ ...styles.friendAvatar, marginLeft: index > 0 ? -10 : 0, zIndex: friendsInGroup.length - index }}>
                                        {index === friendsInGroup.length - 1 && (
                                            <View style={styles.btnMoreMembers}>
                                                <FontAwesome5Icon name="ellipsis-h"
                                                    size={16} color="#fff"></FontAwesome5Icon>
                                            </View>
                                        )}
                                    </ImageBackground>
                                ))}
                            </ExTouchableOpacity>
                            <ExTouchableOpacity style={styles.btnInvite}>
                                <FontAwesome5Icon size={16} color="#fff" name="plus" ></FontAwesome5Icon>
                                <Text style={{ color: '#fff', marginLeft: 5, fontWeight: 'bold', fontSize: 16 }}>Invite</Text>
                            </ExTouchableOpacity>

                        </View>
                    </View>
                    <ScrollView bounces={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={styles.navigationsWrapper}>
                        <ExTouchableOpacity style={styles.navigation}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Announced</Text>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.navigation}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Watch together</Text>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.navigation}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Photos</Text>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.navigation}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Event</Text>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.navigation}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>File</Text>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={styles.navigation}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Album</Text>
                        </ExTouchableOpacity>
                        <ExTouchableOpacity style={{ ...styles.navigation, marginRight: 15 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Thread</Text>
                        </ExTouchableOpacity>
                    </ScrollView>
                    <View style={styles.postToolWrapper}>
                        <GroupPostTool />
                    </View>
                    <GroupPosts isInGroup={true} groupId={groupDetail.id}></GroupPosts>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        groupDetail: state.groupDetail
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchGroupDetail: (id) => dispatch(FetchGroupDetailRequest(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Group);
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',

    },
    searchToolWrapper: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        position: 'absolute',
        width: '100%',
        height: 94,
        paddingTop: 44,
        left: 0,
        top: 0,
        zIndex: 99
    },
    rightIconsWrapper: {
        flexDirection: 'row',
        width: 70,
        justifyContent: 'space-between'
    },
    cover: {
        height: 250
    },
    darkBox: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    introWrapper: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 0
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    groupName: {
        marginRight: 10,
        fontSize: 30,
        fontWeight: 'bold'
    },
    friendsInGroup: {

        marginTop: 15,
        flexDirection: 'row'
    },
    friendAvatarsWrapper: {
        flexDirection: 'row'
    },
    friendAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        borderColor: '#fff',
        borderWidth: 3
    },
    btnMoreMembers: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnInvite: {
        backgroundColor: '#318bfb',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
        borderRadius: 48,
        borderColor: '#fff',
        borderWidth: 3
    },
    navigationsWrapper: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    navigation: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 48,
        marginHorizontal: 5
    },
    postToolWrapper: {
        marginBottom: 10
    }
})
