import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import Storage from '../service/storage';
import Http from '../service/http';


class LaunchPage extends React.Component {

    constructor(...props) {
        super();
        this.state = this.state || {};
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
        transitionConfig: (() => ({
            //因为ios 的导航动画默认是从左到右，所以，这里配置一下动画，使用react-navigation已经实现的从左到右的动画，
            //适配Android，不过，需要导入动画 
            //import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
            screenInterpolator: CardStackStyleInterpolator.none,
        }))
    });

    componentDidMount() {
        const { navigate } = this.props.navigation;
        Storage.multiGet(['accountToken', 'account']).then(({ accountToken, account }) => {
            if (accountToken && account) {
                return Http.post('api/checkToken',{accountToken,account}).then(({ type, data }) => {
                    if(!type){
                        navigate('Login', { name: 'MainTab' })
                    }else{
                        navigate('MyTab', { name: 'MainTab' })
                    }
                })
            }
            navigate('Login', { name: 'MainTab' })
        })
    }

    render() {
        return (
            <View></View>
        );
    }
}

export default LaunchPage;