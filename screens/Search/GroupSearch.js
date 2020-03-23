import React, { PureComponent } from 'react'
import { TouchableOpacity, Text, StyleSheet, View, TextInput, SafeAreaView, Dimensions, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
import GroupCategories from '../../components/GroupCategories'
import { FetchGroupHistoriesRequest } from '../../actions/historyActions'
import { connect } from 'react-redux'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
class GroupSearch extends PureComponent {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchGroupHistories } = this.props
        fetchGroupHistories()
    }
    onPressGroupCategoriesHandler() {
        navigation.push('GroupCategories')
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    render() {
        const { groupHistories } = this.props
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.searchToolWrapper}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon size={20} name="arrow-left"></FontAwesome5Icon>
                    </ExTouchableOpacity>
                    <TextInput placeholder="Search groups" style={styles.searchInput}>

                    </TextInput>
                </View>
                <View style={styles.historyWrapper}>
                    <View style={styles.historyTitle}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Recent searched groups
                        </Text>
                        <ExTouchableOpacity>
                            <Text>
                                MODIFY
                            </Text>
                        </ExTouchableOpacity>
                    </View>
                    {groupHistories.map((history, index) => (
                        <View key={index}>
                            {history.isResult ? (
                                <ExTouchableOpacity style={styles.searchResult}>
                                    <Image style={{ width: 20, height: 20, marginRight: 5, borderRadius: 5 }} source={{ uri: history.group.avatar_url }}></Image>
                                    <Text>{history.group.name}</Text>
                                </ExTouchableOpacity>
                            ) : (
                                    <ExTouchableOpacity style={styles.searchResult}>
                                        <FontAwesome5Icon style={{ width: 25 }} name="search" color="#ddd"></FontAwesome5Icon>
                                        <Text>{history.keyword}</Text>
                                    </ExTouchableOpacity>
                                )}
                        </View>
                    ))}
                </View>
                <View style={styles.groupCategoriesWrapper}>
                    <View style={styles.groupCategoriesTitle}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Popular group categories</Text>
                    </View>
                    <GroupCategories></GroupCategories>
                    <ExTouchableOpacity onPress={this.onPressGroupCategoriesHandler} style={styles.btnSeeAll}>
                        <Text>See all</Text>
                        <FontAwesome5Icon name="arrow-right"></FontAwesome5Icon>
                    </ExTouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => {
    return {
        groupHistories: state.history.groups
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchGroupHistories: () => dispatch(FetchGroupHistoriesRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch)
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    searchToolWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 0.3,
        borderBottomColor: '#ddd'
    },
    btnBack: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        borderRadius: 48,
        backgroundColor: '#ddd',
        width: screenWidth - 60,
        height: 35,
        paddingHorizontal: 15
    },
    historyWrapper: {
        borderBottomWidth: 5,
        borderBottomColor: '#ddd'
    },
    historyTitle: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'space-between',
        borderBottomWidth: 0.2,
        borderBottomColor: '#ddd'
    },
    searchResult: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    },
    groupCategoriesWrapper: {

    },
    groupCategoriesTitle: {
        paddingHorizontal: 15,
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: '#ddd'
    },
    btnSeeAll: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        height: 40,
        alignItems: 'center',

    }
})
