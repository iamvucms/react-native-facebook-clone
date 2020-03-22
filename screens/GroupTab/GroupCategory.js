import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as navigation from '../../rootNavigation'
import JoinGroupListItem from '../../components/GroupCategories/JoinGroupListItem'
import CategoryGroupList from '../../components/GroupCategories/CategoryGroupList'
class GroupCategory extends Component {
    constructor(props) {
        super(props)
    }
    onPressBackHandler() {
        navigation.goBack()
    }
    onPressGoToSearch() {
        navigation.navigate('GroupSearch')
    }
    render() {
        const { category } = this.props.route.params
        const arrID = category.groups.map((group) => group.groupId)
        return (
            <View style={styles.container}>
                <View style={{ ...styles.searchToolWrapper, backgroundColor: 'rgba(0,0,0,0)' }}>
                    <TouchableOpacity onPress={this.onPressBackHandler}>
                        <FontAwesome5Icon size={20} name="arrow-left" color="#fff"></FontAwesome5Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressGoToSearch} style={styles.searchInputWrapper}>
                        <View style={styles.searchIcon}>
                            <FontAwesome5Icon color="#333" name="search" size={16}></FontAwesome5Icon>
                        </View>
                        <View style={styles.searchInput}><Text>Search groups</Text></View>
                    </TouchableOpacity>
                </View>
                <ScrollView bounces={false}>
                    <ImageBackground imageStyle={styles.coverImage} style={styles.cover} source={{ uri: category.avatar_url }}>
                        <View style={styles.categoryName}>
                            <Text style={styles.categoryNameTxt}>{category.name}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.tagsWrapper}>
                        {category.tags.map((tag, index) => (
                            <TouchableOpacity key={index} style={styles.tag}>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.groupsWrapper}>
                        <CategoryGroupList groupIDs={arrID} />
                    </View>
                    <TouchableOpacity onPress={this.onPressGoToSearch} style={styles.notFoundYourGroup}>
                        <Image style={styles.notFoundImage} source={require('../../assets/images/page-not-found.png')}></Image>
                        <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10 }}>You didn't see your needing content?</Text>
                        <Text style={{ fontSize: 14, marginVertical: 10, color: '#333' }}>Use keyword for searching</Text>
                        <TouchableOpacity onPress={this.onPressGoToSearch} style={styles.btnSearch}>
                            <FontAwesome5Icon name="search" size={16}></FontAwesome5Icon>
                            <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 5 }}>Search groups</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
export default GroupCategory
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    searchToolWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        position: 'absolute',
        width: '100%',
        height: 94,
        paddingTop: 44,
        left: 0,
        top: 0,
        zIndex: 99
    },
    searchInputWrapper: {
        flexDirection: 'row',

        marginLeft: 15,
        borderRadius: 48,
        overflow: 'hidden'
    },
    searchIcon: {
        height: 40,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    searchInput: {
        justifyContent: 'center',
        color: '#333',
        width: screenWidth - 110,
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    cover: {
        position: 'relative',
        height: 300
    },
    coverImage: {
        height: 300,
    },
    categoryName: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: "100%",
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 20,
        paddingLeft: 25
    },
    categoryNameTxt: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    tagsWrapper: {
        flexDirection: 'row',
        padding: 15,
        paddingBottom: 5,
        flexWrap: 'wrap',
        borderBottomWidth: 0.3,
        borderBottomColor: '#333'
    },
    tag: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 48,
        backgroundColor: '#ddd',
        marginBottom: 10,
        marginRight: 10
    },
    notFoundYourGroup: {
        borderColor: '#333',
        borderWidth: 0.2,
        borderRadius: 10,
        margin: 15,
        padding: 15,
        alignItems: 'center',
        marginBottom: 50,
    },
    notFoundImage: {
        width: 80,
        height: 80
    },
    btnSearch: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
    }
})
