import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { navigation } from '../../rootNavigation'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { SCREEN_WIDTH } from '../../constants'

class Photos extends Component {
    constructor(props) {
        super(props)
    }
    onPressPhotoPostHandler(postId) {
        navigation.navigate('PagePostDetail', {
            postId
        })
    }
    render() {
        const { photos, page } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.albumsWrapper}>
                    <ScrollView
                        bounces={false}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={styles.albumItem}>
                            <Image style={styles.albumAvatar} source={{ uri: photos[0]?.image }} />
                            <Text style={{
                                marginVertical: 5,
                                fontWeight: '600'
                            }}>Timeline Photos</Text>
                            <Text style={{
                                fontWeight: '500',
                                color: '#333'
                            }}>{photos.length} photos</Text>
                            <View style={styles.mockStack}>
                                <View style={{
                                    marginVertical: 2.5,
                                    backgroundColor: '#000',
                                    height: 0.8,
                                    width: SCREEN_WIDTH * 0.4 - 20
                                }}></View>
                                <View style={{
                                    height: 0.8,
                                    width: SCREEN_WIDTH * 0.4 - 10,
                                    backgroundColor: '#000'
                                }}></View>
                            </View>
                        </View>
                        <View style={styles.albumItem}>
                            <Image style={styles.albumAvatar} source={{ uri: page.avatar_url }} />
                            <Text style={{
                                marginVertical: 5,
                                fontWeight: '600'
                            }}>Profile Pictures</Text>
                            <Text style={{
                                fontWeight: '500',
                                color: '#333'
                            }}>1 photo</Text>
                            <View style={styles.mockStack}>
                                <View style={{
                                    marginVertical: 2.5,
                                    backgroundColor: '#000',
                                    height: 0.8,
                                    width: SCREEN_WIDTH * 0.4 - 20
                                }}></View>
                                <View style={{
                                    height: 0.8,
                                    width: SCREEN_WIDTH * 0.4 - 10,
                                    backgroundColor: '#000'
                                }}></View>
                            </View>
                        </View>
                        <View style={styles.albumItem}>
                            <Image style={styles.albumAvatar} source={{ uri: page.cover_url }} />
                            <Text style={{
                                marginVertical: 5,
                                fontWeight: '600'
                            }}>Cover Photos</Text>
                            <Text style={{
                                fontWeight: '500',
                                color: '#333'
                            }}>1 photos</Text>
                            <View style={styles.mockStack}>
                                <View style={{
                                    marginVertical: 2.5,
                                    backgroundColor: '#000',
                                    height: 0.8,
                                    width: SCREEN_WIDTH * 0.4 - 20
                                }}></View>
                                <View style={{
                                    height: 0.8,
                                    width: SCREEN_WIDTH * 0.4 - 10,
                                    backgroundColor: '#000'
                                }}></View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.gallery}>
                    {photos.map((photo, index) => (
                        <ExTouchableOpacity
                            onPress={this.onPressPhotoPostHandler.bind(this, photo.id)}
                            key={index}
                            style={{
                                ...styles.imageWrapper,
                                marginRight: (index + 1) % 3 === 0 ? 0 : 5
                            }}>
                            <Image source={{ uri: photo.image }} style={styles.image} />
                        </ExTouchableOpacity>
                    ))}

                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        photos: state.page.photos
    }
}
export default connect(mapStateToProps, null)(Photos)
const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    albumsWrapper: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 15
    },
    albumItem: {
        marginHorizontal: 5,
        paddingTop: 10,
        width: SCREEN_WIDTH * 0.4,
        position: 'relative'
    },
    mockStack: {
        height: 5,
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100%',
    },
    albumAvatar: {
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_WIDTH * 0.4,
        borderColor: '#333',
        borderWidth: 0.5
    },
    gallery: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageWrapper: {
        height: SCREEN_WIDTH / 3 - 10 / 3,
        width: SCREEN_WIDTH / 3 - 10 / 3,
        marginBottom: 5
    },
    image: {
        width: '100%',
        height: '100%'
    },

})
