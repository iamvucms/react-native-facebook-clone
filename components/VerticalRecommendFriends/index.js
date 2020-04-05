import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import VerticalRecommendItem from './VerticalRecommendItem'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { navigation } from '../../rootNavigation'

class index extends Component {
    constructor(props) {
        super(props)
    }
    onPressViewAllRecommendsHandler() {
        navigation.navigate('FindFriends')
    }
    render() {
        const recommendFriends = [...this.props.recommendFriends]
        if (recommendFriends.length === 0) return <View></View>
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>People you may know</Text>
                </View>
                {recommendFriends.splice(0, 2).map((recommend, index) => (
                    <VerticalRecommendItem key={index} item={recommend} />
                ))}
                <ExTouchableOpacity onPress={this.onPressViewAllRecommendsHandler} style={styles.btnViewAll}>
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        View all recommends
                    </Text>
                </ExTouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        recommendFriends: state.friends.recommendFriends
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
