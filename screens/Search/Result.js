import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-gesture-handler'
import { STATUSBAR_HEIGHT, SCREEN_WIDTH, resultTypes, SCREEN_HEIGHT } from '../../constants'
import { navigation } from '../../rootNavigation'
import { connect } from 'react-redux'
import { commonSearchRequest, SearchUsersRequest } from '../../actions/searchingActions'
import { Peoples, Posts, Pages, Groups } from '../../components/SearchResult'
class Result extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: props.route.params.keyword,
            currentCategory: 0
        }
    }
    componentDidMount() {
        const { commonSearch } = this.props
        const { keyword } = this.props.route.params
        commonSearch(keyword)
    }
    onBlurSearchInputHandler({ nativeEvent }) {
        const { text } = nativeEvent
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onPressChangeCategoryHandler(categoryId) {
        setTimeout(() => {
            this.refs._scrollRef.scrollTo({ x: 0, y: 0, animated: true })
        }, 200);
        this.setState({
            ...this.state,
            currentCategory: categoryId
        })
    }
    render() {
        const { keyword, currentCategory } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.searchToolWrapper}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={20} />
                    </ExTouchableOpacity>
                    <View>
                        <TextInput value={keyword} onBlur={this.onBlurSearchInputHandler} style={styles.searchInput} placeholder="Search..." placeholderTextColor="#333" />
                    </View>
                </View>
                {/* Categories */}
                <ScrollView
                    bounces={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.categories}>
                    <TouchableOpacity
                        onPress={this.onPressChangeCategoryHandler.bind(this, resultTypes.ALL)}
                        style={{ ...styles.btnCategory, backgroundColor: currentCategory === resultTypes.ALL ? '#318bfb' : '#ddd' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: currentCategory === resultTypes.ALL ? '#fff' : '#000' }}>ALL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onPressChangeCategoryHandler.bind(this, resultTypes.POST)}
                        style={{ ...styles.btnCategory, backgroundColor: currentCategory === resultTypes.POST ? '#318bfb' : '#ddd' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: currentCategory === resultTypes.POST ? '#fff' : '#000' }}>POSTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onPressChangeCategoryHandler.bind(this, resultTypes.PEOPLE)}
                        style={{ ...styles.btnCategory, backgroundColor: currentCategory === resultTypes.PEOPLE ? '#318bfb' : '#ddd' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: currentCategory === resultTypes.PEOPLE ? '#fff' : '#000' }}>PEOPLE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onPressChangeCategoryHandler.bind(this, resultTypes.EVENT)}
                        style={{ ...styles.btnCategory, backgroundColor: currentCategory === resultTypes.EVENT ? '#318bfb' : '#ddd' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: currentCategory === resultTypes.EVENT ? '#fff' : '#000' }}>EVENT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onPressChangeCategoryHandler.bind(this, resultTypes.GROUP)}
                        style={{ ...styles.btnCategory, backgroundColor: currentCategory === resultTypes.GROUP ? '#318bfb' : '#ddd' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: currentCategory === resultTypes.GROUP ? '#fff' : '#000' }}>GROUPS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onPressChangeCategoryHandler.bind(this, resultTypes.PAGE)}
                        style={{ ...styles.btnCategory, backgroundColor: currentCategory === resultTypes.PAGE ? '#318bfb' : '#ddd' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: currentCategory === resultTypes.PAGE ? '#fff' : '#000' }}>PAGES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onPressChangeCategoryHandler.bind(this, resultTypes.VIDEO)}
                        style={{ ...styles.btnCategory, backgroundColor: currentCategory === resultTypes.VIDEO ? '#318bfb' : '#ddd' }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: currentCategory === resultTypes.VIDEO ? '#fff' : '#000' }}>VIDEO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onPressChangeCategoryHandler.bind(this, resultTypes.IMAGE)}
                        style={{
                            ...styles.btnCategory, marginRight: 15,
                            backgroundColor: currentCategory === resultTypes.IMAGE ? '#318bfb' : '#ddd'
                        }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: currentCategory === resultTypes.IMAGE ? '#fff' : '#000' }}>IMAGES</Text>
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    ref="_scrollRef"
                    style={{ ...styles.resultWrapper, height: SCREEN_HEIGHT - STATUSBAR_HEIGHT - 50 - 48 }}
                    bounces={false}>
                    <Peoples
                        hidden={currentCategory !== resultTypes.ALL && currentCategory !== resultTypes.PEOPLE}
                        isShowPreview={currentCategory !== resultTypes.PEOPLE}
                        showAllFn={this.onPressChangeCategoryHandler.bind(this, resultTypes.PEOPLE)} />
                    <Posts
                        hidden={currentCategory !== resultTypes.ALL && currentCategory !== resultTypes.POST}
                        isShowPreview={currentCategory !== resultTypes.POST}
                        showAllFn={this.onPressChangeCategoryHandler.bind(this, resultTypes.POST)} />
                    <Pages hidden={currentCategory !== resultTypes.ALL && currentCategory !== resultTypes.PAGE}
                        isShowPreview={currentCategory !== resultTypes.PAGE}
                        showAllFn={this.onPressChangeCategoryHandler.bind(this, resultTypes.PAGE)} />
                    <Groups hidden={currentCategory !== resultTypes.ALL && currentCategory !== resultTypes.GROUP}
                        isShowPreview={currentCategory !== resultTypes.GROUP}
                        showAllFn={this.onPressChangeCategoryHandler.bind(this, resultTypes.GROUP)} />
                </ScrollView>
            </View>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        commonSearch: (keyword) => dispatch(commonSearchRequest(keyword))
    }
}
export default connect(null, mapDispatchToProps)(Result)
const styles = StyleSheet.create({
    container: {

    },
    searchToolWrapper: {
        backgroundColor: '#fff',
        paddingTop: STATUSBAR_HEIGHT,
        flexDirection: 'row',
        height: 50 + STATUSBAR_HEIGHT,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    resultWrapper: {
        height: SCREEN_HEIGHT - STATUSBAR_HEIGHT - 50 - 48
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
    categories: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    btnCategory: {
        backgroundColor: '#ddd',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5
    },
})
