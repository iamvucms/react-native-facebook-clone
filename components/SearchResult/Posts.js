import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ExTouchableOpacity from '../ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { navigation } from '../../rootNavigation'
import { SCREEN_WIDTH } from '../../constants'

class Posts extends Component {
    constructor(props) {
        super(props)
    }
    onPressViewPostDetailHandler(id) {
        navigation.navigate('PostDetail', {
            id
        })
    }
    onPressViewProfileHandler(userId) {
        navigation.navigate('ProfileX', {
            userId
        })
    }
    render() {
        const { hidden, isShowPreview, showAllFn } = this.props
        let posts = [...this.props.posts]
        if (isShowPreview) posts = posts.splice(0, 2)
        return (
            <View style={{ ...styles.container, display: hidden ? 'none' : 'flex', marginTop: isShowPreview ? 0 : 10 }}>
                {posts.map((post, index) => (
                    <ExTouchableOpacity
                        key={index}
                        onPress={this.onPressViewPostDetailHandler.bind(this, post.id)}
                        style={{ ...styles.postItem, borderWidth: 0.5 }}>
                        <View style={styles.infoWrapper}>
                            <Image source={{ uri: post.user.avatar_url }} style={styles.postAvatar} />
                            <View >
                                <ExTouchableOpacity onPress={this.onPressViewProfileHandler.bind(this, post.user.id)}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{post.user.name}</Text>
                                </ExTouchableOpacity>
                                <Text style={{ color: '#333', fontSize: 12 }}>{post.create_at}</Text>
                            </View>
                        </View>
                        <View style={styles.contentWrapper}>
                            <View style={styles.content}>
                                <Text numberOfLines={3}>{post.content}</Text>
                            </View>
                            <Image style={styles.postImage} source={{ uri: post.image }} />
                        </View>
                    </ExTouchableOpacity>
                ))}
                {isShowPreview &&
                    <View style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                        <TouchableOpacity
                            style={styles.btnShowAll}
                            onPress={showAllFn}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Show All </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        posts: state.searchResult.posts
    }
}
export default connect(mapStateToProps, null)(Posts)
const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    postItem: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        marginBottom: 10,
        borderRadius: 10
    },
    postAvatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderColor: "#ddd",
        borderWidth: 0.5,
        marginRight: 10
    },
    postImage: {
        width: 68,
        height: 68,
        borderRadius: 10,
        borderColor: "#ddd",
        borderWidth: 0.5
    },
    infoWrapper: {
        flexDirection: 'row',
        padding: 15,
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.2
    },
    contentWrapper: {
        padding: 15,
        flexDirection: 'row',
    },
    content: {
        width: SCREEN_WIDTH - 20 - 30 - 68,
        paddingRight: 10
    },
    btnShowAll: {
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#ddd',
        borderRadius: 5
    }
})
