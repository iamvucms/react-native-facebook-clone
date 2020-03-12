import React, { Component } from 'react'
import {View,ScrollView,Text,StyleSheet} from 'react-native'
import Comment from '../components/Comment'
export default class  extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
    }
    render() {
        const {comments} = this.props.route.params
        return (
            <ScrollView style={styles.container}>
                {comments.map((comment,index)=>(
                    <Comment key={index} comment={comment}>Detail</Comment>  
                ))}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
    }
})
