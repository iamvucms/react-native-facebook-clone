import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import WatchSearchRecommendItem from './WatchSearchRecommendItem'
import { FetchWatchSearchRecommendsRequest } from '../../actions/watchSearchRecommendsActions'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchWatchSearchRecommends } = this.props
        fetchWatchSearchRecommends()
    }
    render() {
        const { watchSearchRecommends } = this.props
        if (watchSearchRecommends.length === 0) return <View></View>
        return (
            <ScrollView bounces={false} style={styles.container} bounces={false}>
                {watchSearchRecommends.map((recommend, index) => (
                    <WatchSearchRecommendItem key={index} recommend={recommend} />
                ))}
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        watchSearchRecommends: state.watchSearchRecommends
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchWatchSearchRecommends: () => dispatch(FetchWatchSearchRecommendsRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)
const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.2,
    }
})
