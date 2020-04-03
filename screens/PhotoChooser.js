import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { FetchSystemImagesRequest } from '../actions/systemImagesActions';
import { SCREEN_WIDTH, STATUSBAR_HEIGHT } from '../constants';
import ExTouchableOpacity from '../components/ExTouchableOpacity';
import { navigation } from '../rootNavigation';
class PhotoChooser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndexs: []
        }
    }
    componentDidMount() {
        const { fetchSystemImages } = this.props
        fetchSystemImages()
    }
    onPressEscHandler() {
        navigation.goBack()
    }
    onPressSelectImageHandler(index) {
        const isMutiple = this.props.route.params?.isMutiple
        let selectedIndexs = [...this.state.selectedIndexs]
        if (selectedIndexs.indexOf(index) > -1) {
            if (isMutiple === false) return this.setState({
                ...this.state,
                selectedIndexs: []
            })
            selectedIndexs.splice(selectedIndexs.indexOf(index), 1)
        } else {
            if (isMutiple === false) return this.setState({
                ...this.state,
                selectedIndexs: [index]
            })
            selectedIndexs.push(index)
        }
        this.setState({
            ...this.state,
            selectedIndexs
        })
    }
    onPressCameraHandler() {
        navigation.navigate('Camera')
    }
    render() {
        const { systemImages } = this.props
        const { selectedIndexs } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <ExTouchableOpacity style={styles.btnEsc} onPress={this.onPressEscHandler}>
                        <FontAwesome5Icon name="times" size={20} />
                    </ExTouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Gallery</Text>
                    </View>
                    {selectedIndexs.length > 0 ?
                        <ExTouchableOpacity>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Done</Text>
                        </ExTouchableOpacity>
                        : <ExTouchableOpacity onPress={this.onPressCameraHandler.bind(this)}>
                            <FontAwesome5Icon name="camera" size={20} />
                        </ExTouchableOpacity>
                    }

                </View>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.cameraRollWrapper}>
                        {systemImages.map((photo, index) => (
                            <TouchableOpacity
                                onPress={this.onPressSelectImageHandler.bind(this, index)}
                                style={{
                                    ...styles.cameraRollImageWrapper, borderWidth: selectedIndexs.indexOf(index) > -1 ? 4 : 0, borderColor: '#318bfb'
                                }}
                                activeOpacity={1} key={index} >
                                <Image style={styles.cameraRollImage} source={{ uri: photo.uri }} />
                                {selectedIndexs.indexOf(index) > -1 && <View style={styles.selectedCount}>
                                    <Text style={{ color: '#fff', fontWeight: '600' }}>{selectedIndexs.indexOf(index) + 1}</Text>
                                </View>}
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View >
        )
    }
}
const mapStateToProps = state => {
    return {
        systemImages: state.systemImages
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchSystemImages: () => dispatch(FetchSystemImagesRequest())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PhotoChooser);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    navigationBar: {
        height: 94,
        paddingTop: STATUSBAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    btnEsc: {

    },
    cameraRollWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    cameraRollImageWrapper: {
        width: SCREEN_WIDTH / 3 - 2,
        height: SCREEN_WIDTH / 3 - 2,
        marginBottom: 3,
        position: 'relative',
    },
    cameraRollImage: {
        width: '100%',
        height: '100%',
    },
    selectedCount: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#318bfb',
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})
