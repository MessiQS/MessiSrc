import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
// import { NetworkInfo } from 'react-native-network-info';
import Pingpay from '../../service/pingpp';

// const WeChat = require('react-native-wechat');
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
var Pingpp = require('pingpp-react-native');

export default class PayPage extends React.Component {

    constructor(...props) {
        super();
        this.state = {
            channel: "alipay"
        };
    }

    componentWillMount = () => {
        // console.log(NetworkInfo)
        //应用注册
        // WeChat.registerApp('wx8f1006588bd45d9b');
    }

    //支付测试
    paytest = async () => {
        // console.log(NetworkInfo,NetworkInfo.getIPV4Address)
        // NetworkInfo.getIPV4Address(ssid => {
        //     console.log(ssid);
        // });
        const { channel } = this.state
        const response = await Pingpay.createCharge({
            client_ip: "192.168.0.103",
            amount: '6',
            channel,
            subject: 'ss0001',
            body: "1234"
        });
        //安卓系统
        const data = JSON.stringify(response.data)
        console.log(data)
        //苹果系统直接用data

        Pingpp.createPayment({
            "object": response.data,
            "urlScheme": "wx8f1006588bd45d9b"
        }, function (res, error) {
            console.log(res, error);
        });
    }

    isSelectd(isSelectd) {
        if (!!isSelectd) {
            return <Image style={styles.paySelectIcon} source={require('../../Images/selected_icon.png')}></Image>
        } else {
            return <Image style={styles.paySelectIcon} source={require('../../Images/select_icon.png')}></Image>
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Text style={styles.headerTitleText}>支付金额</Text>
                    <Text style={styles.headerPriceText}>¥ 6.0</Text>
                </View>

                <View style={styles.buttonArray}>
                    <TouchableOpacity style={styles.payView} onPress={() => { this.setState({ channel: "alipay" }) }}>
                        <Image style={styles.payIcon} source={require('../../Images/alipay.png')}></Image>
                        <Text style={styles.payTitle}>支付宝支付</Text>
                        {this.isSelectd(this.state.channel === "alipay")}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.payView} onPress={() => { this.setState({ channel: "wx" }) }}>
                        <Image style={styles.payIcon} source={require('../../Images/wechatPay.png')} ></Image>
                        <Text style={styles.payTitle} onPress={this.share}>微信支付</Text>
                        {this.isSelectd(this.state.channel === "wx")}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity styke={styles.enterButton} onPress={this.paytest}>
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
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonArray: {
        flex: 18,
    },
    enterButton: {
        flex: 3,
    },
    headerTitleText: {
        width: '100%',
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
    },
    headerPriceText: {
        width: '100%',
        marginTop: 11,
        fontSize: 34,
        color: '#FF5B29',
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
        position: "relative"
    },
    payTitle: {
        marginLeft: 17,
        fontSize: 14,
    },
    paySelectIcon: {
        width: 30,
        height: 30,
        marginRight: 26,
        position: "absolute",
        right: 0
    },
    checkButtonView: {
        backgroundColor: '#FF5B29',
        height: 45,
        width: '100%',
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