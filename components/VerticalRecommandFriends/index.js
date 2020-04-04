import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import VerticalRecommandItem from './VerticalRecommandItem'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { navigation } from '../../rootNavigation'

class index extends Component {
    constructor(props) {
        super(props)
    }
    onPressViewAllRecommandsHandler() {
        navigation.navigate('FindFriends')
    }
    render() {
        const recommandFriends = [...this.props.recommandFriends]
        if (recommandFriends.length === 0) return <View></View>
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>People you may know</Text>
                </View>
                {recommandFriends.splice(0, 2).map((recommand, index) => (
                    <VerticalRecommandItem key={index} item={recommand} />
                ))}
                <ExTouchableOpacity onPress={this.onPressViewAllRecommandsHandler} style={styles.btnViewAll}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        View all recommands
                    </Text>
                </ExTouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        recommandFriends: state.friends.recommandFriends
    }
}
export default connect(mapStateToProps, null)(index);
const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderTopColor: "#ddd",
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
        marginHorizontal: 20
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnViewAll: {
        width: '100%',
        height: 36,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})
