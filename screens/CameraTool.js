import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, StatusBar, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera';
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { navigation } from '../rootNavigation';

import ExTouchableOpacity from '../components/ExTouchableOpacity';
class CameraTool extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: Camera.Constants.Type.back,
            isOnFlash: false,
            isTaked: false,
            picture: {}
        }
    }
    async componentDidMount() {
        const { status } = await Camera.requestPermissionsAsync();
        if (status === 'granted') {

        } else Alert.alert('Can not access to camera')
    }
    onPressToggleFlashHandler() {
        this.setState({
            ...this.state,
            isOnFlash: !this.state.isOnFlash
        })
    }
    async onPressTakePhotoHandler() {
        const picture = await this.camera.takePictureAsync()
        this.setState({
            isTaked: true,
            picture
        })
    }
    onPressSwitchCameraHandler() {
        this.setState({
            ...this.state,
            type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
        })
    }
    onPressBackHandler() {
        navigation.goBack()
    }
    render() {
        const { type, isOnFlash } = this.state
        const { systemImages } = this.props
        const displayImageUri = systemImages[0]?.uri
        const flashMode = isOnFlash ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
        const flashImage = isOnFlash ? require('../assets/icons/flash_on.png') : require('../assets/icons/flash_off.png')
        return (
            <View style={styles.container}>
                {/* <StatusBar hidden={true} /> */}
                <Camera
                    flashMode={flashMode}
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.container} type={type}>
                    <View style={styles.cameraToolWrapper}>
                        <View style={styles.navigatorBar}>
                            <ExTouchableOpacity onPress={this.onPressBackHandler}>
                                <FontAwesome5Icon name="times" size={24} color="#fff" />
                            </ExTouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome5Icon name="cog" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomTool}>
                            <View style={styles.mainTool}>
                                <TouchableOpacity>
                                    <Image style={styles.gallery} source={{ uri: displayImageUri }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onPressToggleFlashHandler.bind(this)}>
                                    <Image source={flashImage} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.onPressTakePhotoHandler.bind(this)}
                                    style={styles.btnTakePhoto}>
                                    <View style={styles.realBtnTakePhoto}>

                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onPressSwitchCameraHandler.bind(this)}>
                                    <Image source={require('../assets/icons/switch-camera.png')}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image style={{ width: 24, height: 24 }} source={require('../assets/icons/emoji.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Camera>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        systemImages: state.systemImages
    }
}
export default connect(mapStateToProps)(CameraTool);
const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    camera: {
        width: '100%', height: '100%'
    },
    cameraToolWrapper: {
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'relative'
    },
    navigatorBar: {
        marginTop: STATUSBAR_HEIGHT,
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomTool: {
        position: 'absolute',
        width: '100%',
        left: 0,
        bottom: 0,
        padding: 40
    },
    mainTool: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnTakePhoto: {
        height: 64,
        width: 64,
        borderRadius: 64,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    realBtnTakePhoto: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,1)',
    },
    gallery: {
        height: 24,
        width: 24,
        borderRadius: 5
    }
})
