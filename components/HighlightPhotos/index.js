import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'

export default class index extends Component {
    render() {
        const { isFullRadius } = this.props
        const highlightPhotos = [...this.props.photos]
        return (
            <View style={styles.highlightPhotosWrapper}>
                {highlightPhotos.map((photo, index) => (
                    <TouchableOpacity key={index} activeOpacity={0.8}>
                        <Image style={{ ...styles.photo, marginBottom: index < 6 ? 6 : 0, borderRadius: isFullRadius === true ? 10 : 0 }} source={{ uri: photo.photo_url }} />
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    highlightPhotosWrapper: {
        flexDirection: 'row',
        borderRadius: 10,
        flexWrap: 'wrap',
        overflow: 'hidden',
        justifyContent: 'space-between',
    },
    highLightPhoto: {
    },
    photo: {
        width: (SCREEN_WIDTH - 42) / 3,
        height: (SCREEN_WIDTH - 42) / 3
    }
})
