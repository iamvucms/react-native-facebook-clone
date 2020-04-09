import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { SCREEN_WIDTH } from '../../constants'
import ExTouchableOpacity from '../ExTouchableOpacity'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

class Event extends Component {
    render() {
        const { events } = this.props
        const upcomingEvents = [...events].filter(event => event.isOverTime === false).splice(0, 3)
        const pastEvents = [...events].filter(event => event.isOverTime === true).splice(0, 3)
        return (
            <View style={styles.container}>
                <View style={styles.upcomingEventsWrapper}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        padding: 15,
                        borderBottomColor: '#ddd',
                        borderBottomWidth: 0.5
                    }}>
                        Upcoming Events
                    </Text>
                    <View style={styles.eventsWrapper}>
                        {upcomingEvents.map((event, index) => (
                            <View key={index} style={styles.eventItem}>
                                <View style={styles.shortTime}>
                                    <Text style={{
                                        color: 'red'
                                    }}>{event.short_time?.month}</Text>
                                    <Text style={{
                                        fontWeight: '500',
                                        fontSize: 18
                                    }}>{event.short_time?.date}</Text>
                                </View>
                                <View style={styles.eventInfo}>
                                    <Text style={{
                                        fontWeight: '500',
                                        fontSize: 16
                                    }}>{event.title}</Text>
                                    <Text style={{
                                        color: '#333'
                                    }}>{event.full_time}</Text>
                                    <Text style={{
                                        color: '#333'
                                    }}>{event.address}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <ExTouchableOpacity style={styles.btnSeeAll}>
                        <Text style={{
                            color: '#333',
                            marginRight: 5,
                        }}>
                            SEE ALL
                        </Text>
                        <FontAwesome5Icon name="chevron-right" color="#333" />
                    </ExTouchableOpacity>
                </View>
                <View style={styles.pastEventsWrapper}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        padding: 15,
                        borderBottomColor: '#ddd',
                        borderBottomWidth: 0.5
                    }}>
                        Past Events
                    </Text>
                    <View style={styles.eventsWrapper}>
                        {pastEvents.map((event, index) => (
                            <View key={index} style={styles.eventItem}>
                                <View style={styles.shortTime}>
                                    <Text style={{
                                        color: 'red'
                                    }}>{event.short_time?.month}</Text>
                                    <Text style={{
                                        fontWeight: '500',
                                        fontSize: 18
                                    }}>{event.short_time?.date}</Text>
                                </View>
                                <View style={styles.eventInfo}>
                                    <Text style={{
                                        fontWeight: '500',
                                        fontSize: 16
                                    }}>{event.title}</Text>
                                    <Text style={{
                                        color: '#333'
                                    }}>{event.full_time}</Text>
                                    <Text style={{
                                        color: '#333'
                                    }}>{event.address}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <ExTouchableOpacity style={styles.btnSeeAll}>
                        <Text style={{
                            color: '#333',
                            marginRight: 5,
                        }}>
                            SEE ALL
                        </Text>
                        <FontAwesome5Icon name="chevron-right" color="#333" />
                    </ExTouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        events: state.page.events
    }
}
export default connect(mapStateToProps, null)(Event)
const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    upcomingEventsWrapper: {
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    pastEventsWrapper: {
        marginVertical: 10,
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    eventsWrapper: {

    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    shortTime: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        width: 64
    },
    eventInfo: {
        width: SCREEN_WIDTH - 64,
        paddingRight: 15
    },
    btnSeeAll: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
