import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SCREEN_WIDTH } from '../../constants'

export default class Introduction extends Component {
    render() {
        const { page } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.introWrapper}>
                    <View style={styles.introLine}>
                        <View style={{
                            width: 25
                        }}>
                            <FontAwesome5Icon name="phone" color="#333" size={16} />
                        </View>
                        <View style={styles.introContent}>
                            <Text style={styles.introTxt}>{page.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.introLine}>
                        <View style={{
                            width: 25
                        }}>
                            <FontAwesome5Icon name="envelope-open" color="#333" size={16} />
                        </View>
                        <View style={styles.introContent}>
                            <Text style={styles.introTxt}>{page.mail}</Text>
                        </View>
                    </View>
                    <View style={styles.introLine}>
                        <View style={{
                            width: 25
                        }}>
                            <FontAwesome5Icon name="globe-asia" color="#333" size={16} />
                        </View>
                        <View style={styles.introContent}>
                            <Text style={styles.introTxt}>{page.website}</Text>
                        </View>
                    </View>
                    <View style={styles.introLine}>
                        <View style={{
                            width: 25
                        }}>
                            <FontAwesome5Icon name="info-circle" color="#333" size={16} />
                        </View>
                        <View style={styles.introContent}>
                            <Text style={{
                                ...styles.introTxt,
                                color: "#000"
                            }}>{page.description.title}</Text>
                        </View>
                    </View>
                    <View style={styles.introLine}>
                        <View style={{
                            width: 25
                        }}>
                            <FontAwesome5Icon name="table" color="#333" size={16} />
                        </View>
                        <View style={styles.introContent}>
                            <Text style={styles.introTxt}>{page.categoryName}</Text>
                        </View>
                    </View>
                    <View style={styles.introLine}>
                        <View style={{
                            width: 25
                        }}>
                            <FontAwesome5Icon name="facebook-messenger" size={20} color="#333" />
                        </View>
                        <View style={styles.introContent}>
                            <Text style={{
                                ...styles.introTxt,
                                color: "#000"
                            }}>See what {page.name} is doing in Messenger</Text>
                            <Text style={styles.introTxt}>Get started</Text>
                        </View>
                    </View>
                    <View style={styles.introLine}>
                        <View style={{
                            width: 25
                        }}>
                            <FontAwesome5Icon name="home" color="#333" size={16} />
                        </View>
                        <View style={styles.introContent}>
                            <Text style={{
                                ...styles.introTxt,
                                color: "#000"
                            }}>{page.description.content}</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        backgroundColor: "#fff"
    },
    introWrapper: {
        paddingHorizontal: 15,
        marginVertical: 15
    },
    introLine: {
        flexDirection: 'row',
        marginVertical: 12,
    },
    introContent: {
        width: SCREEN_WIDTH - 30 - 25
    },
    introTxt: {
        color: "#318bfb"
    }
})
