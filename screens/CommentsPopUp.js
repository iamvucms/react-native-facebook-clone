import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Comment from '../components/Comment'
import * as navigation from '../rootNavigation'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollEnabled: true
        }
    }
    componentDidMount() {
    }
    onPressBtnBackHandler() {
        navigation.goBack()
    }
    onPressBackDropHandler() {
        navigation.goBack()
    }
    onScrollHandler(event) {
        if (event.nativeEvent.contentOffset.y === 0) {
            // this.setState({
            //     ...this.state,
            //     scrollEnabled: false
            // })
            // navigation.goBack()
        }
    }
    render() {
        const { comments } = this.props.route.params
        return (
            <View style={{ backgroundColor: 'rgba(255,255,255,0.0)' }}>
                <TouchableWithoutFeedback onPress={this.onPressBackDropHandler}>
                    <View style={{ height: 120 }}></View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <View style={styles.navigationStackBar}>
                        <TouchableOpacity onPress={this.onPressBtnBackHandler} style={styles.btnBack}>
                            <FontAwesome5Icon name="arrow-left" size={24}></FontAwesome5Icon>
                        </TouchableOpacity>
                        <View style={styles.stackBarTitle}>
                            <Text style={{ fontSize: 16 }}>Comments</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.commentsWrapper}>
                        {comments.map((comment, index) => (
                            <Comment key={index} comment={comment}>Detail</Comment>
                        ))}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
    },
    commentsWrapper: {
        padding: 10,
        marginBottom: 70,
        backgroundColor: '#fff',
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
    }
})
