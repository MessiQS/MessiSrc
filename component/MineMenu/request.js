/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Container,
    Text,
    View,
    Content
} from 'native-base';

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
            <Container contentContainerStyle={{flex: 1}}>
                <Content>
                    <Text>
                        问题反馈
                    </Text>
                </Content>
            </Container>
        );
    }
}


