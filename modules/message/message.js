/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//题库
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View
} from 'react-native';
import ListOfTopics from './ListOfTopics.js'

var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class Message extends Component {

    constructor(props) {
        super(props);
    };

    _select_province(section) {

        const { navigate } = this.props.navigation;
        navigate('TopicsDeail', { section: section })
    }

    render() {
        const that = this
        return (
            <ScrollableTabView 
                tabBarActiveTextColor={'#ffa200'}
                tabBarBackgroundColor={'#fff'}
                tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                style={styles.scrollableTabViewStyle}
                tabBarTextStyle={styles.tabBarTextStyle}
                tabBarPosition={"overlayTop"}>
                <ListOfTopics tabLabel="历年真题" 
                              select_province={that._select_province.bind(that)}/>
                <View tabLabel="专项练习" />
                <View tabLabel="申论" />
            </ScrollableTabView>
        );
    }
}

var styles = ({
    tabBarUnderlineStyle: {
        backgroundColor: '#ffa200',
        height:2,
    },
    scrollableTabViewStyle: {
        marginTop: -10,
        paddingTop: 50,
    },
    tabBarTextStyle: {
        fontSize: 14,
        marginTop: 15,
    },
})

