import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Storage from '../../service/storage';
import Http from "../../service/http";
import MD5 from 'crypto-js/md5';

const { height, width } = Dimensions.get('window')

export default class LoginWechat extends Component {

  static navigationOptions = {
    header: null,
    headerTintColor: 'white',
    gesturesEnabled: false,
  }

  constructor(props) {
    super(props)
  }

  // 预览APP
  skip() {
    if (this._preventPushingMulitpleTimes()) {
      return
    }
    const { navigate } = this.props.navigation;

    var account = "test"
    var password = MD5("messi2101").toString();
    Http.post('api/freeRegistration', {
      account: account,
      password: password
    }, true).then(value => {

      if (value.type == true) {
        Storage.multiSet([
          ['accountToken', value.data.token],
          ['account', account],
          ['userId', value.data.user_id]
        ]);
        navigate('Home', { name: 'Register' })
      }
    }).catch(err => {
      console.log("api/freeRegistration error", err)
    })
  }

  /// 软件协议按钮点击
  clauseClick() {
    const { navigate } = this.props.navigation;
    navigate('SoftwareAgreement', {})
  }

  wechatLoginButtonClick() {

  }

  _preventPushingMulitpleTimes() {
    const that = this
    if (this.isLockPushing == true) {
      return true
    }
    this.isLockPushing = true
    setTimeout(() => {
      that.isLockPushing = false
    }, 1000);
    return false;
  }

  render() {
    return (
      <ImageBackground style={styles.backgroundImage} source={require('../../Images/login_wechat_background.png')}>
        <ImageBackground style={styles.logo} source={require('../../Images/wechat_logo.png')} resizeMode="contain"></ImageBackground>
        <TouchableOpacity onPress={this.wechatLoginButtonClick.bind(this)}>
          <View style={styles.wechatLoginButton}>
            <ImageBackground style={styles.wechatIcon} source={require('../../Images/wechat_icon.png')} resizeMode="contain"></ImageBackground>
            <Text style={styles.loginButtonText}>登录开始高效学习</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.licenses}>登录即表示同意本<Text style={styles.clause} onPress={this.clauseClick.bind(this)}>软件协议</Text></Text>
        <TouchableOpacity onPress={this.skip.bind(this)}>
          <ImageBackground style={styles.arrow} source={require('../../Images/arrow_skip.png')}></ImageBackground>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

var styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: "100%",
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 75,
    marginTop: 156,
  },
  wechatLoginButton: {
    width: width-48,
    height: 40,
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 83,
  },
  wechatIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  loginButtonText: {
    fontSize: 17,
    color: "white",
    backgroundColor: 'rgba(0,0,0,0)',
  },
  licenses: {
    fontSize: 12,
    color: "#FFFFFF",
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 18,
  },
  clause: {
    width: 100,
    height: 50,
    fontWeight: "bold"
  },
  arrow: {
    position: "absolute",
    right: -width / 2 + 30,
    bottom: -height / 2 + 40,
    width: 16,
    height: 16,
  }
})
