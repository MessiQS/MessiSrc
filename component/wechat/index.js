import HTTP from '../../service/http'
var WeChat = require('react-native-wechat');
//启动微信
// console.log("WeChat", WeChat)
WeChat.registerApp('wx8f1006588bd45d9b');

export default class WeChatController {
  static async login() {
    const isWechat = await WeChat.isWXAppInstalled()
    let { code } = isWechat && await WeChat.sendAuthRequest('snsapi_userinfo')
    let loginInfo = await HTTP.post('api/appWxLogin', {
      code,
    })
    return loginInfo
  }
  static async goToWx() {
    const isWechat = await WeChat.isWXAppInstalled()
    isWechat && WeChat.openWXApp()
  }
  static share() {
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          WeChat.shareToSession({ type: 'text', description: '测试微信好友分享文本' })
            .catch((error) => {
              console.log(error.message);
            });
        } else {
          // ToastShort('没有安装微信软件，请您安装微信之后再试');
        }
      });
  }
}