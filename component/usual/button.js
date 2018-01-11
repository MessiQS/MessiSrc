import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet,
    Platform,
    TouchableOpacity,
    ImageBackground,
    Text
} from 'react-native';
export default class SamsoButton extends Component {
    constructor(props) {
        super()
    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.initView, this.props.style]}>
                <ImageBackground style={styles.initStyle} source={require('../../Images/verti_code_button.png')}>
                    <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    initView: {
        ...Platform.select({
            ios: {
                height: 60,
            },
            android: {
                height: 60,
            }
        }),
        borderRadius: 6,
        overflow: 'hidden',
    },
    initStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 6,
        height: 60,
    },
    textStyle: {
        fontSize: 20,
        color: '#fff',
        backgroundColor: "rgba(0,0,0,0)",
    }
})