import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import RecommendItem from './RecommendItem'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { FetchRecommendFriendsRequest } from '../../actions/friendActions'
import ExTouchableOpacity from '../ExTouchableOpacity'
import { navigation } from '../../rootNavigation'
class index extends Component {
    constructor(props) {
        super(props)
        this._pivotX = 0
    }
    componentDidMount() {
        const { fetchRecommendFriends } = this.props
        fetchRecommendFriends()
    }
    onPressViewAllRecommendsHandler() {
        navigation.navigate('FindFriends')
    }
    onScrollHandler(event) {
        const offsetX = event.nativeEvent.contentOffset.x
        if (this._pivotX === offsetX) return;
        const calculatedNumber = Math.floor(offsetX / (0.6 * 0.5 * screenWidth + 5))
        if (calculatedNumber > 0) {
            if (calculatedNumber == 1 && this._pivotX < offsetX) {
                this.refs._scrollView.scrollTo({
                    y: 0,
                    x: 0.6 * screenWidth * 0.75 + 5,
                    animated: true
                })
            } else if (calculatedNumber > 1) {
                let nextStack = 0
                if (calculatedNumber % 2 === 1) {
                    nextStack = calculatedNumber
                } else {
                    nextStack = calculatedNumber - 1
                }
                nextOffsetX = nextStack * (0.5 * 0.6 * screenWidth + 5) + (0.25 * 0.6 * screenWidth)
                this.refs._scrollView.scrollTo({
                    y: 0,
                    x: nextOffsetX,
                    animated: true
                })
            }
        } else {
            this.refs._scrollView.scrollTo({
                y: 0,
                x: 0,
                animated: true
            })
        }
        this._pivotX = offsetX
    }
    render() {
        const { recommendFriends } = this.props
        if (recommendFriends === undefined || recommendFriends.length === 0) return <View></View>
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>People you can know</Text>
                    <TouchableOpacity style={styles.btnOptions}>
                        <FontAwesome5Icon name="ellipsis-h" color="#333" size={20}></FontAwesome5Icon>
                    </TouchableOpacity>
                </View>
                <ScrollView decelerationRate={0.5}
                    scrollEventThrottle={30}
                    showsHorizontalScrollIndicator={false}
                    ref='_scrollView'
                    onMomentumScrollEnd={this.onScrollHandler.bind(this)}
                    onScrollEndDrag={this.onScrollHandler.bind(this)}
                    style={styles.recommendsWrapper}
                    bounces={false} horizontal={true}>
                    {recommendFriends.map((profile, index) => (
                        <RecommendItem key={index} info={profile}></RecommendItem>
                    ))}
                </ScrollView>
                <View>
                    <ExTouchableOpacity onPress={this.onPressViewAllRecommendsHandler} style={styles.btnSeeAll}>
                        <Text>See all recommends</Text>
                        <FontAwesome5Icon style={styles.seeAllIcon} name="chevron-right"></FontAwesome5Icon>
                    </ExTouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        recommendFriends: state.friends.recommendFriends
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchRecommendFriends: () => dispatch(FetchRecommendFriendsRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    headerWrapper: {
        paddingLeft: 5,
        position: 'relative',
        paddingBottom: 10,
    },
    btnOptions: {
        position: 'absolute',
        right: 10,
        top: 0,
    },
    recommendsWrapper: {
        marginBottom: 10
    },
    btnSeeAll: {
        paddingTop: 10,
        paddingBottom: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    seeAllIcon: {
        marginLeft: 5,
        fontWeight: "100"
    }
})
