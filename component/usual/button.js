import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet,
    // TouchableHighlight,
    TouchableOpacity,
    Text
} from 'react-native';

export default class SamsoButton extends Component {
    constructor(props) {
        super()
    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.initView, this.props.style]}>
                <View style={styles.initStyle}>
                    <Text style={[styles.textStyle,this.props.textStyle]}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    initView: {
        backgroundColor: '#FF5B29',
        borderRadius: 5,
        height: 60,
    },
    initStyle: {
        justifyContent:'center',
        flexDirection: 'row',
    },
    textStyle:{
        lineHeight:44,
        fontSize:20,
        color:'#fff'
    }
})