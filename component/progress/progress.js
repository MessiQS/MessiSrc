import * as Progress from 'react-native-progress';
import React, { Component } from 'react';
import {
    View,
    Modal
} from 'react-native';

export default class ProgressView extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <Modal visible={true} transparent={true} onRequestClose={() => {}}>
                <View style={styles.container}>
                    <View style={styles.progressView}>
                        <Progress.Circle color={'#FF5B29'} size={30} indeterminate={true} />
                    </View>
                </View>
            </Modal>
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