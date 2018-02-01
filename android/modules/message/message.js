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
import ListOfTopics from './ListOfTopics'

var ScrollableTabView = require('react-native-scrollable-tab-view');

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.isLockPushing = false
    };

    _select_province(section) {

        if (this._preventPushingMulitpleTimes()) {
            return
        }

        const { state, navigate } = this.props.navigation;
        navigate('TopicsDetail', {
            section: section,
            go_back_key: state.key,
            callback: state.params.callback
        })
    }

    render() {
        const that = this
        return (
            <ScrollableTabView
                tabBarActiveTextColor={'#FF5B29'}
                tabBarBackgroundColor={'#fff'}
                tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                style={styles.scrollableTabViewStyle}
                tabBarTextStyle={styles.tabBarTextStyle}
                tabBarPosition={"overlayTop"}>
                <ListOfTopics tabLabel="历年真题"
                    select_province={that._select_province.bind(that)} />
                <View style={styles.itemView} tabLabel="专项练习" />
                <View style={styles.itemView} tabLabel="申论" />
            </ScrollableTabView>
        );
    }

    _preventPushingMulitpleTimes() {

        const that = this
        if (this.isLockPushing == true) {
            return true
        }
        this.isLockPushing = true

        setTimeout(() => {
            that.isLockPushing = false
        }, 1000);
        return false;
    }
}

var styles = ({
    tabBarUnderlineStyle: {
        backgroundColor: '#FF5B29',
        height: 2,
    },
    scrollableTabViewStyle: {
        marginTop: -10,
        paddingTop: 50,
    },
    tabBarTextStyle: {
        fontSize: 16,
        marginTop: 15,
    },
    itemView: {
        backgroundColor: '#F6F6F6',
        height: '100%'
    }
})

