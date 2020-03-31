import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { SCREEN_WIDTH } from '../../constants'
class index extends Component {
    render() {
        const friends = [...this.props.friends]
        return (
            <View style={styles.friendsWrapper}>
                <View style={{ backgroundColor: "#000", borderRadius: 5, }}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.friendsBar}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Friends</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>{friends.length} friends</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnFindFriends}>
                            <Text style={{ fontSize: 16, color: '#318bfb' }}>
                                Find friends
                        </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={styles.friendGallery}>
                    {friends.splice(0, 6).map((friend, index) => (
                        <View key={index} style={styles.friendItem}>
                            <TouchableOpacity activeOpacity={0.8}>
                                <Image source={{ uri: friend.avatar_url }} style={styles.friendAvatar} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>{friend.name}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.btnViewAllFriends}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>View all friends</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default index;
const styles = StyleSheet.create({
    friendsWrapper: {
        paddingVertical: 15
    },
    friendsBar: {
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnFindFriends: {
        paddingHorizontal: 10
    },
    friendGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    friendItem: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        marginBottom: 15
    },
    friendAvatar: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        height: (SCREEN_WIDTH - 30 - 20) / 3,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: '#333'
    },
    btnViewAllFriends: {
        width: '100%',
        borderRadius: 5,
        height: 40,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
