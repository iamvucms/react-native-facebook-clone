import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ScaledImage from '../../ScaledImage'
export default class StoryAdder extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { user } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.8}>
                    <ImageBackground imageStyle={{ resizeMode: 'cover' }} style={styles.imageBackground} source={{ uri: user.avatar_url }}>
                        <View style={styles.iconWrapper}>
                            <Icon name='plus' size={24} color='#318bfb' />
                        </View>
                    </ImageBackground>
                    <View style={styles.nameWrapper}>
                        <Text style={styles.name}>Add your story</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 5,

    },
    imageBackground: {
        position: 'relative',
        height: 250,
        width: 150,
    },
    iconWrapper: {
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 50,
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {

    },
    nameWrapper: {
        position: 'absolute',
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 10
    }
})