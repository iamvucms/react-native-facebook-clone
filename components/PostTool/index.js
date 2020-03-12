import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputBgColor:"#fff"
        }
    }
    onPressInputInHandler(){
        this.setState({
            ...this.state,
            inputBgColor:"#ddd"
        })
    }
    onPressInputOutHandler(){

    }
    render() {
        const { user } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.postToolWrapper}>
                    <TouchableOpacity style={styles.userAvatarWrapper}>
                        <Image source={{ uri: user.avatar_url }} style={styles.userAvatar} ></Image>
                    </TouchableOpacity>
                    <View onPress={this.onPressInputInHandler.bind(this)} style={styles.postInputWrapper}>
                        <TextInput placeholder="What are you thinking ?" placeholderTextColor="#000"  style={{...styles.postInput,backgroundColor:this.state.inputBgColor}}></TextInput>
                    </View>
                </View>
                <View style={styles.postOptionsWrapper}></View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, null)(index)
const styles = StyleSheet.create({
    container: {
        marginTop:10,
        backgroundColor: '#fff'
    },
    postToolWrapper: {
        padding: 10,
        flexDirection:'row'
    },
    postOptionsWrapper: {

    },
    postInputWrapper: {
        borderRadius:48,
        flex:1,
        marginLeft:5,
       
    },
    postInput: {
        borderRadius:48,
        height:40,
        width:"100%",
        borderColor:"#ddd",
        paddingHorizontal:10,
        borderWidth:2
    },
    userAvatar: {
        width:40,
        height:40,
        borderRadius:50,
    },
    userAvatarWrapper: {

    }
})
