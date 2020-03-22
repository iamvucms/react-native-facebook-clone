import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { FetchGroupPostsRequest } from '../../actions/groupPostsActions'
import GroupPostItem from './GroupPostItem'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchGroupPosts } = this.props
        fetchGroupPosts()
    }
    render() {
        const { groupPosts } = this.props
        if (groupPosts.length === 0) {
            return <View></View>
        }
        return (
            <View style={styles.container}>
                {groupPosts.map((item, index) => (
                    <GroupPostItem key={index} item={item} />
                ))}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        groupPosts: state.groupPosts
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchGroupPosts: () => dispatch(FetchGroupPostsRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)
const styles = StyleSheet.create({
    container: {

    }
})
