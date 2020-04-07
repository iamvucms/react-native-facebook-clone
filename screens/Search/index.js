import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { STATUSBAR_HEIGHT, SCREEN_WIDTH, searchType } from '../../constants'
import { connect } from 'react-redux'
import { FetchHomeHistoriesRequest } from '../../actions/historyActions'
import { navigation } from '../../rootNavigation'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchRecentSearching } = this.props
        fetchRecentSearching()
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onBlurSearchInputHandler({ nativeEvent }) {
        const { text } = nativeEvent
        navigation.navigate('Result', {
            keyword: text
        })
    }
    onPressRecentItemHandler(searching) {
        switch (searching.type) {
            case searchType.KEYWORD:
                navigation.navigate('Result', {
                    keyword: searching.keyword
                })
                break;
            case searchType.PEOPLE:
                navigation.navigate('ProfileX', {
                    userId: searching.user.id
                })
                break;
            case searchType.PAGE:
                navigation.navigate('Page', {
                    pageId: searching.page.id
                })
                break;
            case searchType.GROUP:
                navigation.navigate('GroupProfile', {
                    id: searching.group.id
                })
                break;
        }
    }
    render() {
        const { recentSearchings } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.searchToolWrapper}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={20} />
                    </ExTouchableOpacity>
                    <TextInput onBlur={this.onBlurSearchInputHandler} style={styles.searchInput} placeholder="Search..." placeholderTextColor="#333" />
                </View>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                    <View style={styles.titleWrapper}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Recent searching</Text>
                        <TouchableOpacity style={styles.btnModify}>
                            <Text>MODIFY</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recentSearchWrapper}>
                        {recentSearchings.map((searching, index) => (
                            <ExTouchableOpacity
                                onPress={this.onPressRecentItemHandler.bind(this, searching)}
                                key={index}
                                style={styles.recentSearchItem}>
                                {searching.type === searchType.KEYWORD
                                    ? (<View style={styles.searchIconWrapper}><FontAwesome5Icon name="search" size={14} color="gray" /></View>)
                                    : <Image style={styles.avatar} source={{ uri: searching.user?.avatar_url || searching.page?.avatar_url || searching.group?.avatar_url }} />
                                }
                                <Text style={{ fontSize: 16, marginLeft: 10 }}>
                                    {searching.keyword || searching.user?.name || searching.page?.name || searching.group?.name}
                                </Text>
                            </ExTouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        recentSearchings: state.history.home
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchRecentSearching: () => dispatch(FetchHomeHistoriesRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    searchToolWrapper: {
        paddingTop: STATUSBAR_HEIGHT,
        flexDirection: 'row',
        height: 50 + STATUSBAR_HEIGHT,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    btnBack: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        height: 40,
        width: SCREEN_WIDTH - 40 - 15,
        borderRadius: 40,
        backgroundColor: '#ddd',
        paddingHorizontal: 20
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 36,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    btnModify: {
        fontSize: 16,
        color: '#333'
    },
    recentSearchWrapper: {
        backgroundColor: 'rgba(0,0,0,0.3)',

    },
    recentSearchItem: {
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',

    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderColor: '#333',
        borderWidth: 0.2
    },
    searchIconWrapper: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
