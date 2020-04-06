import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import { SCREEN_WIDTH } from '../../constants'

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0
        }
    }
    onEndScrollHandler({ nativeEvent }) {
        console.log("xxxx")
        const offsetX = nativeEvent.contentOffset.x
        const prevIndex = Math.floor(offsetX / SCREEN_WIDTH)
        const percent = offsetX / SCREEN_WIDTH - prevIndex
        if (percent > 0.5) {
            this.setState({
                ...this.state,
                currentIndex: prevIndex + 1
            })
            this.refs._scrollRef.scrollTo({
                animated: true,
                x: (prevIndex + 1) * SCREEN_WIDTH,
                y: 0
            })
        } else {
            this.setState({
                ...this.state,
                currentIndex: prevIndex
            })
            this.refs._scrollRef.scrollTo({
                animated: true,
                x: (prevIndex) * SCREEN_WIDTH,
                y: 0
            })
        }
    }
    render() {
        const { images } = this.props
        return (
            <View style={styles.container}>
                <ScrollView
                    scrollEventThrottle={60}
                    ref="_scrollRef"
                    decelerationRate={0.9}
                    onScrollEndDrag={this.onEndScrollHandler.bind(this)}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    horizontal={true}
                    style={styles.imagesWrapper}>
                    {images?.map((image, index) =>
                        <Image style={styles.image} source={{ uri: image }} />
                    )}
                </ScrollView>
                <View style={styles.dotNavigationWrapper}>
                    {images.map((image, index) => (
                        <View style={{ ...styles.dot, backgroundColor: index === this.state.currentIndex ? '#fff' : 'gray' }} />
                    ))}
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%'
    },
    imagesWrapper: {
        height: 500,
        width: '100%'
    },
    dotNavigationWrapper: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dot: {
        width: 8,
        height: 8,
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: 'gray'
    },
    image: {
        height: '100%',
        width: SCREEN_WIDTH
    }
})
