import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    ScrollView
} from 'react-native';
import PayService from './wechatPay';
const WeChat = require('react-native-wechat');
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class PayPage extends React.Component {

    constructor(...props) {
        super();
        this.state = this.state || {};
    }

    static navigationOptions = ({ navigation }) => ({
        title: '支付结算',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });
    componentWillMount = () => {
        //应用注册
        WeChat.registerApp('wx8f1006588bd45d9b');
    }
    share(){
        PayService.wechatShare();
    }
    wechatPay(){
        PayService.wechatPay();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.headerTitleText}>支付金额</Text>
                    <Text style={styles.headerPriceText}>¥ 6.0</Text>
                </View>
                <TouchableOpacity>
                    <View style={styles.payView}>
                        <Image style={styles.payIcon} source={require('../../Images/alipay.png')}></Image>
                        <Text style={styles.payTitle}>支付宝支付</Text>
                        <ScrollView></ScrollView>
                        <Image style={styles.paySelectIcon} source={require('../../Images/selected_icon.png')}></Image>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.payView}>
                        <Image style={styles.payIcon} source={require('../../Images/wechatPay.png')} ></Image>
                        <Text style={styles.payTitle} onPress={this.share}>微信支付</Text>
                        <ScrollView></ScrollView>
                        <Image style={styles.paySelectIcon} source={require('../../Images/select_icon.png')} ></Image>
                    </View>
                </TouchableOpacity>
                <ScrollView></ScrollView>
                <TouchableOpacity onPress={this.wechatPay}>
                    <View style={styles.checkButtonView}>
                        <Text style={styles.checkText}>确认支付</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = ({

    container: {
        flex: 1,
        backgroundColor: '#F6F6F6',
    },
    headerView: {
        backgroundColor: 'white',
        height: 135,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleText: {
        width: '100%',
        marginTop: 26,
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
    },
    headerPriceText: {
        width: '100%',
        marginTop: 11,
        fontSize: 34,
        color: '#FFA200',
        textAlign: 'center',
    },
    payIcon: {
        marginLeft: 26,
        width: 30,
        height: 30,
    },
    payView: {
        backgroundColor: 'white',
        marginTop: 6,
        height: 47,
        flexDirection: 'row',
        alignItems: 'center',
    },
    payTitle: {
        marginLeft: 17,
        fontSize: 14,
    },
    paySelectIcon: {
        width: 30,
        height: 30,
        marginRight: 26,
    },
    checkButtonView: {
        backgroundColor: '#FFA200',
        width: '100%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    }
})