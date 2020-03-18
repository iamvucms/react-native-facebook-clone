import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native'
import { ScrollView, PanGestureHandler, State } from 'react-native-gesture-handler'
import Comment from '../components/Comment'
import * as navigation from '../rootNavigation'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { FIXED_STATUSBAR_HEIGHT } from '../constants'
export default class extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef();
        this.scrollRef = React.createRef();
        this.state = {
            enable: true,
            containerTop: 0,
            wentBack: false
        };
        console.log(State)
    }
    _onScrollDown(event) {
        if (!this.state.enable || this.state.wentBack) return;
        const { translationY, velocityY, state } = event.nativeEvent;
        // console.log(event)
        if (translationY > 180) {
            navigation.goBack()
            this.setState({
                ...this.state,
                wentBack: true
            })
            return;
        } else {
            this.setState({
                ...this.state,
                containerTop: translationY
            })
        }

    }

    _onScroll({ nativeEvent }) {
        if (nativeEvent.contentOffset.y <= 0 && !this.state.enable) {
            this.setState({ enable: true });
        }
        if (nativeEvent.contentOffset.y > 0 && this.state.enable) {
            this.setState({ enable: false });
        }
    }
    _onHandlerStateChangeHandler({ nativeEvent }) {
        if (!this.state.enable || this.state.wentBack) return;
        const { translationY, state } = nativeEvent;
        if (translationY <= 180) {
            if (state == State.END) {
                this.setState({
                    ...this.state,
                    containerTop: 0
                })
            }
        }
    }
    componentDidMount() {
    }
    onPressBtnBackHandler() {
        navigation.goBack()
    }
    onScrollHandler(event) {
    }
    render() {
        const { enable, containerTop } = this.state;
        const { comments } = this.props.route.params
        return (
            <View>
                <View style={styles.backdrop}>

                </View>
                <KeyboardAvoidingView behavior="height" enabled style={{ ...styles.keyboardAvoidingContainer, top: containerTop }}>
                    <View style={styles.navigationStackBar}>
                        <TouchableOpacity onPress={this.onPressBtnBackHandler} style={styles.btnBack}>
                            <FontAwesome5Icon name="arrow-left" size={24}></FontAwesome5Icon>
                        </TouchableOpacity>
                        <View style={styles.stackBarTitle}>
                            <Text style={{ fontSize: 16 }}>Comments</Text>
                        </View>
                    </View>
                    <PanGestureHandler
                        onHandlerStateChange={this._onHandlerStateChangeHandler.bind(this)}
                        enabled={enable}
                        ref={this.ref}
                        activeOffsetY={5}
                        failOffsetY={-5}
                        onGestureEvent={this._onScrollDown.bind(this)}
                    >
                        <ScrollView
                            ref={this.scrollRef}
                            waitFor={enable ? this.ref : this.scrollRef}
                            scrollEventThrottle={40}
                            onScroll={this._onScroll.bind(this)} style={styles.container}
                        >
                            {comments.map((comment, index) => (
                                <Comment key={index} comment={comment}>Detail</Comment>
                            ))}
                        </ScrollView>
                    </PanGestureHandler>
                    <View style={styles.commentInputWrapper}>
                        <TouchableOpacity style={styles.cameraIconWrapper}>
                            <FontAwesome5Icon name="camera" size={20}></FontAwesome5Icon>
                        </TouchableOpacity>
                        <View style={styles.textInputWrapper}>
                            <TextInput autoFocus={true} style={styles.textInput}>

                            </TextInput>
                        </View>
                        <View style={styles.iconWrapper}>
                            <TouchableOpacity style={styles.iconItem}>
                                <FontAwesome5Icon name="grip-horizontal" size={20}></FontAwesome5Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconItem}>
                                <FontAwesome5Icon name="grin-wink" size={20}></FontAwesome5Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const STACK_NAVBAR_HEIGHT = 48
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: screenHeight,
        zIndex: 2
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1
    },
    container: {
        padding: 10,
        marginBottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT + 50,
        backgroundColor: '#ffffff',
    },
    commentInputWrapper: {
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT,
        left: 0,
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: '#fff',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconItem: {
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cameraIconWrapper: {
        backgroundColor: '#ddd',
        borderRadius: 50,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputWrapper: {
        height: 40,
        borderTopLeftRadius: 48,
        borderBottomLeftRadius: 48,
        backgroundColor: '#ddd',
        marginLeft: 10,
        width: screenWidth - 40 - 80 - 30 - 10,
        borderRightWidth: 0
    },
    textInput: {
        width: "100%",
        height: 40,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    iconWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderTopRightRadius: 48,
        borderBottomRightRadius: 48,
        height: 40,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0
    },
    navigationStackBar: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    btnBack: {
        zIndex: 99
    },
    stackBarTitle: {
        position: 'absolute',
        width: screenWidth,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 40,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    }
})
