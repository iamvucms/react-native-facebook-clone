import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ExTouchableOpacity from '../ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { navigation } from '../../rootNavigation'
import { SCREEN_WIDTH } from '../../constants'

class Peoples extends Component {
    constructor(props) {
        super(props)
    }
    onPressViewProfileHandler(userId) {
        navigation.navigate('ProfileX', {
            userId
        })
    }
    render() {
        const { hidden, isShowPreview, showAllFn } = this.props
        let users = [...this.props.users]
        if (isShowPreview) users = users.splice(0, 10)
        return (
            <View style={{ ...styles.container, display: hidden ? 'none' : 'flex' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>People</Text>
                {users.map((people, index) => (
                    <ExTouchableOpacity
                        key={index}
                        onPress={this.onPressViewProfileHandler.bind(this, people.id)}
                        style={{ ...styles.peopleItem, borderBottomWidth: index === users.length - 1 ? 0 : 0.5 }}>
                        <Image style={styles.peopleAvatar} source={{ uri: people.avatar_url }} />
                        <View style={styles.peopleInfo}>
                            <Text style={styles.peopleName}>{people.name}</Text>
                            <Text style={styles.peopleoLiveIn}>Live in {people.live_in}</Text>
                        </View>
                        <ExTouchableOpacity style={styles.btnAddFriend}>
                            <FontAwesome5Icon name="user-plus" color="#333" size={20} />
                        </ExTouchableOpacity>
                    </ExTouchableOpacity>
                ))}
                {isShowPreview &&
                    <TouchableOpacity
                        style={styles.btnShowAll}
                        onPress={showAllFn}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Show All </Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        users: state.searchResult.users
    }
}
export default connect(mapStateToProps, null)(Peoples)
const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#fff',
        padding: 15,
        paddingVertical: 10,
        borderColor: '#ddd',
        borderWidth: 0.5,
        borderRadius: 10
    },
    peopleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd'
    },
    peopleAvatar: {
        width: 64,
        height: 64,
        borderRadius: 64
    },
    peopleInfo: {
        width: SCREEN_WIDTH - 20 - 30 - 64 - 30, //
        paddingHorizontal: 10
    },
    peopleName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    peopleoLiveIn: {
        color: '#333'
    },
    btnAddFriend: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnShowAll: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#ddd',
        borderRadius: 5
    }
})
