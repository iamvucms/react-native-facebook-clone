import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Image, TouchableOpacity } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, notificationTypes } from '../../constants'
import { StackActions } from '@react-navigation/native'
import { navigation } from '../../rootNavigation'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

export default class NotificationOptions extends Component {
    constructor(props) {
        super(props)
    }
    componentDidUpdate() {
    }
    onPressBackdropHandler() {
        navigation.goBack()
    }
    render() {
        const { notification, Description } = this.props.route.params
        let displayAvatarUri;
        if (notification.type === notificationTypes.NEW_PHOTO_IN_GROUP
            || notification.type === notificationTypes.NEW_POST_IN_GROUP
        ) displayAvatarUri = notification.group.avatar_url
        else displayAvatarUri = notification.user.avatar_url
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.onPressBackdropHandler}
                    style={{ ...styles.backdrop, }}
                >
                    <View></View>
                </TouchableOpacity>
                <View style={styles.optionsWrapper}>
                    <Image style={styles.avatar} source={{ uri: displayAvatarUri }} />
                    <Description />
                    <View style={styles.options}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,.2)', borderRadius: 5, overflow: 'hidden' }}>
                            <TouchableOpacity style={styles.option}>
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <FontAwesome5Icon name="minus-square" size={20} color="#333" />
                                </View>
                                <Text style={styles.optionTxt}>Remove this notification.</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.option}>
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <FontAwesome5Icon name="bookmark" size={20} color="#333" />
                                </View>
                                <Text style={styles.optionTxt}>Save this.</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.option}>
                                <View style={{ width: 30, alignItems: 'center' }}>
                                    <FontAwesome5Icon name="bell-slash" size={20} color="#333" />
                                </View>
                                <Text style={styles.optionTxt}>Turn off notification about this.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        position: 'relative'
    },
    backdrop: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    optionsWrapper: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 2,
        backgroundColor: '#fff',
        padding: 15,
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderWidth: 0.2,
        borderColor: '#333'
    },
    options: {
        width: '100%',
        marginVertical: 10
    },
    option: {
        backgroundColor: '#fff',
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionTxt: {
        fontSize: 16,
        marginLeft: 10
    }
})
