import * as Progress from 'react-native-progress';
import React, { Component } from 'react';
import {
    View,
} from 'react-native';

export default class ProgressView extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.progressView}>
                   <Progress.Circle size={30} indeterminate={true} />
                </View>
            </View>
        )
    }
}

var styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        width: "100%",
        height: "100%",
        zIndex: 99,
    },
    progressView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: 60,
        height: 60,
        borderRadius:10,
    },
}