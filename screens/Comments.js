import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Comment from '../components/Comment'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../rootNavigation'
export default class extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    onPressBtnBackHandler() {
        navigation.goBack()
    }
    render() {
        const { comments } = this.props.route.params
        return (
            <View>
                <View style={styles.navigationStackBar}>
                    <TouchableOpacity onPress={this.onPressBtnBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={24}></FontAwesome5Icon>
                    </TouchableOpacity>
                    <View style={styles.stackBarTitle}>
                        <Text style={{fontSize:16}}>Comments</Text>
                    </View>
                </View>
                <ScrollView style={styles.container}>
                    {comments.map((comment, index) => (
                        <Comment key={index} comment={comment}>Detail</Comment>
                    ))}
                </ScrollView>
            </View>
        )
    }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    navigationStackBar: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    btnBack: {

    },
    stackBarTitle: {
        position: 'absolute',
        width: screenWidth,
        justifyContent: 'center',
        flexDirection: 'row',
    }
})
