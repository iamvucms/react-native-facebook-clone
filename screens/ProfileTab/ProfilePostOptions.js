import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Clipboard } from 'react-native'
import Toast from 'react-native-root-toast';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
export default class ProfilePostOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
    }
    onPressCopyPostLinkHandler() {
        const { postDetail } = this.props.route.params
        setTimeout(() => {
            this.setState({
                ...this.state,
                isVisible: false
            })
        }, 2000)
        Clipboard.setString(`https://fakebook.com/posts/${postDetail.id}`)
        this.setState({
            ...this.state,
            isVisible: true
        })
    }
    onPressBackdropHandler() {
        navigation.goBack()
    }
    render() {
        const { postDetail } = this.props.route.params
        return (
            <View style={styles.container}>
                <View style={styles.backdrop}>
                    <TouchableOpacity onPress={this.onPressBackdropHandler.bind(this)} style={{ width: '100%', height: '100%' }}>

                    </TouchableOpacity>
                </View>
                <View style={styles.postOptionsWrapper}>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="bookmark" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Book mark this post</Text>
                                <Text style={styles.postOptionSubtitle}>Add to saved list</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="minus-square" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Hide this post on timeline</Text>
                                <Text style={styles.postOptionSubtitle}>This post may still appears in newfeeds</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="globe-asia" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Edit privacy</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="trash-alt" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Remove</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="history" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>See edited content history</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="bell" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Turn on the notification about this post</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressCopyPostLinkHandler.bind(this)} style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="clone" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Copy post's link</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Toast
                    visible={this.state.isVisible}
                    position={Toast.positions.BOTTOM}
                    shadow={false}
                    animation={false}
                    hideOnPress={true}
                >Copied to clipboard</Toast>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        position: 'relative',
    },
    backdrop: {
        height: '100%',
        width: '100%',
        zIndex: 1
    },
    postOptionsWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 2,
        padding: 15,
        backgroundColor: '#fff'
    },
    postOptionItemWrapper: {
        paddingBottom: 20
    },
    postOptionItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionIcon: {
        width: 35,
        alignItems: 'center'
    },
    postOptionTitle: {
        fontSize: 16
    },
    postOptionSubtitle: {
        fontSize: 12
    }
})
