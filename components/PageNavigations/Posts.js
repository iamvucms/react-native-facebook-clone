import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import PostTool from '../PostTool'
import PagePostList from '../PagePostList'
import { connect } from 'react-redux'

class Posts extends Component {
    render() {
        const { page, posts } = this.props
        return (
            <View>
                <PostTool isWriteToPage={true} page={page} />
                <View style={{ marginVertical: 5 }}></View>
                <PagePostList pagePosts={posts} />
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        posts: state.page.posts
    }
}
export default connect(mapStateToProps, null)(Posts)
const styles = StyleSheet.create({})
