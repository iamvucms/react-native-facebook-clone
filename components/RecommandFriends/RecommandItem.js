import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, Dimensions, Animated } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
export default class RecommandItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden: false
        }
        this._containerOpacity = new Animated.Value(1)
    }
    onPressHideHandler() {
        Animated.timing(this._containerOpacity, {
            toValue: 0,
            duration: 1000
        }).start(() => {
            this.setState({
                ...this.state,
                isHidden: true
            })
        })

    }
    render() {
        const containerOpacity = this._containerOpacity
        const { info } = this.props
        return (
            <Animated.View style={{ ...styles.container, display: this.state.isHidden ? 'none' : 'flex', opacity: containerOpacity }}>
                <View style={styles.itemWrapper}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Image style={styles.avatar} source={{ uri: info.avatar_url }}></Image>
                    </TouchableOpacity>
                    <View>
                        <View style={styles.infoWrapper}>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Text style={styles.name}>{info.name}</Text>
                            </TouchableOpacity>
                            <Text style={styles.mutualCount}>{info.mutualCount} mutual friends</Text>
                        </View>
                        <View style={styles.btnWrapper}>
                            <View style={styles.btnAddFr}>
                                <FontAwesome5Icon.Button onPress={() => console.log('click add')} style={{ justifyContent: 'center' }} name="user-plus" size={20} color="white">Add Friend</FontAwesome5Icon.Button>
                            </View>
                            <TouchableOpacity onPress={this.onPressHideHandler.bind(this)} style={styles.btnHide}>
                                <Text>Hide</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>
        )
    }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5
    },
    itemWrapper: {
        borderRadius: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        overflow: 'hidden'
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    avatar: {
        width: screenWidth * 0.6,
        height: 300
    },
    infoWrapper: {
        paddingVertical: 10,
        paddingLeft: 15
    },
    name: {
        fontSize: 16
    },
    mutualCount: {
        fontSize: 12,
        color: '#333'
    },
    btnAddFr: {
        flex: 3
    },
    btnHide: {
        flex: 1,
        height: 38,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginLeft: 10,
    }
})
