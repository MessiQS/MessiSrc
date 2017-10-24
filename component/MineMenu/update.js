/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Container,
    Text,
    Body,
    Content
} from 'native-base';

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
            <Container contentContainerStyle={{flex: 1}}>
                <Content>
                    <Text>
                        版本更新
                    </Text>
                </Content>
            </Container>
        );
    }
}


