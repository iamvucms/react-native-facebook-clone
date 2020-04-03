import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Clipboard } from 'react-native'
import Toast from 'react-native-root-toast';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
import ExTouchableOpacity from '../../components/ExTouchableOpacity';
export default class AvatarOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
    }
    onPressSelectProfilePictureHandler() {
        navigation.navigate('PhotoChooser', {
            isMutiple: false
        })
    }
    onPressBackdropHandler() {
        navigation.goBack()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.backdrop}>
                    <ExTouchableOpacity onPress={this.onPressBackdropHandler.bind(this)} style={{ width: '100%', height: '100%' }}>

                    </ExTouchableOpacity>
                </View>
                <View style={styles.postOptionsWrapper}>
                    <ExTouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="crop-alt" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Add Frame</Text>
                            </View>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="video" size={20}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Record Profile Video</Text>
                            </View>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="file-video" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Select Profile Video</Text>
                            </View>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.postOptionItemWrapper} onPress={this.onPressSelectProfilePictureHandler}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="images" size={20}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Select profile picture</Text>
                            </View>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="shield-alt" size={24}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Turn on avatar shield</Text>
                            </View>
                        </View>
                    </ExTouchableOpacity>
                    <ExTouchableOpacity style={styles.postOptionItemWrapper}>
                        <View style={styles.postOptionItem}>
                            <View style={styles.optionIcon}><FontAwesome5Icon name="magic" size={20}></FontAwesome5Icon></View>
                            <View>
                                <Text style={styles.postOptionTitle}>Create design</Text>
                            </View>
                        </View>
                    </ExTouchableOpacity>

                </View>
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
        borderTopColor: '#ddd',
        borderTopWidth: 1,
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
        width: 30,

    },
    postOptionTitle: {
        fontSize: 16,
        textTransform: 'capitalize'
    },
    postOptionSubtitle: {
        fontSize: 12
    }
})
