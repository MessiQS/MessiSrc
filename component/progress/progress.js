import * as Progress from 'react-native-progress';
import React, { Component } from 'react';
import {
    View,
} from 'react-native';

class ProgressView extends React.Component {

    render() {
        return (
            <View style={styles.progressView}>
                <Progress.Circle size={30} indeterminate={true} />
            </View>
        )
    }
}

var styles = {
    progressView: {
        backgroundColor: 'white',
        width: 100,
        height: 80,
        borderRadius:10,
    },
}