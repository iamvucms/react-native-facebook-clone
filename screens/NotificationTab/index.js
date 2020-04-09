import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FetchNotificationsRequest } from '../../actions/notificationsActions'
import { notificationTypes } from '../../constants'
import NotificationList from '../../components/NotificationList'
import VerticalRecommendFriends from '../../components/VerticalRecommendFriends'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { navigation } from '../../rootNavigation'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchNotifications } = this.props
        fetchNotifications()
    }
    onPressSearchHandler() {
        navigation.navigate('Search')
    }
    render() {
        const notifications = [...this.props.notifications]

        return (
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Notifications</Text>
                    <ExTouchableOpacity onPress={this.onPressSearchHandler} style={styles.btnSearch}>
                        <FontAwesome5Icon name="search" size={18} />
                    </ExTouchableOpacity>
                </View>
                <Text style={styles.notiTitle}>New</Text>
                <NotificationList notifications={notifications.splice(0, 2)} />
                <VerticalRecommendFriends />
                <Text style={styles.notiTitle}>Before that</Text>
                <NotificationList notifications={notifications} />
            </ScrollView>
        )
    }
}
const mapStateToProps = state => {
    return {
        notifications: state.notifications
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchNotifications: () => dispatch(FetchNotificationsRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    titleWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center',
        marginHorizontal: 20
    },
    btnSearch: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 40
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    notiTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
        marginHorizontal: 20
    }
})
