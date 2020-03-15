import React, { Component } from 'react'
import { Text, StyleSheet, View, PanResponder } from 'react-native'
import Modal from 'react-native-modal'
import { closeCommentModal } from '../../actions/postDetailActions'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
class CommentsModal extends Component {
    constructor(props) {
        super(props)
        // this._panResponder = PanResponder.create({
        //     onStartShouldSetPanResponder: (evt, gestureState) => true,
        //     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        //     onMoveShouldSetPanResponder: (evt, gestureState) => true,
        //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        //     onPanResponderMove: (evt, gestureState) => {
        //         console.warn(gestureState)
        //     }
        // })
    }
    onSwipeCompleteHandler() {
        const { closeCommentModal } = this.props
        closeCommentModal()
    }
    render() {
        const { commentModal } = this.props
        if (commentModal === undefined || !commentModal.hasOwnProperty('isShowCommentModal')) return <View></View>
        return (
            <Modal onSwipeComplete={this.onSwipeCompleteHandler.bind(this)} isVisible={commentModal.isShowCommentModal} style={styles.container} swipeDirection="down">
                <TouchableOpacity onPress={this.onSwipeCompleteHandler.bind(this)}>
                    <Text>CLOSE</Text>
                </TouchableOpacity>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        commentModal: state.showingPost
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        closeCommentModal: () => dispatch(closeCommentModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentsModal)
const styles = StyleSheet.create({
    container: {
        margin: 0,
        zIndex: 999,
        height: "100%",
        width: "100%",
        backgroundColor: 'red'
    }
})
