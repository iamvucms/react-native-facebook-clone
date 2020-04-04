import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { FetchNotificationsRequest } from '../../actions/notificationsActions'
import { notificationTypes } from '../../constants'
import NotificationList from '../../components/NotificationList'
import VerticalRecommandFriends from '../../components/VerticalRecommandFriends'
class index extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { fetchNotifications } = this.props
        fetchNotifications()
    }
    render() {
        const notifications = [...this.props.notifications]

        return (
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.container}>
                <Text style={styles.notiTitle}>New</Text>
                <NotificationList notifications={notifications.splice(0, 2)} />
                <VerticalRecommandFriends />
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
    notiTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
        marginHorizontal: 20
    }
})
