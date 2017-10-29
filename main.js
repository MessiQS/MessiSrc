/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { TabNavigator, StackNavigator } from "react-navigation";
import Home from './modules/home/home';
import Mine from './component/mine';
import Find from './component/find';
import Message from './component/message/message';//选题
import Account from './component/MineMenu/account';
import Update from './component/MineMenu/update';
import Request from './component/MineMenu/request';
import Detail from './component/detail/detail';
import Register from './component/Login/register';
import Login from './component/Login/login';
import LoginPage from './component/Login/loginPage';
import AccountInfo from './component/Account/accountInfo';
import ModifyPasswordPage from './component/Account/modifyPasswordPage';
import ChangePhoneNumberStepOnePage from './component/Account/changePhoneNumberStepOnePage';
import ChangePhoneNumberStepTwoPage from  './component/Account/changePhoneNumberStepTwoPage';
import ChangePhoneNumberStepThreePage from './component/Account/changePhoneNumberStepThreePage';
import ForgotPasswordStepOnePage from './component/Account/forgotPasswordStepOnePage';
import ForgotPasswordStepTwoPage from './component/Account/forgotPasswordStepTwoPage';
import ForgotPasswordStepThreePage from './component/Account/forgotPasswordStepThreePage';
import PayPage from './component/pay/payPage'
import LaunchPage from './component/launchPage';

let bookIcon = require('./Images/book.png');
let questionIcon = require('./Images/question.png');
let chartIcon = require('./Images/chart.png');
let mineIcon = require('./Images/mine.png');
let headImage = require('./Images/head.png');

const MainTab = TabNavigator({
    home: {
        screen: Home,
        navigationOptions: () => TabOptions('刷题', questionIcon, questionIcon, '当前题库')
    },
    message: {
        screen: Message,
        navigationOptions: () => TabOptions('题库', bookIcon, bookIcon, '选择题库')
    },
    find: {
        screen: Find,
        navigationOptions: () => TabOptions('统计', chartIcon, chartIcon, '刷题统计')
    },
    mine: {
        screen: Mine,
        navigationOptions: () => TabOptions('我的', mineIcon, mineIcon, '我的')
    },
},
    {
        tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
        swipeEnabled: false, // 是否允许在标签之间进行滑动。
        animationEnabled: false, // 是否在更改标签时显示动画。
        lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
        initialRouteName: '', // 设置默认的页面组件
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        tabBarOptions: {
            // iOS属性

            activeTintColor: '#ffa200', // label和icon的前景色 活跃状态下（选中）。
            // activeBackgroundColor:'', //label和icon的背景色 活跃状态下（选中） 。
            // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
            // inactiveBackgroundColor:'', // label和icon的背景色 不活跃状态下（未选中）。
            showLabel: true, // 是否显示label，默认开启。
            style:{
                borderTopColor:'#666',
            }, // tabbar的样式。
            // labelStyle:{}, //label的样式。

            // 安卓属性

            // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
            // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
            showIcon: true, // 是否显示图标，默认关闭。
            // showLabel:true, //是否显示label，默认开启。
            // style:{}, // tabbar的样式。
            // labelStyle:{}, // label的样式。
            upperCaseLabel: false, // 是否使标签大写，默认为true。
            // pressColor:'', // material涟漪效果的颜色（安卓版本需要大于5.0）。
            // pressOpacity:'', // 按压标签的透明度变化（安卓版本需要小于5.0）。
            // scrollEnabled:false, // 是否启用可滚动选项卡。
            // tabStyle:{}, // tab的样式。
            // indicatorStyle:{}, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
            // labelStyle:{}, // label的样式。
            // iconStyle:{}, // 图标的样式。
        }

    });
const TabOptions = (tabBarTitle, normalImage, selectedImage, navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({ tintColor, focused }) => {
        return (
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{ height: 20, width: 20 }, { tintColor: tintColor }]}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = { color: 'white', alignSelf: 'center', fontSize: 18 };
    // header的style
    const headerStyle = {
        backgroundColor: '#051425',
        opacity: 0.9,
    };
    const tabBarVisible = true;
    const headerLeft = null;
    return { tabBarLabel, tabBarIcon, headerTitle, headerLeft, headerStyle, headerTitleStyle, tabBarVisible };
};
const Messi = StackNavigator({
    
    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    LaunchPage: {
        screen: LaunchPage,
    },
    Login:{
		screen: Login,
    },
    MyTab: {
        screen: MainTab,
    },
    // 将需要跳转的页面注册在这里，全局才可以跳转
    Account: {
        screen: Account,
    },
    Request: {
        screen: Request,
    },
    Update: {
        screen: Update
    },
    Detail:{
        screen: Detail
    },
    Register:{
        screen: Register
    },
	LoginPage: {
		screen: LoginPage,
    },
    AccountInfo: {
        screen: AccountInfo,
    },
    ModifyPasswordPage: {
        screen: ModifyPasswordPage,
    },
    ChangePhoneNumberStepOnePage: {
        screen: ChangePhoneNumberStepOnePage,
    },
    ChangePhoneNumberStepTwoPage: {
        screen: ChangePhoneNumberStepTwoPage,
    },
    ChangePhoneNumberStepThreePage: {
        screen: ChangePhoneNumberStepThreePage,
    },
    ForgotPasswordStepOnePage: {
        screen: ForgotPasswordStepOnePage,
    },
    ForgotPasswordStepTwoPage: {
        screen: ForgotPasswordStepTwoPage,
    },
    ForgotPasswordStepThreePage: {
        screen: ForgotPasswordStepThreePage,
    },
    PayPage: {
        screen: PayPage,
    }
})

export default Messi;