import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ProfilePostItem from './ProfilePostItem'

export default class index extends Component {
    render() {
        const { profilePosts } = this.props
        if (profilePosts === undefined || profilePosts.length == 0) return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>This profile doesn't have any posts.</Text>
            </View>
        )
        return (
            <View style={{ ...styles.container, paddingVertical: 0 }}>
                {profilePosts.map((post, index) => (
                    <ProfilePostItem key={index} item={post} />
                ))}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        marginVertical: 15,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    }
})
