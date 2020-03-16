import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import RecommandItem from './RecommandItem'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { FetchRecommandFriendsRequest } from '../../actions/friendActions'
import { dispatch } from '../../rootNavigation'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchRecommandFriends } = this.props
        fetchRecommandFriends()
    }
    render() {
        const { recommandFriends } = this.props
        if (recommandFriends === undefined) return <View></View>
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>People you can know</Text>
                    <TouchableOpacity style={styles.btnOptions}>
                        <FontAwesome5Icon name="ellipsis-h" color="#333" size={20}></FontAwesome5Icon>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.recommandsWrapper} bounces={false} horizontal={true}>
                    {recommandFriends.map((profile, index) => (
                        <RecommandItem key={index} info={profile}></RecommandItem>
                    ))}

                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.btnSeeAll}>
                        <Text>See all recommands</Text>
                        <FontAwesome5Icon style={styles.seeAllIcon} name="chevron-right"></FontAwesome5Icon>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        recommandFriends: state.recommandFriends
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchRecommandFriends: () => dispatch(FetchRecommandFriendsRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)
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
    recommandsWrapper: {
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
