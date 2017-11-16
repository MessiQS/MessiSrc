/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native';
import AccountInfo from '../../component/Account/accountInfo';
import Storage from '../../service/storage';
import Pingpay from '../../service/pingpp';
import { MineListItem } from '../../component/usual/item'
var Pingpp = require('pingpp-react-native');

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation
        }
        Storage.getItem('account').then(res => {
            this.setState({
                account: res
            })
        })
    }

    listItemArray = [
        {
            sref: 'AccountInfo',
            name: '账号信息',
            info: { name: 'AccountInfo' },
            tipBorder: 1
        },
        {
            sref: 'CPStepThree',
            name: '版本更新',
            info: { account: 15895537043 },
            tipBorder: 0
        }, {
            sref: 'Request',
            name: '问题反馈',
            info: { user: 'Lucy' },
            tipBorder: 0
        }
    ];

    avatarClick() {

    };
    //支付测试
    async paytest() {
        // PayService.wechatPay();
        const response = await Pingpay.createCharge({
            client_ip: "192.168.0.103",
            amount: '1',
            channel: 'wx',
            subject: 'ss0001',
            body: "1234"
        });

        Pingpp.createPayment({
            "object": response.data,
            "urlScheme": "wx8f1006588bd45d9b"
        }, function (res, error) {
            console.log(res, error);
        });
    }
    //退出登录
    outofLogin() {
        const { navigate } = this.props.navigation;
        //将账号和token存到本地存储
        let setToken = Storage.removeItem('accountToken');
        setToken.then(res => navigate('Login', { name: 'MainTab' }))
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <TouchableOpacity onPress={this.avatarClick} >
                        <Image source={require('../../Images/head.png')}
                            style={styles.thumbnail} />
                        <Text style={styles.phoneNumber}>
                            +86 {this.state.account}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tableView}>
                    <MineListItem
                        navigation={this.state.navigation}
                        item={this.listItemArray[0]}
                    />
                    <MineListItem
                        navigation={this.state.navigation}
                        item={this.listItemArray[1]}
                    />
                    <MineListItem
                        navigation={this.state.navigation}
                        item={this.listItemArray[2]}
                    />
                    <View style={styles.buttonView}>
                        <View>
                            <Button
                                title="支付测试"
                                onPress={this.paytest.bind(this)}
                            >
                            </Button>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.exitButtonStyle} onPress={this.outofLogin.bind(this)} >
                    <Text style={styles.outLogin}>退出登录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Mine;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    head: {
        flex: 5,
        alignItems: 'center',
        backgroundColor:"red",
        width:'100%'
    },
    buttonView: {
        top: 55,
        alignItems: 'center'
    },
    outLogin: {
        color: '#608fd3'
    },
    phoneNumber: {
        marginTop:3,
        fontSize: 18,
        color: '#000',
    },
    thumbnail: {
        width: 110,
        height: 110,
        marginTop: 35,
        borderRadius: 55
    },
    tableView: {
        backgroundColor: '#F6F6F6',
        width: '100%',
        flex: 9
    },
    separatorView: {
        width: '100%',
        height: 7,
    },
    exitButtonStyle: {
        flex: 1
    }
});

