import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, Dimensions, Animated } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { connect } from 'react-redux'
import { navigation } from '../../rootNavigation'
class RecommandItem extends Component {
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
    onPressProfileHandler(userId) {
        const { user } = this.props
        if (userId === user.id) {
            return navigation.navigate('Profile')
        }
        navigation.push('ProfileX', {
            userId
        })
    }
    render() {
        const containerOpacity = this._containerOpacity
        const { info } = this.props
        return (
            <Animated.View style={{ ...styles.container, display: this.state.isHidden ? 'none' : 'flex', opacity: containerOpacity }}>
                <View style={styles.itemWrapper}>
                    <ExTouchableOpacity onPress={this.onPressProfileHandler.bind(this, info.user?.id)} activeOpacity={0.5}>
                        <Image style={styles.avatar} source={{ uri: info.user?.avatar_url }}></Image>
                    </ExTouchableOpacity>
                    <View>
                        <View style={styles.infoWrapper}>
                            <ExTouchableOpacity onPress={this.onPressProfileHandler.bind(this, info.user?.id)} activeOpacity={0.5}>
                                <Text style={styles.name}>{info.user?.name}</Text>
                            </ExTouchableOpacity>
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
const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}
export default connect(mapStateToProps, null)(RecommandItem);
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
