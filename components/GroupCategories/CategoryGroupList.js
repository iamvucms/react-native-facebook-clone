import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { FetchCategoryGroupListRequest } from '../../actions/categoryGroupListActions'
import JoinGroupListItem from './JoinGroupListItem'
class CategoryGroupList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { groupIDs } = this.props
        const { fetchCategoryGroupList } = this.props
        fetchCategoryGroupList(groupIDs)
    }
    render() {
        const { categoryGroupList } = this.props
        if (categoryGroupList.length === 0) return <View></View>
        return (
            <View style={{ paddingVertical: 7.5 }}>
                {categoryGroupList.map((group, index) => (
                    <JoinGroupListItem groupDetail={group} key={index} />
                ))}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        categoryGroupList: state.categoryGroupList
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCategoryGroupList: (arrID) => dispatch(FetchCategoryGroupListRequest(arrID))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryGroupList)
const styles = StyleSheet.create({})
