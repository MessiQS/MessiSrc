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
                    <Text style={styles.btnLoginText}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    initView: {
        backgroundColor: '#FFA200',
        borderRadius: 5,
    },
    initStyle: {
        borderRadius: 5,
        justifyContent:'center',
        flexDirection: 'row',
    },
    btnLoginText:{
        borderRadius: 5,
        lineHeight:44,
        fontSize:20,
        color:'#fff'
    }
})