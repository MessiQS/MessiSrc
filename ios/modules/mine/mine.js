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
import AccountInfo from '../../../component/Account/accountInfo';
import Storage from '../../../service/storage';
import Pingpay from '../../../service/pingpp';
import Icon from 'react-native-vector-icons/Ionicons';
import { MineListItem } from '../../../component/usual/item'
import realmManger from "../../../component/Realm/realmManager"
import { NavigationActions } from 'react-navigation'

var Pingpp = require('pingpp-react-native');

const createLeftIcon = (name) => {
    return {
        type: 'SimpleLineIcons',
        name
    }
}
const rightIcon = {
    type: 'SimpleLineIcons',
    name: 'arrow-right',
    iconStyle:{
        fontSize:10
    }
}
class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation
        }
        Storage.getItem('account').then(res => {
            this.setState({
                account: (() => {
                    let result = res.split('');
                    result.splice(3, 0, ' ');
                    result.splice(8, 0, ' ')
                    return result.join('');
                })()
            })
        })
    }

    listItemArray = [
        {
            sref: 'AccountInfo',
            name: '账号信息',
            info: { name: 'AccountInfo' },
            leftIcon:createLeftIcon('user'),
            rightIcon,
            tipBorder: 1
        },
        {
            sref: 'CPStepThree',
            name: '版本更新',
            info: { account: 15895537043 },
            leftIcon:createLeftIcon('settings'),
            rightIcon,
            tipBorder: 0
        }, {
            sref: 'Feedback',
            name: '问题反馈',
            info: { user: 'Lucy' },
            leftIcon:createLeftIcon('user-follow'),
            rightIcon,
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
        realmManger.deleteAllRealmData()
        let clearPromise = Storage.clearAll()
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Login'})
            ]
          })

        clearPromise.then(res => {

            this.props.navigation.dispatch(resetAction)
           }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <Image source={require('../../../Images/head.png')}
                        style={styles.thumbnail} />
                    <Text style={styles.phoneNumber}>
                        +86 {this.state.account}
                    </Text>
                </View>
                <View style={styles.tableView}>
                    <View>
                        <Text style={styles.itemTitle}>
                            个人中心
                        </Text>
                    </View>
                    {
                        this.listItemArray.map(result => (
                        <MineListItem
                            navigation={this.state.navigation}
                            item={result}
                            key ={result.name}
                        />))
                    }
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
                    <Icon name={'ios-log-out'} size={20} style={styles.outLoginIcon}></Icon>
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
    buttonView: {
        top: 55,
        alignItems: 'center'
    },
    outLogin: {
        lineHeight: 45,
        color: "#fff",
        paddingLeft: 5
    },
    outLoginIcon: {
        paddingTop: 3,
        lineHeight: 42,
        color: "#fff",
    },
    phoneNumber: {
        marginTop: 3,
        fontSize: 22,
        color: '#000',
    },
    thumbnail: {
        width: 110,
        height: 110,
        marginTop: 25,
        borderRadius: 55
    },
    head: {
        flex: 4,
        alignItems: 'center',
        width: '100%'
    },
    tableView: {
        // backgroundColor: '#F6F6F6',
        width: '100%',
        flex: 8
    },
    exitButtonStyle: {
        flex: 1,
        backgroundColor: "#FF5B29",
        flexDirection: "row",
        justifyContent: "center"
    },
    itemTitle: {
        backgroundColor: "#EEF1F6",
        fontSize: 14,
        lineHeight: 32,
        paddingLeft: 15,
    }
});

