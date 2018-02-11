/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";

import Mine from './modules/mine/mine';
import SoftwareAgreement from './modules/mine/software_agreement';
import Feedback from './modules/mine/feedback';
import Find from './modules/find/find';
import Message from './modules/message/message';//选题
import Account from '../component/MineMenu/account';
import Update from '../component/MineMenu/update';
import Request from '../component/MineMenu/request';
import Detail from '../component/detail/detail';
import TopicsDetail from "./modules/message/topics_detail"
import Register from '../component/Login/register';
import Login from '../component/Login/login';
import LoginPage from '../component/Login/loginPage';
import AccountInfo from '../component/Account/accountInfo';
import ModifyPasswordPage from '../component/Account/modifyPasswordPage';
//cps changePhoneNumber
import CPStepOne from '../component/changePhoneNumber/stepOne';
import CPStepTwo from '../component/changePhoneNumber/stepTwo';
import CPStepThree from '../component/changePhoneNumber/stepThree';
//fps forgotPassword
import FPStepOne from '../component/forgetPassword/stepOne';
import FPStepTwo from '../component/forgetPassword/stepTwo';
import FPStepThree from '../component/forgetPassword/stepThree';
import PayPage from '../component/pay/payPage'
import LaunchPage from '../component/launchPage';


import runtime from "../service/runtime";

let bookIcon = require('../Images/book.png');
let questionIcon = require('../Images/question.png');
let chartIcon = require('../Images/chart.png');
let mineIcon = require('../Images/mine.png');
let headImage = require('../Images/head.png');

const TabOptions = ({ title }) => {
    const headerTitleStyle = {
        color: '#172434',
        textAlign: 'center',
        fontSize: 20,
        alignSelf: 'center'
    }
    const headerStyle = {
        backgroundColor: '#FFF',
        opacity: 1,
        borderBottomWidth: 0,
        shadowOpacity: 0.2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 }
    }
    return ({ navigation, screenProps }) => ({
        title: title || navigation.state.params.section.item.title,
        headerTitleStyle: {
            color: '#172434',
            textAlign: 'center',
            fontSize: 20,
            alignSelf: 'center'
        },
        headerStyle,
        color: '#172434',
        gesturesEnabled: true,
        headerRight: navigation.state.params.headerRight || (<View></View>),
    })
}
const Messi = StackNavigator({

    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    LaunchPage: {
        screen: LaunchPage,
    },
    Login: {
        screen: Login,
    },
    Home: {
        screen: Find
    },
    Mine: {
        screen: Mine,
        navigationOptions: TabOptions({
            title: '个人中心'
        })
    },
    // 将需要跳转的页面注册在这里，全局才可以跳转
    Account: {
        screen: Account,
    },
    //题库页面
    Message: {
        screen: Message,
        navigationOptions: TabOptions({
            title: '题库选择'
        }),
        mood: "modal",
    },
    Request: {
        screen: Request,
    },
    Update: {
        screen: Update
    },
    Detail: {
        screen: Detail
    },
    Register: {
        screen: Register,
        navigationOptions: TabOptions({
            title: '注册'
        })
    },
    LoginPage: {
        screen: LoginPage,
        navigationOptions: TabOptions({
            title: '登录'
        })
    },
    AccountInfo: {
        screen: AccountInfo,
        navigationOptions: TabOptions({
            title: '账号信息'
        })
    },
    ModifyPasswordPage: {
        screen: ModifyPasswordPage,
        navigationOptions: TabOptions({
            title: '修改密码'
        })
    },
    CPStepOne: {
        screen: CPStepOne,
        navigationOptions: TabOptions({
            title: '更换手机号'
        })
    },
    CPStepTwo: {
        screen: CPStepTwo,
        navigationOptions: TabOptions({
            title: '更换手机号'
        })
    },
    CPStepThree: {
        screen: CPStepThree,
        navigationOptions: TabOptions({
            title: '更换手机号'
        })
    },
    FPStepOne: {
        screen: FPStepOne,
        navigationOptions: TabOptions({
            title: '忘记密码'
        })
    },
    FPStepTwo: {
        screen: FPStepTwo,
        navigationOptions: TabOptions({
            title: '忘记密码'
        })
    },
    FPStepThree: {
        screen: FPStepThree,
        navigationOptions: TabOptions({
            title: '忘记密码'
        })
    },
    PayPage: {
        screen: PayPage,
    },
    TopicsDetail: {
        screen: TopicsDetail,
        navigationOptions: TabOptions({
        })
    },
    SoftwareAgreement: {
        screen: SoftwareAgreement,
        navigationOptions: TabOptions({
            title: '软件协议'
        })
    },
    Feedback: {
        screen: Feedback,
        navigationOptions: TabOptions({
            title: '问题反馈'
        })
    }
})
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

export default () => (<Messi
    onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getCurrentRouteName(currentState);
        const prevScreen = getCurrentRouteName(prevState);
        const uodateNameArray = ['TopicsDetail', 'Detail']
        if (currentScreen === 'Home' && uodateNameArray.indexOf(prevScreen) >= 0) {
            runtime.emit('find_update_state')
        }
    }}
/>);
