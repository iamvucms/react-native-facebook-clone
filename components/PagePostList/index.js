import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import PagePostItem from './PagePostItem'

export default class index extends Component {
    render() {
        const { pagePosts } = this.props
        if (pagePosts === undefined || pagePosts.length == 0) return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>This page doesn't have any posts.</Text>
            </View>
        )
        return (
            <View style={{ ...styles.container, paddingVertical: 0 }}>
                {pagePosts.map((post, index) => (
                    <PagePostItem key={index} item={post} />
                ))}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    }
})
