/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    View, 
    Text,
} from "react-native";

export default class Request extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '问题反馈',
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
                        问题反馈
                    </Text>
                </View>
            </View>
        );
    }
}


