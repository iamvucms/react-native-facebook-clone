import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Share, Image } from 'react-native'
import * as navigation from '../rootNavigation'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
class SharePost extends Component {
    constructor(props) {
        super(props)
    }
    onPressBackdropHandler() {
        navigation.goBack()
    }
    render() {
        const { user } = this.props
        console.log(user)
        return (
            <View style={styles.container}>
                <View style={styles.backdrop}>
                    <TouchableOpacity onPress={this.onPressBackdropHandler.bind(this)} style={{ height: "100%", width: "100%" }}>
                        <View></View>
                    </TouchableOpacity>
                </View>
                <View style={styles.shareWrapper}>
                    <View style={styles.editorWrapper}>
                        <View style={styles.titleWrapper}>
                            <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
                            <View>
                                <TouchableOpacity>
                                    <Text style={styles.nameText}>{user.name}</Text>
                                </TouchableOpacity>
                                <View style={styles.areaOptionsWrapper}>
                                    <TouchableOpacity style={styles.areaOptionItem}>
                                        <Text style={{ color: '#333' }}>Facebook</Text>
                                        <FontAwesome5Icon color='#333' name="caret-down" size={20}></FontAwesome5Icon>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.areaOptionItem}>
                                        <Text style={{ color: '#333' }}>Public</Text>
                                        <FontAwesome5Icon color='#333' name="caret-down" size={20}></FontAwesome5Icon>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.editor}>

                        </View>
                    </View>
                    <View style={styles.shareOptionsWrapper}>
                        <TouchableOpacity style={styles.shareOptionItem}>
                            <View style={styles.shareOption}>
                                <View style={{ alignItems: 'center', width: 25 }}>
                                    <FontAwesome5Icon style={styles.shareOptionIcon} name="plus-circle" size={20} />
                                </View>
                                <Text style={styles.shareOptionText}>Share to your story</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareOptionItem}>
                            <View style={styles.shareOption}>
                                <View style={{ alignItems: 'center', width: 25 }}>
                                    <FontAwesome5Icon style={styles.shareOptionIcon} name="plus-circle" size={20} />
                                </View>
                                <Text style={styles.shareOptionText}>Share to your page's story</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareOptionItem}>
                            <View style={styles.shareOption}>
                                <View style={{ alignItems: 'center', width: 25 }}>
                                    <FontAwesome5Icon style={styles.shareOptionIcon} name="facebook-messenger" size={22} />
                                </View>
                                <Text style={styles.shareOptionText}>Send over Messenger</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareOptionItem}>
                            <View style={styles.shareOption}>
                                <View style={{ alignItems: 'center', width: 25 }}>
                                    <FontAwesome5Icon style={styles.shareOptionIcon} name="users" size={18} />
                                </View>
                                <Text style={styles.shareOptionText}>Share to a group</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareOptionItem}>
                            <View style={styles.shareOption}>
                                <View style={{ alignItems: 'center', width: 25 }}>
                                    <FontAwesome5Icon style={styles.shareOptionIcon} name="share-alt" size={20} />
                                </View>
                                <Text style={styles.shareOptionText}>Other options</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, null)(SharePost)
// export default SharePost
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: screenHeight
    },
    backdrop: {
        position: 'absolute',
        height: "100%",
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%'
    },
    shareWrapper: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 18,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 2,
        width: '100%',
        padding: 15,
        bottom: 0,
        left: 0,

    },
    shareOptionsWrapper: {

    },
    shareOptionItem: {
        paddingVertical: 10
    },
    shareOption: {
        flexDirection: 'row'
    },
    shareOptionText: {
        fontSize: 16,
        marginLeft: 5
    },
    editorWrapper: {
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 10
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    areaOptionsWrapper: {
        marginTop: 5,
        flexDirection: 'row',
    },
    areaOptionItem: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        borderWidth: 0.5,
        borderColor: '#333',
        borderRadius: 5,
        marginRight: 5,
        alignItems: 'center'
    },
    editor: {
        height: 250
    }
})
