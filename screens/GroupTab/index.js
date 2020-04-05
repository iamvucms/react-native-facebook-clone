import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { FetchGroupsRequest } from '../../actions/groupsActions'
import GroupPosts from '../../components/GroupPosts'
import * as navigation from '../../rootNavigation'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchGroups } = this.props
        fetchGroups()
    }
    onPressGroupSearchHandler() {
        navigation.navigate('GroupSearch')
    }
    componentDidUpdate() {
    }
    onPressGoToGroupHandler(groupId) {
        navigation.navigate('GroupProfile', {
            id: groupId
        })
    }
    render() {
        const { groups } = this.props
        if (groups.length === 0) return <View></View>
        return (
            <View style={styles.container}>
                <ScrollView bounces={false}>
                    <View style={styles.topWrapper}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>Group</Text>
                            <ExTouchableOpacity onPress={this.onPressGroupSearchHandler} style={styles.btnSearch}>
                                <FontAwesome5Icon size={20} name="search"></FontAwesome5Icon>
                            </ExTouchableOpacity>
                        </View>
                        <ScrollView bounces={false} style={styles.navigatorWrapper} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={styles.navigatorItem}>
                                <FontAwesome5Icon name="users" size={20}>
                                </FontAwesome5Icon>
                                <Text style={styles.navigatorText}>My groups</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navigatorItem}>
                                <FontAwesome5Icon name="cc-discover" size={20}>
                                </FontAwesome5Icon>
                                <Text style={styles.navigatorText}>Discover</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navigatorItem}>
                                <FontAwesome5Icon name="plus" size={20}>
                                </FontAwesome5Icon>
                                <Text style={styles.navigatorText}>Create</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.navigatorItem, marginRight: 30 }}>
                                <FontAwesome5Icon name="cog" size={20}>
                                </FontAwesome5Icon>
                                <Text style={styles.navigatorText}>Setting</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        <ScrollView bounces={false} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.recommendsWrapper}>
                            {groups.map((group, index) => (
                                <View key={index}>
                                    {(index < groups.length - 1 || index > 9) &&
                                        <TouchableOpacity onPress={this.onPressGoToGroupHandler.bind(this, group.id)} style={{ ...styles.recommendItem, marginRight: 10 }}>
                                            {group.isPin &&
                                                (
                                                    <View style={styles.pinBtn}>
                                                        <FontAwesome5Icon name="thumbtack" color="#fff" size={16}></FontAwesome5Icon>
                                                    </View>
                                                )}
                                            <Image source={{ uri: group.avatar_url }} style={styles.groupAvatar}></Image>
                                            <Text style={styles.groupName}>{group.name}</Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                            )
                            )}
                            <TouchableOpacity style={{ ...styles.recommendItem, marginRight: 30 }}>
                                <View style={styles.remainingNumberWrapper}>
                                    <Text style={styles.remainingNumber}>+{groups.length > 10 ? groups.length - 10 : 1}</Text>
                                </View>
                                <Image source={{ uri: groups[groups.length > 10 ? 10 : groups.length - 1].avatar_url }} style={styles.groupAvatar}></Image>
                                <Text style={styles.groupName}></Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <GroupPosts></GroupPosts>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        groups: state.groups
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchGroups: () => dispatch(FetchGroupsRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)
const styles = StyleSheet.create({
    container: {

    },
    topWrapper: {
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    btnSearch: {
        backgroundColor: '#ddd',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    navigatorWrapper: {
        marginTop: 10,
        paddingHorizontal: 15,
    },
    navigatorItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 48,
        marginRight: 10
    },
    navigatorText: {
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500'
    },
    recommendsWrapper: {
        paddingHorizontal: 15,
        marginTop: 15
    },
    recommendItem: {
        width: 100,
        position: 'relative',
    },
    remainingNumberWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 99
    },
    remainingNumber: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    pinBtn: {
        zIndex: 99,
        position: 'absolute',
        top: 5,
        left: 5,
        width: 25,
        height: 25,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    groupAvatar: {
        width: 100,
        height: 100,
        borderRadius: 15,
        borderColor: '#000',
        borderWidth: 0.2
    },
    groupName: {
        width: '100%',
        marginTop: 5,
        fontWeight: '500'
    }
})
