import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { STATUSBAR_HEIGHT } from '../../constants'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import { navigation } from '../../rootNavigation'
import { connect } from 'react-redux'
class ProfileSetting extends Component {
    onPressGoBackHandler() {
        navigation.goBack()
    }
    render() {
        const { user } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity onPress={this.onPressGoBackHandler} style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={20} />
                    </ExTouchableOpacity>
                    <View style={styles.navigationTitle}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Profile Setting</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.groupSetting}>
                        <TouchableOpacity style={styles.settingCategory}>
                            <View style={styles.settingIcon}>
                                <FontAwesome5Icon name="edit" size={20} />
                            </View>
                            <Text style={styles.settingTxt}>Edit profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingCategory}>
                            <View style={styles.settingIcon}>
                                <FontAwesome5Icon name="history" size={20} />
                            </View>
                            <Text style={styles.settingTxt}>Stories saved box</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.settingCategory, borderBottomWidth: 0 }}>
                            <View style={styles.settingIcon}>
                                <FontAwesome5Icon name="bookmark" size={20} />
                            </View>
                            <Text style={styles.settingTxt}>Saved</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.groupSetting}>
                        <TouchableOpacity style={styles.settingCategory}>
                            <View style={styles.settingIcon}>
                                <FontAwesome5Icon name="eye" size={20} />
                            </View>
                            <Text style={styles.settingTxt}>View mode</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingCategory}>
                            <View style={styles.settingIcon}>
                                <FontAwesome5Icon name="list-ul" size={20} />
                            </View>
                            <Text style={styles.settingTxt}>Activity log</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.settingCategory, borderBottomWidth: 0 }}>
                            <View style={styles.settingIcon}>
                                <FontAwesome5Icon name="clipboard-list" size={20} />
                            </View>
                            <Text style={styles.settingTxt}>Manage posts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingCategory}>
                            <View style={styles.settingIcon}>
                                <FontAwesome5Icon name="bars" size={20} />
                            </View>
                            <Text style={styles.settingTxt}>View your timeline</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingCategory}>
                            <View style={styles.settingIcon}>
                                <FontAwesome5Icon name="lock" size={20} />
                            </View>
                            <Text style={styles.settingTxt}>View privacy shortcut</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.settingCategory, borderBottomWidth: 0 }}>
                            <View style={styles.settingIcon}>
                                <FontAwesome5Icon name="search" size={20} />
                            </View>
                            <Text style={styles.settingTxt}>Find on your profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.myProfile}>
                        <View style={styles.topTitle}>
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>Link to your profile</Text>
                            <Text style={{ color: '#333' }}>Your private link on Facebook</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: '600', marginTop: 5 }}>https://www.facebook.com/profile/{user.id}</Text>
                            <TouchableOpacity style={styles.btnCopy}>
                                <Text style={{ color: '#333', fontSize: 14, textTransform: 'uppercase' }}>Copy link adress</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}
export default connect(mapStateToProps, null)(ProfileSetting);
const styles = StyleSheet.create({
    container: {

    },
    navigationBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingTop: STATUSBAR_HEIGHT,
        height: 50 + STATUSBAR_HEIGHT,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 8
    },
    btnBack: {
        zIndex: 1,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationTitle: {
        position: 'absolute',
        left: 0,
        top: STATUSBAR_HEIGHT,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    groupSetting: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10
    },
    settingCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 10,
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd'
    },
    settingIcon: {
        width: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    settingTxt: {
        fontSize: 16,
        fontWeight: '100'
    },
    myProfile: {
        backgroundColor: '#fff',
        padding: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    topTitle: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
        height: 50,
        paddingBottom: 5,
        justifyContent: 'space-between'
    },
    btnCopy: {
        borderColor: '#ddd',
        borderRadius: 5,
        borderWidth: 0.5,
        height: 40,
        width: '40%',
        marginTop: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
