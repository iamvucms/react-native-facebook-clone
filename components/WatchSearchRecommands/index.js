import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import WatchSearchRecommandItem from './WatchSearchRecommandItem'
import { FetchWatchSearchRecommandsRequest } from '../../actions/watchSearchRecommandsActions'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchWatchSearchRecommands } = this.props
        fetchWatchSearchRecommands()
    }
    render() {
        const { watchSearchRecommands } = this.props
        if (watchSearchRecommands.length === 0) return <View></View>
        return (
            <ScrollView bounces={false} style={styles.container} bounces={false}>
                {watchSearchRecommands.map((recommand, index) => (
                    <WatchSearchRecommandItem key={index} recommand={recommand} />
                ))}
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        watchSearchRecommands: state.watchSearchRecommands
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchWatchSearchRecommands: () => dispatch(FetchWatchSearchRecommandsRequest())
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
