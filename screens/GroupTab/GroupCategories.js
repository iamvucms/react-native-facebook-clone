import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, View, SafeAreaView, ImageBackground, TextInput } from 'react-native'
import { FetchGroupCategoriesRequest } from '../../actions/groupCategoriesActions'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SCREEN_WIDTH } from '../../constants'
import { connect } from 'react-redux'
import * as navigation from '../../rootNavigation'
class GroupCategories extends Component {
    constructor(props) {
        super(props)
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onPressCategoryHandler(category) {
        navigation.push('GroupCategory', {
            category
        })
    }
    componentDidMount() {
        const { fetchGroupCategories } = this.props
        fetchGroupCategories()
    }
    render() {
        const { groupCategories } = this.props
        if (groupCategories.length === 0) return <View></View>
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.searchToolWrapper}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon size={20} name="arrow-left"></FontAwesome5Icon>
                    </ExTouchableOpacity>
                    <TextInput placeholder="Search groups" style={styles.searchInput}>

                    </TextInput>
                </View>
                <ScrollView bounces={false}>
                    <View style={styles.title}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                        }}>Group categories</Text>
                    </View>
                    <View style={styles.categoriesWrapper}>
                        {groupCategories.map((category, index) => (
                            <ExTouchableOpacity key={index} onPress={this.onPressCategoryHandler.bind(this, category)}>
                                <ImageBackground style={styles.category} source={{ uri: category.avatar_url }}>
                                    <Text style={styles.categoryName}>{category.name}</Text>
                                </ImageBackground>
                            </ExTouchableOpacity>
                        ))}
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        groupCategories: state.groupCategories
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchGroupCategories: () => dispatch(FetchGroupCategoriesRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupCategories)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
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
        width: SCREEN_WIDTH - 60,
        height: 35,
        paddingHorizontal: 15
    },
    categoriesWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        marginBottom: 30
    },
    category: {
        width: (SCREEN_WIDTH - 40) / 2,
        height: (SCREEN_WIDTH - 40) / 2,
        borderRadius: 15,
        overflow: 'hidden',
        margin: 5,
        borderWidth: 0.2,
        borderColor: '#333',
        justifyContent: "flex-end",
        padding: 15
    },
    categoryName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        paddingHorizontal: 15,
        height: 50,
        width: '100%',
        justifyContent: 'center'
    }
})
