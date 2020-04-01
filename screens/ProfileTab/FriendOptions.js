import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Clipboard } from 'react-native'
import Toast from 'react-native-root-toast';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
import ExTouchableOpacity from '../../components/ExTouchableOpacity';
export default class FriendOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
    }
    onPressCopyPostLinkHandler() {
        const { friend } = this.props.route.params
        setTimeout(() => {
            this.setState({
                ...this.state,
                isVisible: false
            })
        }, 2000)
        Clipboard.setString(`https://fakebook.com/posts/${friend.id}`)
        this.setState({
            ...this.state,
            isVisible: true
        })
    }
    onPressBackdropHandler() {
        navigation.goBack()
    }
    render() {
        const { friend } = this.props.route.params
        return (
            <View style={styles.container}>
                <View style={styles.backdrop}>
                    <ExTouchableOpacity onPress={this.onPressBackdropHandler.bind(this)} style={{ width: '100%', height: '100%' }}>

                    </ExTouchableOpacity>
                </View>
                <View style={styles.postOptionsWrapper}>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="bookmark" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>View {friend.name}'s friends</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="minus-square" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Send message to {friend.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="globe-asia" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Unfollow {friend.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="trash-alt" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Block {friend.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="history" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Remove {friend.name} in friends list</Text>
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
