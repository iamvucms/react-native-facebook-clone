import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputBgColor: "#fff"
        }
    }
    onLiveStreamPressHandler() {
        navigation.navigate('LiveStream')
    }
    onPhotoUploaderPressHandler() {
        navigation.navigate('PhotoChooser')
    }
    onCheckInPressHandler() {
        navigation.navigate('CheckIn')
    }
    onFullPostToolPressHandler() {
        navigation.navigate('FullPostTool')
    }
    onPressPostToAnyOneHandler() {
        const { userX, page } = this.props
        navigation.navigate('FullPostTool', {
            isPostToAnyOne: true,
            userX: userX || page
        })
    }

    onPressSharePhotoToAnyOne() {
        navigation.navigate('PhotoChooser')
    }
    render() {
        const { user, isWriteToAnyOne, userX, isWriteToPage, page } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.postToolWrapper}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.userAvatarWrapper}>
                        <Image source={{ uri: user.avatar_url }} style={styles.userAvatar} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={isWriteToAnyOne ? this.onPressPostToAnyOneHandler.bind(this) : this.onFullPostToolPressHandler} style={styles.postInputWrapper}>
                        <View style={{ ...styles.postInput, backgroundColor: this.state.inputBgColor }}>
                            <Text>{isWriteToAnyOne || isWriteToPage ? `Write somethings to ${userX?.name || page?.name}` : 'What are you thinking ?'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.postOptionsWrapper}>
                    {!isWriteToAnyOne && !isWriteToPage &&
                        <TouchableOpacity onPress={this.onLiveStreamPressHandler} activeOpacity={0.5} style={styles.postOptionItemWrapper}>
                            <View style={styles.postOptionItem}>
                                <FontAweSome5 style={styles.postOptionIcon} name="video" color="red" size={16} />
                                <Text>Live Stream</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={isWriteToAnyOne || isWriteToPage ? this.onPressPostToAnyOneHandler.bind(this) : this.onPhotoUploaderPressHandler} activeOpacity={0.5} style={styles.postOptionItemWrapper}>
                        <View style={{ ...styles.postOptionItem, ...styles.postOptionItemMiddle }}>
                            <FontAweSome5 style={styles.postOptionIcon} name={isWriteToAnyOne || isWriteToPage ? 'edit' : 'image'} color="green" size={16} />
                            <Text>{isWriteToAnyOne || isWriteToPage ? 'Write a post' : 'Photo'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={isWriteToAnyOne || isWriteToPage ? this.onPressSharePhotoToAnyOne.bind(this) : this.onCheckInPressHandler} activeOpacity={0.5} style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <FontAweSome5 style={styles.postOptionIcon} name={isWriteToAnyOne || isWriteToPage ? 'image' : "map-marker-alt"} color="red" size={16} />
                            <Text>{isWriteToAnyOne || isWriteToPage ? 'Share Photos' : 'Check in'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}
export default connect(mapStateToProps, null)(index)
const styles = StyleSheet.create({
    container: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    postToolWrapper: {
        padding: 10,
        flexDirection: 'row'
    },
    postOptionsWrapper: {
        flexDirection: 'row',
        height: 40,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        alignItems: 'center'
    },
    postOptionItemWrapper: {
        flex: 1,
        height: 40,
        justifyContent: 'center'
    },
    postOptionItem: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    postOptionItemMiddle: {
        borderRightColor: '#ddd',
        borderRightWidth: 1,
        borderLeftColor: '#ddd',
        borderLeftWidth: 1
    },
    postOptionIcon: {
        marginRight: 5
    },
    postInputWrapper: {
        borderRadius: 48,
        flex: 1,
        marginLeft: 5,
    },
    postInput: {
        justifyContent: 'center',
        borderRadius: 48,
        height: 40,
        width: "100%",
        borderColor: "#ddd",
        paddingHorizontal: 10,
        borderWidth: 1
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    userAvatarWrapper: {

    }
})
