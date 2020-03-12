import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import Swiper from 'react-native-swiper'
import * as navigation from '../rootNavigation'
import StoryDetailItem from '../components/Stories/StoryDetailItem'
import { FetchStoriesRequest } from '../actions/storiesAction'
import { SetShowingStoryRequest } from '../actions/showingStoryActions'
class StoryDetail extends Component {
    constructor(props) {
        super(props)
        this.swiper = {}
    }
    // static getDerivedStateFromProps(props, state) {
    //     const { stories, setShowingStory, showingStory } = props
    //     const { position } = props.route.params
    //     if (showingStory.justclosed) {
    //         console.log(showingStory.justclosed)
    //         setShowingStory({}, position)
    //         return;
    //     }
    // }
    componentDidMount() {
        const { stories, setShowingStory, showingStory } = this.props
        const { position } = this.props.route.params
        setShowingStory(stories[position], position)
    }

    onSwipeRightHandle() {
        console.log("right")
    }
    onSwipeLeftHandle() {
        console.log("Left")
    }
    onIndexChangedHandle(index) {
        const { stories, setShowingStory } = this.props
        console.log("index", index)
        setShowingStory({}, index)
    }
    render() {
        console.log("render parent")
        const { stories, setShowingStory, showingStory } = this.props
        const { position } = this.props.route.params

        return (
            <Swiper ref={(swiper) => this.swiper = swiper} onIndexChanged={this.onIndexChangedHandle.bind(this)} index={position} loop={false} showsPagination={false} style={styles.container}>
                {stories.map((story, index) => (
                    <StoryDetailItem swiper={this.swiper} showingStory={showingStory} position={index} key={story.id} storyDetail={story}></StoryDetailItem>
                ))}
            </Swiper>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        stories: state.stories,
        showingStory: state.showingStory
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchStories: () => dispatch(FetchStoriesRequest()),
        setShowingStory: (story, position) => dispatch(SetShowingStoryRequest(story, position))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StoryDetail)
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    backBtn: {
        padding: 10,
        paddingLeft: 0,

    },
    backgroundWrapper: {
        height: "100%",
        justifyContent: 'space-between'
    },
    reactionWrapper: {
        zIndex: 99,
        width: "100%",
        backgroundColor: 'rgba(0,0,0,0.0)',
        bottom: 10,
        paddingHorizontal: 20,
        marginRight: 50,
    },
    msgInput: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 48,
        width: screenWidth * 0.6,
        color: '#fff',
        marginRight: 15
    },
    iconWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    reactionIcon: {
        fontSize: 30,
        marginHorizontal: 5
    },
    image: {
        height: screenHeight * 0.9,
    },
    userWrapper: {
        zIndex: 99,
        flexDirection: 'row',
        top: 40,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, .0)',
        paddingHorizontal: 20
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 15,

    },
    userInfoWrapper: {
        height: 40,
        justifyContent: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    time: {
        color: '#fff'
    }
})
