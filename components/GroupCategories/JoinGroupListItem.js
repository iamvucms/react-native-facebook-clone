import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
class JoinGroupListItem extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    onLongPressShowOption() {

    }
    render() {
        const { groupDetail } = this.props
        return (
            <View style={styles.container}>
                <Image source={{ uri: groupDetail.avatar_url }} style={styles.avatar}></Image>
                <TouchableWithoutFeedback style={styles.centerWraper} onLongPress={this.onLongPressShowOption.bind(this)}>
                    <Text numberOfLines={2} style={styles.groupTitle}>{groupDetail.name}</Text>
                    <Text numberOfLines={1} style={styles.groupSubTitle}>{groupDetail.member < 1000 ? groupDetail.member : Math.round(groupDetail.member / 1000) + 'k'} members - {groupDetail.postPerDay} posts per day</Text>
                </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.btnJoin}>
                    <Text style={{ fontWeight: '500', fontSize: 16 }}>Join Group</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default JoinGroupListItem
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 7.5
    },
    centerWraper: {
        justifyContent: 'center',
        width: screenWidth - 80 - 30 - 100, //avatar padding btn
        paddingHorizontal: 15
    },
    groupTitle: {
        fontSize: 16,
        fontWeight: '500'
    },
    groupSubTitle: {
        fontSize: 14,
        color: '#333'
    },
    avatar: {
        width: 80,
        height: 80,
        borderWidth: 0.2,
        borderColor: '#333',
        borderRadius: 15,
    },
    btnJoin: {
        justifyContent: 'center',
        height: 40,
        width: 100,
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5
    }
})
