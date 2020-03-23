import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as navigation from '../../rootNavigation'
import ExTouchableOpacity from '../ExTouchableOpacity'
export default class GroupCategoryItem extends Component {
    constructor(props) {
        super(props)
    }
    onPressCategoryItemHandler() {
        const { category } = this.props
        navigation.push('GroupCategory', {
            category: category
        })
    }
    render() {
        const { category } = this.props
        return (
            <ExTouchableOpacity onPress={this.onPressCategoryItemHandler.bind(this)}>
                <View style={styles.container}>
                    <Image source={{ uri: category.avatar_url }} style={styles.categoryAvatar}></Image>
                    <Text style={styles.categoryTxt}>{category.name}</Text>
                </View>
            </ExTouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        alignItems: "center",
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    categoryAvatar: {
        height: 40,
        width: 40,
        borderRadius: 5,
        borderColor: '#333',
        borderWidth: 0.3,
        marginRight: 10
    },
    categoryTxt: {
        fontSize: 16,
        fontWeight: '500'
    }
})
