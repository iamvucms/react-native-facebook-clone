import React, { Component } from 'react'
import { Alert, View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
import Story from './Story'
import Axios from 'axios'
import { FetchStoriesRequest } from '../../actions/storiesAction'
import { connect } from 'react-redux'
import StoryAdder from './Story/StoryAdder'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchStories } = this.props
        fetchStories()
    }
    render() {
        const { stories, user , navigation} = this.props
        return (
            <View style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false} style={styles.stories} horizontal={true}>
                    <StoryAdder user={user} ></StoryAdder>
                    {stories.map((story, index) => (<Story position={index}  key={index} story={story} />))}
                </ScrollView>
            </View >
        )
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
        fetchStories: () => dispatch(FetchStoriesRequest())
    }
}
const mapStateToProps = (state) => {
    return {
        stories: state.stories,
        user: state.user.user
    }
}
export default connect(mapStateToProps,mapDispatchToProp)(index)
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 10
    },
    stories: {
        flexWrap: 'nowrap',

    }
})