
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
export default class Alert extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.alertView}>
                    <Text style={styles.alertText}>{this.props.content}</Text>
                </View>
            </View>
        )
    }
}

var styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: "100%",
        height: "100%",
        zIndex: 99,
    },
    alertView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666666',
        width: 134,
        height: 38,
        borderRadius: 10,
    },
    alertText: {
        color: 'white',
        fontSize: 12,
    }
}