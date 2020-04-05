import React, { Component } from 'react'
import { Keyboard, Animated, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, Image, Dimensions, ImageBackground, KeyboardAvoidingView } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { PanGestureHandler, State, TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { FetchBgColorsRequest } from '../../actions/bgColorsActions'
import * as navigation from '../../rootNavigation'
class FullPostTool extends Component {
    constructor(props) {
        super(props)
        this._editorWrapperHeight = new Animated.Value(100)
        this.state = {
            selectedBgColorId: 0
        }
        this._isShowBgColors = true
        this._bgColorListWidth = new Animated.Value(screenWidth - 60)
        this._toggleZindexValue = new Animated.Value(2)
        this._degTransformToggle = new Animated.Value(0)
        this._scaleTransformToggle = new Animated.Value(0)
        this._isKeyBoardVisibled = false
        this._distanceTopOption = new Animated.Value(0)
        this._prevTranslatetionY = 0
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this._keyboardDidShow.bind(this),
        );
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow',
            this._keyboardWillShow.bind(this),
        );
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this._keyboardDidHide.bind(this),
        );
        const { fetchBgColors } = this.props
        fetchBgColors()
    }
    _keyboardWillShow() {
        this._distanceTopOption.setValue(0)
        this._prevTranslatetionY = 0
    }
    _keyboardDidShow() {
        this._isKeyBoardVisibled = true
        if (!this._isShowBgColors) {
            Animated.timing(this._scaleTransformToggle, {
                toValue: 0,
                duration: 100
            }).start(() => {
                this._toggleZindexValue.setValue(2)
                Animated.timing(this._degTransformToggle, {
                    toValue: 0,
                    duration: 200
                }).start(() => { })
            })
            Animated.spring(this._bgColorListWidth, {
                toValue: screenWidth - 60,
                duration: 300
            }).start(() => {
                this._isShowBgColors = true
            })
        }
    }

    _keyboardDidHide() {
        this._isKeyBoardVisibled = false
    }
    componentDidUpdate() {
        const { bgColors } = this.props
        if (bgColors.length === 0) return;
        this.preloadBgImages(bgColors)
    }
    preloadBgImages(bgImages) {
        let preFetchTasks = [];
        for (let bgImage of bgImages) {
            if (!bgImage.isPureColor) {
                preFetchTasks.push(Image.prefetch(bgImage.bgImage_url));
            }
        }
        Promise.all(preFetchTasks).then((results) => {
            let downloadedAll = true;
            results.forEach((result) => {
                if (!result) {
                    downloadedAll = false;
                }
            })
        })
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onContentSizeChangeHandler({ nativeEvent }) {
        const { height } = nativeEvent.contentSize
        Animated.timing(this._editorWrapperHeight, {
            toValue: height + 20,
            duration: 0
        }).start()
    }
    onGestureEventHandler({ nativeEvent }) {
        if (!this._isKeyBoardVisibled) {
            const { translationY } = nativeEvent
            if (this._prevTranslatetionY - translationY > 610) return;
            this._distanceTopOption.setValue(this._prevTranslatetionY - translationY)
        }
    }
    onHandlerStateChangeHandler({ nativeEvent }) {
        if (this._isKeyBoardVisibled) return;
        if (nativeEvent.state === State.END) {
            let { translationY } = nativeEvent
            translationY = this._prevTranslatetionY - translationY
            if (Math.abs(translationY) < 150) {
                Animated.spring(this._distanceTopOption, {
                    toValue: 0,
                    duration: 200
                }).start(() => this._prevTranslatetionY = 0)

            } else if (Math.abs(translationY) > 150 && Math.abs(translationY) < 350) {
                Animated.spring(this._distanceTopOption, {
                    toValue: 247.5,
                    duration: 200
                }).start(() => this._prevTranslatetionY = 247.5)

            } else {
                Animated.spring(this._distanceTopOption, {
                    toValue: 600,
                    duration: 200
                }).start(() => this._prevTranslatetionY = 600)

            }
        }
    }
    onSelectBgColorHandler(bgColorId) {
        this.setState({
            ...this.state,
            selectedBgColorId: bgColorId
        })
    }
    onTogglebBgColorListHandler() {
        if (!this._isShowBgColors) {
            Animated.timing(this._scaleTransformToggle, {
                toValue: 0,
                duration: 100
            }).start(() => {
                this._toggleZindexValue.setValue(2)
                Animated.timing(this._degTransformToggle, {
                    toValue: 0,
                    duration: 200
                }).start(() => { })
            })
            Animated.spring(this._bgColorListWidth, {
                toValue: screenWidth - 60,
                duration: 300
            }).start(() => {
                this._isShowBgColors = true
            })
        } else {
            Animated.timing(this._degTransformToggle, {
                toValue: -90,
                duration: 100
            }).start(() => {
                this._toggleZindexValue.setValue(0)
                Animated.timing(this._scaleTransformToggle, {
                    toValue: 1,
                    duration: 200
                }).start(() => { })
            })
            Animated.timing(this._bgColorListWidth, {
                toValue: 0,
                duration: 300
            }).start(() => {
                this._isShowBgColors = false
            })
        }

    }
    onPressShowOptions() {
        Keyboard.dismiss()
        if (this._prevTranslatetionY == 0) {
            Animated.spring(this._distanceTopOption, {
                toValue: 247.5,
                duration: 200
            }).start(() => this._prevTranslatetionY = 247.5)
        } else if (this._prevTranslatetionY === 247.5) {
            Animated.spring(this._distanceTopOption, {
                toValue: 600,
                duration: 200
            }).start(() => this._prevTranslatetionY = 600)
        } else {
            Animated.spring(this._distanceTopOption, {
                toValue: 247.5,
                duration: 200
            }).start(() => this._prevTranslatetionY = 247.5)
        }
    }
    render() {
        if (this.props.route.params === undefined) this.props.route.params = {}
        const { isInGroup, groupDetail, isPostToAnyOne, userX } = this.props.route.params
        const { user, } = this.props
        const { bgColors } = this.props
        const bgColorListWidth = this._bgColorListWidth
        const toggleZindexValue = this._toggleZindexValue
        const degTransformToggle = this._degTransformToggle.interpolate({
            inputRange: [-90, 0],
            outputRange: ["-90deg", "0deg"]
        })
        const distanceTopOption = this._distanceTopOption.interpolate({
            inputRange: [-660, 0, 660],
            outputRange: [710, 50, -610]
        })
        const scaleTransformToggle = this._scaleTransformToggle
        if (bgColors.length === 0) return <View></View>
        const selectedBgColor = bgColors.filter((bgColor) => bgColor.id === this.state.selectedBgColorId)[0]
        const editorWrapperHeight = this._editorWrapperHeight
        return (
            <KeyboardAvoidingView style={styles.parentContainer} enabled behavior="height">
                <SafeAreaView style={styles.container}>
                    <View style={styles.navigationBar}>
                        <TouchableOpacity onPress={this.onPressGoBackHandler.bind(this)} style={styles.naviIcon}>
                            <FontAwesome5Icon color="#000" name="arrow-left" size={20}></FontAwesome5Icon>
                        </TouchableOpacity>
                        <Text style={styles.naviTitle}>{isInGroup ? groupDetail.name : (isPostToAnyOne ? `On ${userX.name}'s timeline` : 'Create a post')}</Text>
                        <TouchableOpacity style={styles.btnPost}>
                            <Text style={{ fontSize: 16 }}>POST</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Image style={styles.avatar} source={{ uri: user.avatar_url }}></Image>
                        <View>
                            <Text style={styles.name}>{user.name}</Text>
                            <View style={styles.areaWrapper}>
                                <TouchableOpacity style={styles.areaOption}>
                                    <FontAwesome5Icon style={{ marginRight: 3 }} name="globe-asia" size={14}> </FontAwesome5Icon>
                                    <Text>Public</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.areaOption}>
                                    <FontAwesome5Icon style={{ marginRight: 3 }} name="plus" size={14}></FontAwesome5Icon>
                                    <Text>Public</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    {selectedBgColor &&
                        <ImageBackground source={!selectedBgColor.isPureColor ? { uri: selectedBgColor.bgImage_url } : {}} style={{ ...styles.editorWrapper, backgroundColor: selectedBgColor.isPureColor ? selectedBgColor.color : '' }}>
                            <Animated.View style={{
                                height: editorWrapperHeight,
                                alignSelf: 'stretch',
                                width: '100%',
                                justifyContent: 'center',
                            }}>
                                <TextInput
                                    onContentSizeChange={this.onContentSizeChangeHandler.bind(this)}
                                    placeholderTextColor={selectedBgColor.textColor}
                                    placeholder="What are you thinking ?"
                                    multiline style={{
                                        ...styles.editor, fontSize: 26,
                                        textAlign: 'center', color: selectedBgColor.textColor, fontWeight: 'bold'
                                    }}>
                                </TextInput>
                            </Animated.View>
                        </ImageBackground>
                    }

                    <Animated.View style={styles.toolOptionsWrapper}>
                        <View style={styles.bgColorsWrapper}>
                            <TouchableWithoutFeedback style={styles.btnBgColor} onPress={this.onTogglebBgColorListHandler.bind(this)}>
                                <Animated.Image style={{ ...styles.bgImage, ...styles.toggleBgColors, zIndex: toggleZindexValue, transform: [{ rotate: degTransformToggle }] }} source={require('../../assets/icons/left-arrow.png')} />
                                <Animated.Image style={{ ...styles.bgImage, ...styles.toggleBgColors, zIndex: 1, transform: [{ scale: scaleTransformToggle }] }} source={require('../../assets/icons/letter-a.png')} />
                            </TouchableWithoutFeedback>
                            <Animated.View style={{ flexDirection: 'row', width: bgColorListWidth }}>
                                <ScrollView horizontal={true} style={{ ...styles.bgColorsScrollView }} showsHorizontalScrollIndicator={false}>
                                    {bgColors.map((bgColor, index) => (
                                        <View key={index}>
                                            {bgColor.isPureColor &&
                                                <TouchableWithoutFeedback style={styles.bgColor} onPress={this.onSelectBgColorHandler.bind(this, bgColor.id)}>
                                                    <View style={{ backgroundColor: bgColor.color, ...styles.bgImage, borderColor: this.state.selectedBgColorId === bgColor.id ? '#318bfb' : '#333', borderWidth: this.state.selectedBgColorId === bgColor.id ? 3 : 1 }}></View>
                                                </TouchableWithoutFeedback>
                                            }
                                            {!bgColor.isPureColor &&
                                                <TouchableWithoutFeedback style={styles.bgColor} onPress={this.onSelectBgColorHandler.bind(this, bgColor.id)}>
                                                    <Image style={{ ...styles.bgImage, borderColor: this.state.selectedBgColorId === bgColor.id ? '#318bfb' : '#333', borderWidth: this.state.selectedBgColorId === bgColor.id ? 3 : 1 }} source={{ uri: bgColor.bgImage_url }}></Image>
                                                </TouchableWithoutFeedback>
                                            }

                                        </View>
                                    ))}
                                </ScrollView>
                                <TouchableWithoutFeedback style={styles.btnBgColor} onPress={() => console.log("okeee")}>
                                    <Image style={{ ...styles.bgImage, ...styles.moreBgColors }} source={require('../../assets/icons/more.png')}></Image>
                                </TouchableWithoutFeedback>
                            </Animated.View>
                        </View>
                        <PanGestureHandler
                            onGestureEvent={this.onGestureEventHandler.bind(this)}
                            onHandlerStateChange={this.onHandlerStateChangeHandler.bind(this)}
                            enabled={true}
                        >
                            <Animated.View style={{ ...styles.optionsWrapper, top: distanceTopOption }}>
                                <TouchableWithoutFeedback onPress={this.onPressShowOptions.bind(this)}>
                                    <View style={styles.optionTitle}>
                                        <Text style={{ fontSize: 16 }}>Add to your post</Text>
                                        <View style={styles.optionImagesWrapper}>
                                            <Image style={styles.optionImage} source={require('../../assets/icons/photo.png')}></Image>
                                            <Image style={styles.optionImage} source={require('../../assets/icons/friend.png')}></Image>
                                            <Image style={styles.optionImage} source={require('../../assets/icons/emoji.png')}></Image>
                                            <Image style={styles.optionImage} source={require('../../assets/icons/gps.png')}></Image>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/photo.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>Image/Video</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/friend.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>Tag your friends</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/emoji.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>Emotion/Activity</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/gps.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>Check in</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/live-news.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>Live Stream</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/photograph.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>Camera</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/letter-a.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>Background</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/360-view.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>3D Image</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/gif.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>File GIF</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/popcorn.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>Watch together</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('do not thing')}>
                                    <View style={{ ...styles.optionTitle, justifyContent: 'flex-start' }}>
                                        <Image style={{ ...styles.optionImage, width: 30, marginRight: 15 }} source={require('../../assets/icons/like.png')}></Image>
                                        <Text style={{ fontSize: 16 }}>Request recommends</Text>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        </PanGestureHandler>
                    </Animated.View>
                </SafeAreaView >
            </KeyboardAvoidingView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        bgColors: state.bgColors
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchBgColors: () => dispatch(FetchBgColorsRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FullPostTool)
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    parentContainer: {
        height: screenHeight,
        position: 'relative'
    },
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#fff'
    },
    navigationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: 50,
    },
    naviIcon: {
        padding: 10,
    },
    naviTitle: {
        paddingHorizontal: 10,
        fontSize: 16
    },
    btnPost: {
        position: 'absolute',
        right: 10,
        justifyContent: 'center'
    },
    infoWrapper: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    areaWrapper: {
        flexDirection: 'row'
    },
    areaOption: {
        marginRight: 10,
        paddingHorizontal: 5,
        paddingVertical: 2.5,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 10,
        borderRadius: 50,
        width: 40,
        height: 40
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    editorWrapper: {
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    },
    editor: {
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    toolOptionsWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingBottom: 55,
    },
    optionsWrapper: {
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        left: 0,
        zIndex: 999999
    },
    optionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 55,
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    optionImagesWrapper: {
        flexDirection: 'row',
        zIndex: 1
    },
    optionImage: {
        height: 25,
        resizeMode: "contain"
    },
    bgColorsWrapper: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50
    },
    bgColorsScrollView: {
        flexDirection: 'row'
    },
    btnBgColor: {
        height: 30,
        width: 30,
    },
    bgColor: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
    },
    bgImage: {
        resizeMode: 'cover',
        height: 30,
        width: 30,
        borderRadius: 10,
        borderWidth: 1,

    },
    toggleBgColors: {
        padding: 5,
        borderWidth: 0,
        position: 'absolute',
        top: 0,
        left: 0
    },
    moreBgColors: {

    }

})
