import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import ScaledImage from '../ScaledImage'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ListItem } from 'react-native-elements'
import { FetchPostDetailRequest } from '../../actions/postDetailActions'
import * as navigation from '../../rootNavigation'
import { connect } from 'react-redux'
class Item extends Component {
    constructor(props) {
        super(props)
    }
    onPressHandle() {
        const { comments } = this.props.item
        navigation.navigate('Comments', {
            comments
        })
    }
    onPressPostOptionsIconHandler() {
        const { item } = this.props
        navigation.navigate('PostOptions', {
            postDetail: item
        })
    }
    onPressPostImageHandler(id) {
        // const { toggleShowPostDetail } = this.props
        // toggleShowPostDetail(id, true)
        navigation.navigate('PostDetail', {
            id
        })
    }
    onPressShareHandler() {
        const { item } = this.props
        navigation.navigate('SharePost', {
            id: item.id
        })
    }
    render() {
        const { index, item } = this.props
        return (
            <View style={styles.item}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ListItem titleStyle={{ fontWeight: 'bold' }} style={styles.customListView}
                        leftAvatar={{ source: { uri: item.avatar_url } }}
                        subtitle={item.create_at}
                        title={item.name}
                        style={{ width: screenWidth - 40 }}></ListItem>
                    <TouchableOpacity onPress={this.onPressPostOptionsIconHandler.bind(this)} style={{ width: 25, alignItems: 'center' }}>
                        <Icon name="ellipsis-h" color="#000"></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.paragraph}>{item.content}</Text>
                </View>
                <TouchableOpacity onPress={this.onPressPostImageHandler.bind(this, item.id)}>
                    <View style={styles.imageContainer}>
                        <ScaledImage height={300} source={item.image}></ScaledImage>
                    </View>
                </TouchableOpacity>
                <View horizontal={true} style={styles.reactionContainer}>
                    <TouchableOpacity><Icon
                        name="thumbs-up"
                        color="#318bfb"
                        backgroundColor="#fff"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        name="heart"
                        color="#e8304a"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        name="grin-squint"
                        color="#f7ca51"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        name="surprise"
                        color="#f7ca51"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        name="sad-tear"
                        color="#f7ca51"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity><Icon
                        lineBreakMode={false}
                        name="angry"
                        color="#dc4311"
                        backgroundColor="white"
                        style={styles.reactionIcon}
                    ></Icon></TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressHandle.bind(this)}><Icon
                        lineBreakMode={false}
                        name="comment-alt"
                        color="gray"
                        backgroundColor="white"
                        style={{ ...styles.reactionIcon, fontSize: 14 }}
                    ><Text style={{ fontSize: 12 }}> {item.comments.length} comments</Text></Icon></TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressShareHandler.bind(this)} style={styles.shareIcon}><Icon name="share-alt"
                        color="gray" ><Text style={{ fontSize: 12, textAlignVertical: 'center' }}> Share</Text></Icon></TouchableOpacity>
                </View>
                <View style={styles.commentContainer}>
                    <Image source={{ uri: item.avatar_url }} style={styles.commentAvatar}></Image>
                    <View style={styles.commentInput}>
                        <TouchableOpacity onPress={this.onPressHandle.bind(this)} style={styles.commentInputWrapper}>
                            <Text>Comment...</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity><Icon style={styles.btnSendComment} name="paper-plane" color="gray"></Icon></TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Item
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    listContainter: {
        backgroundColor: '#e9ebee',
    },
    item: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { height: 0, width: 0 },
        marginBottom: 10
    },
    commentInputWrapper: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: 15
    },
    paragraph: {

    },
    contentContainer: {
        paddingHorizontal: 15
    },
    imageContainer: {
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reactionContainer: {
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center'
    },
    reactionIcon: {
        fontSize: 20,
        padding: 10
    },
    shareIcon: {
        position: 'absolute',
        fontSize: 14,
        padding: 10,
        right: 0
    },
    commentContainer: {
        flexDirection: 'row',
        padding: 10,
        borderColor: "red",
        borderStyle: 'dashed',
        flexWrap: 'nowrap'
    },
    commentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    commentInput: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 20,
        marginLeft: 10,
        height: 30,
        width: screenWidth - 15 * 2 - 60,
    },
    btnSendComment: {
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30
    }
})