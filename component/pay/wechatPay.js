var WeChat=require('react-native-wechat');
import { Alert } from 'react-native';
import Http from '../../service/http';
import { NetworkInfo } from 'react-native-network-info';
import Storage from '../../service/storage';
import MD5 from 'crypto-js/md5';

let getWechatSign = (props) =>{
	let keyArr = Object.keys(props).sort();
	let stringA = '';
	keyArr.forEach( (res,index) => {
		if(index === 0){
			stringA = stringA + res + '=' + props[res];
		}else{
			stringA =  stringA + '&' + res + '=' + props[res];
		}
	});
    const stringSignTemp = stringA + "&key=yegeqinshou2101yegeqinshou210111";
    console.log(MD5(stringSignTemp).toString())
	const sign = MD5(stringSignTemp).toString().toUpperCase();
	return sign;
};
//获取32位随机串
let getUid = () => {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}
export default class PayService {
    static wechatShare(){
        WeChat.isWXAppInstalled()
        .then((isInstalled) => {
          if (isInstalled) {
            WeChat.shareToSession({
                type: 'imageUrl',
                title: 'web image',
                description: 'share web image to time line',
                mediaTagName: 'email signature',
                messageAction: undefined,
                messageExt: undefined,
                imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'
              })
            .catch((error) => {
              Alert.alert(error.message);
            });
          } else {
            Alert.alert('没有安装微信软件，请您安装微信之后再试');
          }
        });
    }
    static wechatPay(data) {
        // const { attach, total_fee } = data;//价格与购买的商品来自于data
        let total_fee = 1,
            attach = '2013-安徽';
        let user_ip;
        // Get IPv4 IP (Android Only) 
        NetworkInfo.getIPV4Address(ipv4 => {
            user_ip = ipv4;
        });
        WeChat.isWXAppInstalled()
            .then(async  isInstalled => {
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
                    const paydata = httpRes.data;
                    WeChat.once('PayReq.Resp', response => {
                        if (parseInt(response.errCode) === 0) {
                            Alert.alert('支付成功');
                        } else {
                            Alert.alert('支付失败');
                        }
                    });
                    let ruction =  {
                        appId:'wx8f1006588bd45d9b',
                        partnerId: paydata.mch_id,  // 商家向财付通申请的商家id
                        prepayId: paydata.prepay_id,   // 预支付订单
                        nonceStr: getUid(),   // 随机串，防重发
                        timeStamp: parseInt(new Date().getTime()/1000,10).toString(),  // 时间戳，防重发
                        package: "Sign=WXPay",    // 商家根据财付通文档填写的数据和签名
                    };
                    ruction.sign = getWechatSign(ruction);
                    console.log(ruction)
                    const result = await WeChat.pay(ruction);
                    if (result.errCode && result.errStr) {
                        console.log('错误')
                    }
                } else {
                    Alert.alert('没有安装微信，请先安装微信')
                }
            })
    }
}