import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Animated } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { closePostDetailModal, openCommentModal, FetchPostDetailRequest } from '../actions/postDetailActions'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../rootNavigation'
class PostDetailModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDisplay: 'flex'
        }
        this._isLiked = { isLiked: false }
        this.optionBottom = new Animated.Value(-screenHeight)
    }
    componentDidMount() {
        const { id } = this.props.route.params
        const { fetchPostDetail } = this.props
        fetchPostDetail(id, true)
    }
    onSwipeCompleteHandler() {
        const { closePostDetailModal, openCommentModal } = this.props
        // closePostDetailModal()
        console.log("@@")
        openCommentModal()
    }
    onPressOptionIconHandler() {
        Animated.timing(this.optionBottom, {
            toValue: 0,
            duration: 300
        }).start()
    }
    onPressProfileLinkHandler() {

    }
    openCommentModal() {
        const { closePostDetailModal, openCommentModal } = this.props
        openCommentModal()
    }
    onPressCommentsHandler() {
        const { showingPost } = this.props
        const { closePostDetailModal, openCommentModal } = this.props
        const { comments } = showingPost.postDetail
        navigation.navigate('CommentsPopUp', {
            comments
        })

    }
    onPressHideDetailWrapperHandler() {
        this.setState({
            ...this.state,
            detailDisplay: this.state.detailDisplay === 'flex' ? 'none' : 'flex'
        })
    }
    onPressBackdropOptionListHandler() {
        Animated.timing(this.optionBottom, {
            toValue: -screenHeight,
            duration: 400
        }).start()
    }
    onPressReactionValueHandler() {

    }
    render() {
        const { showingPost } = this.props
        if (!showingPost.hasOwnProperty("isShowModal") || showingPost.isShowModal === false) return <View></View>
        const { postDetail, isShowModal } = showingPost
        let reactionValue = 0;
        for (let emoji in postDetail.reactions) {
            reactionValue += postDetail.reactions[emoji];
        }
        const optionBottom = this.optionBottom
        return (
            <TouchableWithoutFeedback onPress={this.onPressHideDetailWrapperHandler.bind(this)}>
                <View style={styles.postWrapper}>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.image} resizeMode="contain" source={{ uri: postDetail.image }}>
                        </Image>
                    </View>
                    <View style={{ ...styles.optionIconWrapper, display: this.state.detailDisplay }}>
                        <TouchableOpacity style={styles.cycleWrapper} onPress={this.onPressOptionIconHandler.bind(this)}>
                            <FontAwesome5Icon name="ellipsis-v" color="#fff" size={20}></FontAwesome5Icon>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={{ ...styles.optionListWrapper, bottom: optionBottom }}>
                        <View style={styles.optionBackDrop}>
                            <TouchableOpacity onPress={this.onPressBackdropOptionListHandler.bind(this)} style={{ width: "100%", height: "100%" }}>
                                <View></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.allOptionWrapper}>
                            <TouchableOpacity>
                                <View style={styles.optionItemWrapper}>
                                    <FontAwesome5Icon name="download" size={20}></FontAwesome5Icon>
                                    <Text style={styles.optionText}>Save to your phone</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.optionItemWrapper}>
                                    <FontAwesome5Icon name="share" size={20}></FontAwesome5Icon>
                                    <Text style={styles.optionText}>Share it outside</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.optionItemWrapper}>
                                    <FontAwesome5Icon name="flag" size={20}></FontAwesome5Icon>
                                    <Text style={styles.optionText}>Find support or report</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <View style={{ ...styles.postContentWrapper, display: this.state.detailDisplay }}>
                        <View>
                            <TouchableOpacity>
                                <Text style={styles.name}>{postDetail.name}</Text>
                            </TouchableOpacity>
                            <Text style={styles.content}>{postDetail.content}</Text>
                            <Text style={styles.time}>{postDetail.create_at}</Text>
                        </View>
                        <View style={styles.reactionValueWrapper}>
                            <TouchableOpacity >
                                <View style={styles.reactionNumberWrapper}>
                                    <FontAwesome5Icon name="thumbs-up" color="#318bfb" size={14}>
                                    </FontAwesome5Icon>
                                    <Text style={{ color: '#fff', marginLeft: 5 }}>{reactionValue}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPressCommentsHandler.bind(this)}>
                                <Text style={{ color: '#fff' }}>{postDetail.comments.length} comments</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnReactionWrapper}>
                            <TouchableOpacity style={styles.btnWrapper} onPres={() => this._isLiked.isLiked = !this._isLiked.isLiked}>
                                <View style={styles.reactionBtn}>
                                    <FontAwesome5Icon name="thumbs-up" color={!this._isLiked.isLiked ? '#fff' : '#318bfb'} size={20}>
                                    </FontAwesome5Icon>
                                    <Text style={styles.reactionBtnText}>Like</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnWrapper} onPress={this.onPressCommentsHandler.bind(this)}>
                                <View style={styles.reactionBtn}>
                                    <FontAwesome5Icon name="comment-alt" color="#fff" size={20}>
                                    </FontAwesome5Icon>
                                    <Text style={styles.reactionBtnText}>Comment</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnWrapper} >
                                <View style={styles.reactionBtn}>
                                    <FontAwesome5Icon name="share" color="#fff" size={20}>
                                    </FontAwesome5Icon>
                                    <Text style={styles.reactionBtnText}>Share</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        showingPost: state.showingPost
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        closePostDetailModal: () => dispatch(closePostDetailModal()),
        openCommentModal: () => dispatch(openCommentModal()),
        fetchPostDetail: (id) => dispatch(FetchPostDetailRequest(id))
    }
}
const screenHeight = Math.round(Dimensions.get('window').height);
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailModal)
const styles = StyleSheet.create({
    postWrapper: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,1)',
        height: "100%"
    },
    optionIconWrapper: {
        position: 'absolute',
        right: 30,
        top: 50,
        zIndex: 999999,
    },
    cycleWrapper: {
        padding: 10
    },

    optionListWrapper: {
        position: 'absolute',
        left: 0,
        height: "100%",
        zIndex: 999999,
        backgroundColor: "rgba(0,0,0,0)",
        width: "100%"
    },
    allOptionWrapper: {
        backgroundColor: "#fff",
        padding: 20,
        position: 'absolute',
        bottom: 0,
        width: "100%",
        zIndex: 2
    },
    optionBackDrop: {
        // backgroundColor: "red",
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: "100%",
        width: "100%"
    },
    optionItemWrapper: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16
    },
    postContentWrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        left: 0,
        width: "100%",
        // zIndex: 99,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    name: {
        fontWeight: 'bold',
        color: '#fff'
    },
    content: {
        color: '#fff'
    },
    time: {
        marginTop: 5,
        color: '#fff',
        textTransform: 'uppercase',
        opacity: 0.5
    },
    btnReactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    reactionBtnText: {
        color: '#fff',
        marginLeft: 5
    },
    btnWrapper: {
        flex: 1
    },
    reactionBtn: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageWrapper: {

    },
    image: {
        backgroundColor: "rgba(0,0,0,0)",
        height: "100%"
    },
    reactionValueWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    reactionNumberWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    }

})
