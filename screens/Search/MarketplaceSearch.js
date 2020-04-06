import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { STATUSBAR_HEIGHT, SCREEN_WIDTH } from '../../constants'
import { navigation } from '../../rootNavigation'

export default class MarketplaceSearch extends Component {
    constructor(props) {
        super(props)
    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={16} />
                    </ExTouchableOpacity>
                    <TextInput
                        placeholder="Search on Marketplace"
                        onPress={this.onPressMarketplaceSearchHandler}
                        style={styles.searchInput}>
                    </TextInput>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}>
                    <View style={styles.shortcutWrapper}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Shortcut</Text>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="tractor"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Vehicles</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="cash-register"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Lease</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="users"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Groups buy & sell</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.shortcutWrapper}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>All categories</Text>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="home"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Garden</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="tshirt"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Clothes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="laptop"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Electronic & computer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="toolbox"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Tools</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="guitar"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Music instrument</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="utensils"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Foods</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="gamepad"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Entertainment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="briefcase"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Jobs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shortcutItem}>
                            <View style={{
                                height: 36,
                                width: 36,
                                borderRadius: 36,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10
                            }}>
                                <FontAwesome5Icon
                                    name="tractor"
                                    size={16}
                                    color="#333" />
                            </View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600'
                            }}>Vehicles</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    navigationBar: {
        paddingTop: STATUSBAR_HEIGHT,
        height: STATUSBAR_HEIGHT + 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5
    },
    btnBack: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#ddd',
        paddingHorizontal: 15,
        width: SCREEN_WIDTH - 40 - 10
    },
    shortcutWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    shortcutItem: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
