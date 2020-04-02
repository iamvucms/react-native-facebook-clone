import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Clipboard } from 'react-native'
import Toast from 'react-native-root-toast';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
export default class AvatarOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
    }

    onPressBackdropHandler() {
        navigation.goBack()
    }
    render() {
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
                                <Text style={styles.postOptionTitle}>Add wrapper</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="minus-square" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Record video avatar</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="globe-asia" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Select video avatar</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="trash-alt" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Select avatar</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="history" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Turn on avatar shield</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="bell" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Create design</Text>
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
