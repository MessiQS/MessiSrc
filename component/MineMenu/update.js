/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

export default class Update extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '版本更新',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });
    render() {
        return (
            <View contentContainerStyle={{flex: 1}}>
                <View>
                    <Text>
                        版本更新
                    </Text>
                </View>
            </View>
        );
    }
}


