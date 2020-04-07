import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Platform, Animated, TouchableWithoutFeedback } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { STATUSBAR_HEIGHT, SCREEN_WIDTH } from '../../constants'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { navigation } from '../../rootNavigation'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import ExTouchableOpacity from '../../components/ExTouchableOpacity'
class MarketplaceArea extends Component {
    constructor(props) {
        super(props)
        this.mapRef = React.createRef()
        this._areaRangeSize = new Animated.Value(100)
        this._FIXED_MAP_HEIGHT = 250
        this._prevZoomPercent = 0.2
        this.state = {
            longitudeDelta: 0.1,
            latitudeDelta: 0.2,
            selectedOptionType: 1,
            curRadius: 100,
        }
        this._curWidth = 100
        this._playedWidth = new Animated.Value(100)
        this._maxRadius = 300
    }
    onRegionChangeHandler(region) {
        // const { latitudeDelta, latitude, longitude, longitudeDelta } = region
        // console.log(latitudeDelta, this._prevZoomPercent)
        // if (latitudeDelta > 1) return;
        // if (latitudeDelta > 0) {
        //     const percentDelta = this._prevZoomPercent + Math.abs(latitudeDelta)
        //     this._areaRangeSize.setValue(1000 * percentDelta)
        //     this._prevZoomPercent = this._prevZoomPercent + Math.abs(latitudeDelta)
        // }
    }
    onPressChangeOption(type) {
        if (type === 1) {
            this._playedWidth.setValue(100)
            this.setState({
                ...this.state,
                curRadius: 100,
                selectedOptionType: type
            })
        } else {
            this.setState({
                ...this.state,
                selectedOptionType: type
            })
        }

    }
    onPressGoBackHandler() {
        navigation.goBack()
    }
    onGestureEventHandler({ nativeEvent }) {
        const { selectedOptionType } = this.state
        if (selectedOptionType === 1) return;
        const { translationX } = nativeEvent
        if (this._curWidth + translationX < 0
            || this._curWidth + translationX > MAX_SLIDER_WIDTH) return;
        else {
            this._playedWidth.setValue(this._curWidth + translationX)
        }
    }
    onHandlerStateChangeHandler({ nativeEvent }) {
        const { selectedOptionType } = this.state
        if (selectedOptionType === 1) return;
        const { translationX, state } = nativeEvent
        if (state === State.END) {
            let nextRadius = Math.round((this._curWidth + translationX) / MAX_SLIDER_WIDTH * this._maxRadius)
            nextRadius = nextRadius < 0 ? 0 : (nextRadius > this._maxRadius ? this._maxRadius : nextRadius)
            this._curWidth += translationX
            this._curWidth = this._curWidth < 0 ? 0 : (this._curWidth > MAX_SLIDER_WIDTH ? MAX_SLIDER_WIDTH : this._curWidth)
            this._areaRangeSize.setValue(this._curWidth)
            this.setState({
                ...this.state,
                curRadius: nextRadius
            })


        }
    }
    render() {
        const { longitudeDelta, latitudeDelta, selectedOptionType, curRadius } = this.state
        const { user } = this.props
        const { myCoordinates } = user
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity
                        onPress={this.onPressGoBackHandler}
                        style={styles.btnBack}>
                        <FontAwesome5Icon name="arrow-left" size={16} />
                    </ExTouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>Area</Text>
                </View>
                <View style={styles.searchToolWrapper}>
                    <View style={styles.searchTool}>
                        <FontAwesome5Icon name="search" size={16} color="gray" />
                        <TextInput placeholder="Search by city, area, street"
                            style={styles.searchInput} />
                    </View>
                </View>
                <View style={styles.mapViewWrapper}>
                    <MapView
                        ref={this.mapRef}
                        onRegionChange={this.onRegionChangeHandler.bind(this)}
                        mapType={Platform.OS == "android" ? "none" : "standard"}
                        style={{ height: this._FIXED_MAP_HEIGHT, width: SCREEN_WIDTH }}
                        initialRegion={{
                            latitude: myCoordinates.latitude,
                            longitude: myCoordinates.longitude,
                            latitudeDelta,
                            longitudeDelta,
                        }}>
                    </MapView>
                    <Animated.View style={{
                        ...styles.areaMarker,
                        borderWidth: selectedOptionType === 1 ? 0 : 2,
                        borderColor: '#318bfb',
                        height: this._areaRangeSize,
                        width: this._areaRangeSize,
                        borderRadius: this._areaRangeSize,
                        top: Animated.divide(Animated.subtract(this._FIXED_MAP_HEIGHT, this._areaRangeSize), 2),
                        left: Animated.divide(Animated.subtract(SCREEN_WIDTH, this._areaRangeSize), 2)
                    }}>
                        <View style={styles.markerPoint}></View>
                    </Animated.View>
                    <View style={styles.recommendMap}>
                        <Text style={{
                            color: '#fff',
                            fontWeight: '600'
                        }}>Drag map to choose area</Text>
                    </View>
                </View>
                <View style={styles.areaOptionsWrapper}>
                    <TouchableOpacity
                        onPress={this.onPressChangeOption.bind(this, 1)} style={styles.areaOption}>
                        <View style={{
                            width: SCREEN_WIDTH - 30 - 25
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Recommend radius</Text>
                            <Text style={{ color: '#333', fontWeight: '500' }}>Display posts in this area</Text>
                        </View>
                        <View style={{
                            ...styles.radioBtn,
                            borderColor: selectedOptionType === 1 ? '#318bfb' : '#333',
                        }}>
                            <View style={{
                                height: 12,
                                width: 12,
                                borderRadius: 12,
                                backgroundColor: selectedOptionType === 1 ? '#318bfb' : '#fff',
                            }}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onPressChangeOption.bind(this, 2)}
                        style={{ ...styles.areaOption, borderBottomWidth: 0 }}>
                        <View style={{
                            width: SCREEN_WIDTH - 30 - 25
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Custom radius</Text>
                            <Text style={{ color: '#333', fontWeight: '500' }}>Just display posts in fixed area</Text>
                        </View>
                        <View style={{
                            ...styles.radioBtn,
                            borderColor: selectedOptionType === 2 ? '#318bfb' : '#333',
                        }}>
                            <View style={{
                                height: 12,
                                width: 12,
                                borderRadius: 12,
                                backgroundColor: selectedOptionType === 2 ? '#318bfb' : '#fff',
                            }}></View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.radiusSliderWrapper}>
                        <View style={styles.radiusSlider}>
                            <PanGestureHandler
                                onGestureEvent={this.onGestureEventHandler.bind(this)}
                                onHandlerStateChange={this.onHandlerStateChangeHandler.bind(this)}
                            >
                                <Animated.View activeOpacity={1}
                                    style={{
                                        ...styles.sliderPoint,
                                        left: this._playedWidth,
                                        backgroundColor: selectedOptionType === 1 ? '#333' : '#318bfb'
                                    }}><View></View></Animated.View>
                            </PanGestureHandler>
                            <Animated.View style={{
                                ...styles.playedBar,
                                width: this._playedWidth,
                                backgroundColor: selectedOptionType === 1 ? '#333' : '#318bfb'
                            }}></Animated.View>
                        </View>
                        <Text style={{
                            width: 90, textAlign: "right",
                            fontWeight: '600',
                            color: '#333'
                        }}>{selectedOptionType === 1 ? 'Recommend' : curRadius + ' km'}</Text>
                    </View>
                    <View style={styles.btnApplyWrapper}>
                        <ExTouchableOpacity style={styles.btnApply}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600', color: '#fff'
                            }}>Apply</Text>
                        </ExTouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}
export default connect(mapStateToProps, null)(MarketplaceArea);
const MAX_SLIDER_WIDTH = SCREEN_WIDTH - 90 - 30
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    navigationBar: {
        paddingTop: STATUSBAR_HEIGHT,
        height: 50 + STATUSBAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    btnBack: {
        height: 40,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchToolWrapper: {
        paddingHorizontal: 15,
        height: 50,
        justifyContent: 'center'
    },
    searchTool: {
        height: 36,
        flexDirection: 'row',
        borderRadius: 36,
        alignItems: 'center',
        backgroundColor: 'rgb(242,242,242)',
        paddingHorizontal: 15
    },
    searchInput: {
        height: 36,
        width: SCREEN_WIDTH - 30 - 32,
        paddingHorizontal: 10
    },
    mapViewWrapper: {
        overflow: 'hidden'
    },
    areaMarker: {
        zIndex: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(35,119,242,0.2)'
    },
    markerPoint: {
        height: 20,
        width: 20,
        borderRadius: 20,
        borderWidth: 3,
        backgroundColor: "#318bfb",
        borderColor: '#fff'
    },
    recommendMap: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    areaOptionsWrapper: {
        paddingHorizontal: 15
    },
    areaOption: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 7.5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd'
    },
    radioBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 25,
        width: 25,
        borderRadius: 25,
        padding: 5,
        borderWidth: 3,
    },
    radiusSliderWrapper: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radiusSlider: {
        width: MAX_SLIDER_WIDTH,
        position: 'relative',
        height: 2,
        backgroundColor: '#ddd'
    },
    playedBar: {
        position: 'absolute',
        height: 2,
        top: 0,
        left: 0,
        backgroundColor: '#318bfb'
    },
    sliderPoint: {
        position: 'absolute',
        top: -9,
        height: 20,
        width: 20,
        backgroundColor: "#318bfb",
        borderRadius: 20
    },
    btnApplyWrapper: {
        padding:15
    },
    btnApply: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#318bfb',
        borderRadius: 5
    }
})
