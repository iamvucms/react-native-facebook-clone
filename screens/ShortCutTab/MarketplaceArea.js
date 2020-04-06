import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

export default class MarketplaceArea extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <TouchableOpacity>
                        <FontAwesome5Icon name="arrow-left" size={16} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
