import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import WatchItem from './WatchItem'
export default class index extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WatchItem></WatchItem>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    }
})
