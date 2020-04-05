import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ExTouchableOpacity from '../ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { navigation } from '../../rootNavigation'
import { SCREEN_WIDTH } from '../../constants'

class Pages extends Component {
    constructor(props) {
        super(props)
    }
    onPressViewPageHandler(pageId) {
        navigation.navigate('Page', {
            pageId
        })
    }
    render() {
        const { hidden, isShowPreview, showAllFn } = this.props
        let pages = [...this.props.pages]
        if (isShowPreview) pages = pages.splice(0, 4)
        return (
            <View style={{ ...styles.container, display: hidden ? 'none' : 'flex' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pages</Text>
                {pages.map((page, index) => (
                    <ExTouchableOpacity
                        key={index}
                        onPress={this.onPressViewPageHandler.bind(this, page.id)}
                        style={{ ...styles.pageItem, borderBottomWidth: index === pages.length - 1 ? 0 : 0.5 }}>
                        <Image style={styles.pageAvatar} source={{ uri: page.avatar_url }} />
                        <View style={styles.pageInfo}>
                            <Text style={styles.pageName}>{page.name}</Text>
                            <Text style={styles.pageoLiveIn}>{page.like_count > 1000
                                ? Math.round(page.like_count / 1000) + 'k' : page.like_count} people liked </Text>
                        </View>
                        <ExTouchableOpacity style={styles.btnAddFriend}>
                            <FontAwesome5Icon name="thumbs-up" color="#333" size={20} />
                        </ExTouchableOpacity>
                    </ExTouchableOpacity>
                ))}
                {isShowPreview &&
                    <TouchableOpacity
                        style={styles.btnShowAll}
                        onPress={showAllFn}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Show All </Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        pages: state.searchResult.pages
    }
}
export default connect(mapStateToProps, null)(Pages)
const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#fff',
        padding: 15,
        paddingVertical: 10,
        borderColor: '#ddd',
        borderWidth: 0.5,
        borderRadius: 10
    },
    pageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: '#ddd'
    },
    pageAvatar: {
        width: 64,
        height: 64,
        borderRadius: 64
    },
    pageInfo: {
        width: SCREEN_WIDTH - 20 - 30 - 64 - 30, //
        paddingHorizontal: 10
    },
    pageName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    pageoLiveIn: {
        color: '#333'
    },
    btnAddFriend: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnShowAll: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#ddd',
        borderRadius: 5
    }
})
