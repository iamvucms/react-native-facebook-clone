import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { closePostDetailModal, openCommentModal } from '../../actions/postDetailActions'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
class PostDetailModal extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    onSwipeCompleteHandler() {
        const { closePostDetailModal, openCommentModal } = this.props
        // closePostDetailModal()
        console.log("@@")
        openCommentModal()
    }
    onPressProfileLinkHandler() {

    }
    openCommentModal(){
        const { closePostDetailModal, openCommentModal } = this.props
        console.log("oke")
        openCommentModal()
    }
    onPressCommentsHandler() {
        const { showingPost } = this.props
        const { closePostDetailModal, openCommentModal } = this.props
        const { comments } = showingPost.postDetail
        closePostDetailModal()
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
        return (
            <View>
                <Modal onModalHide={this.openCommentModal.bind(this)} style={{ width: "100%", margin: 0 }} backdropOpacity={1} onSwipeComplete={this.onSwipeCompleteHandler.bind(this)} isVisible={isShowModal} swipeDirection='down'>
                    <View style={styles.postWrapper}>
                        <Image style={styles.image} resizeMode="contain" source={{ uri: postDetail.image }}>
                        </Image>
                        <View style={styles.postContentWrapper}>
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
                                <TouchableOpacity style={styles.btnWrapper}>
                                    <View style={styles.reactionBtn}>
                                        <FontAwesome5Icon name="thumbs-up" color="#fff" size={20}>
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
                </Modal>
            </View>
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
        openCommentModal: () => dispatch(openCommentModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetailModal)
const styles = StyleSheet.create({
    postWrapper: {
        position: 'relative'
    },
    postContentWrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        left: 0,
        width: "100%",
        zIndex: 99,
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
    image: {
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
