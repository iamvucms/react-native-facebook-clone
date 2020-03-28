import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import VideoPlayer from '../../components/VideoPlayer'
export default class WatchDetailList extends Component {
    render() {
        return (
            <View>
                <VideoPlayer showController={true} id={2} ></VideoPlayer>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
