import * as wechat from 'react-native-wechat'
import { Alert } from 'react-native';
import Http from '../../service/http';
import { NetworkInfo } from 'react-native-network-info';

WeChat.registerApp('wx8f1006588bd45d9b');

export default class payService {
    static wechatPay(data) {
        // const { attach, total_fee } = data;//价格与购买的商品来自于data
        let total_fee = 1,
            attach = '2013-安徽';
        let user_ip;
        // Get IPv4 IP (Android Only) 
        NetworkInfo.getIPV4Address(ipv4 => {
            console.log(ipv4);
            user_ip = ipv4;
        });
        WeChat.isWXAppInstalled()
            .then(async  isInstalled => {
                console.log(isInstalled);
                if (isInstalled) {
                    const account = await Storage.getItem('account');
                    //第一步获取账号
                    const httpRes = await Http.post('api/wechatpay', {
                        account: account,
                        user_ip: user_ip,
                        total_fee: total_fee,
                        attach: attach
                    });
                    if (!httpRes.type) {
                        Alert.alert(httpRes.data);
                        return;
                    };
                    console.log(httpRes.data);
                    WeChat.once('PayReq.Resp', response => {
                        if (parseInt(response.errCode) === 0) {
                            Alert.alert('支付成功');
                        } else {
                            Alert.alert('支付失败');
                        }
                    });
                    const result = await WeChat.pay(
                        {
                            partnerId: '',  // 商家向财付通申请的商家id
                            prepayId: '',   // 预支付订单
                            nonceStr: '',   // 随机串，防重发
                            timeStamp: '',  // 时间戳，防重发
                            package: '',    // 商家根据财付通文档填写的数据和签名
                            sign: ''        // 商家根据微信开放平台文档对数据做的签名
                        }
                    );
                    if (result.errCode && result.errStr) {
                        console.log('错误')
                    }
                } else {
                    Alert.alert('没有安装微信，请先安装微信')
                }
            })
    }
}