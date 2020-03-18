import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import * as navigation from '../../rootNavigation'
class FullPostTool extends Component {
    constructor(props) {
        super(props)
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onContentSizeChangeHandler({ nativeEvent }) {
        console.log(nativeEvent)
    }
    render() {
        const { user } = this.props
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.navigationBar}>
                    <TouchableOpacity onPress={this.onPressGoBackHandler.bind(this)} style={styles.naviIcon}>
                        <FontAwesome5Icon color="#000" name="arrow-left" size={20}></FontAwesome5Icon>
                    </TouchableOpacity>
                    <Text style={styles.naviTitle}>Create a post</Text>
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

                <View style={styles.editorWrapper}>
                    <View style={{
                        height: 100,
                        alignSelf: 'stretch',
                        borderRadius: 10,
                        borderWidth: 5,
                        borderColor: 'black',
                        marginHorizontal: 30,

                        justifyContent: 'center',
                    }}>
                        <TextInput onContentSizeChange={this.onContentSizeChangeHandler.bind(this)} placeholderTextColor="#fff" placeholder="What are you thinking ?" multiline style={{ ...styles.editor, fontSize: 26, textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>

                        </TextInput>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, null)(FullPostTool)
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        height: screenHeight,
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
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        backgroundColor: 'red'
    },
    editor: {
        justifyContent: 'center',
        padding: 15,
        height: '100%',
        width: '100%'
    }
})
