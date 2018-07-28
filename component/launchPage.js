import React, { Component } from 'react';
import {
    View,
    ImageBackground
} from 'react-native';
import Storage from '../service/storage';
import Http from '../service/http';
import { NavigationActions } from 'react-navigation'
import realmManager from "../component/Realm/realmManager"

export default class LaunchPage extends React.Component {
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

    async componentDidMount() {
        const that = this
        const { accountToken, account } = await Storage.multiGet(['accountToken', 'account'])
        if (accountToken && account) {
            return Http.post('api/checkToken', { accountToken, account }).then(({ type, data }) => {
                let route = 'Login';
                if (type) {
                    route = 'Home'
                } else {
                    realmManager.deleteAllRealmData()
                    Storage.clearAll()
                }
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: route })
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            })
        } else {
            realmManager.deleteAllRealmData()
            Storage.clearAll()
            that.navigateToLogin()
        }
    }

    navigateToLogin() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: "Login" })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        return (
            <ImageBackground source={require('../Images/login_background.png')} style={{ flex: 1 }} />
        );
    }
}