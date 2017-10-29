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
import AccountInfo from './Account/accountInfo';
import Storage from '../service/storage';
import Pingpay from '../service/pingpp';
var Pingpp = require('pingpp-react-native');
// Pingpp.setDebugModel(true);  

class MineListItem extends Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate(this.props.item.sref,
                    this.props.item.info
                )}>
                <View style={styles.cell}>
                    <View style={styles.cellTitleView}>
                        <Text>{this.props.item.name}</Text>
                    </View>  
                </View>
            </TouchableOpacity>
        )
    }
}
const nativeStyle = {
    thumbnail: {
        width: 90,
        height: 90,
        top: 30,
        borderRadius: 45
    },
    container: {
        backgroundColor: '#fff',
        width: '100%',
        flex: 2
    },
};

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
            sref: 'Update',
            name: '版本更新',
            info: { user: 'Lucy' },
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
    async paytest(){
        // PayService.wechatPay();
        const response = await Pingpay.createCharge({
            client_ip:"192.168.0.103",
            amount:'1',
            channel:'wx',
            subject:'ss0001',
            body:"1234"
        });

        Pingpp.createPayment({
            "object": response.data,
            "urlScheme": "wx8f1006588bd45d9b"
        }, function(res, error) {
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
                <View style={{ flex: 1, height: 220, alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.avatarClick} >
                        <Image square source={require('../Images/head.png')}
                            style={nativeStyle.thumbnail} />
                        <Text style={styles.phoneNumber}>
                            {this.state.account}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tableView}>
                    <View style={styles.separatorView}></View>
                    <MineListItem
                        navigation={this.state.navigation}
                        item={this.listItemArray[0]}
                    />
                    <View style={styles.separatorView}></View>
                    <MineListItem
                        navigation={this.state.navigation}
                        item={this.listItemArray[1]}
                    />
                    <View style={styles.separatorView}></View>
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

                        <TouchableOpacity onPress={this.outofLogin.bind(this)} >
                            <View style={styles.exitButtonStyle}>
                                <Text style={styles.outLogin}>退出登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default Mine;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        width: 200,
        height: 200,
    },
    buttonView: {
        top: 55,
        alignItems: 'center'
    },
    outLogin: {
        color: '#608fd3'
    },
    phoneNumber: {
        top: 48,
        fontSize: 14,
        color: '#333'
    },
    tableView: {
        backgroundColor: '#F6F6F6',
        width: '100%',
        flex: 2
    },
    separatorView: {
        width: '100%',
        height: 7,
    },
    cell: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 40,
    },
    cellTitleView: {
        marginLeft: 15,
        height: '100%',
        justifyContent: 'center',
    },
    exitButtonStyle: {

        borderColor: '#608fd3',
        borderWidth: 2,
    }
});

