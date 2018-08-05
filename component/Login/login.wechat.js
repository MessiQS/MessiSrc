import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
  Keyboard
} from 'react-native';
import Storage from '../../service/storage';
import Http from "../../service/http";
import MD5 from 'crypto-js/md5';
import WeChat from '../wechat'
import realmManager from "../../component/Realm/realmManager"
import MessageService from "../../service/message.service";
import { NavigationActions } from 'react-navigation'
import Progress from '../../component/progress/progress'

const { height, width } = Dimensions.get('window')

export default class LoginWechat extends Component {

  static navigationOptions = {
    header: null,
    headerTintColor: 'white',
    gesturesEnabled: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
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
      account,
      password
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

  async _downloadExam(item) {
    const json = await MessageService.downloadPaper({
      paperId: item.id
    });
    if (json.type == true) {
      const papers = await realmManager.createQuestion(json)
      const memoryModels = await realmManager.createMemoryModels(papers, item.id)
      await realmManager.createExaminationPaper({
        id: item.id,
        title: item.title,
        questionPapers: papers,
        year: item.year,
        province: item.province,
        version: item.version,
        purchased: true,
        price: parseFloat(item.price),
      })
    }
  }

  async _handleMemoryModels(userQuestionInfo) {
    let keys = Object.keys(userQuestionInfo)
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      realmManager.saveMemoryModelsByExamData(userQuestionInfo[key], key);
    }
  }

  async _handleUserInfo(userId) {
    const that = this
    let value = await Http.get('api/getUserQuestionInfo', {
      user_id: userId,
    }, true)

    return value
  }

  wechatLoginButtonClick = async () => {
    const loginInfo = await WeChat.login()
    const { type, data } = loginInfo
    if (type) {
      //将账号和token存到本地存储
      try {
        await Storage.multiSet([
          ['accountToken', data.token],
          ['account', data.account],
          ['userId', data.user_id]
        ]);
        Keyboard.dismiss()
      } catch (e) {
        Alert.alert('登录错误，请重试')
        return
      }
      this.setState({
        loading: true
      })
      data.userInfo.buyedInfo = !!data.userInfo.buyedInfo ? JSON.stringify(data.userInfo.buyedInfo) : []
      var examIdJson = JSON.stringify(data.userInfo.buyedInfo)
      var user = {
        userId: data.user_id,
        token: data.token,
        examIds: examIdJson
      }
      await realmManager.createUser(user)
      let userInfo = await this._handleUserInfo(data.user_id)

      if (!userInfo.type) {
        Alert.alert('登录错误，请重试');
        this.setState({
          loading: false
        })
        return
      }

      if (Object.keys(userInfo.data.lastPaperInfo).length !== 0) {
        let item = {
          id: userInfo.data.lastPaperInfo.id,
          title: userInfo.data.lastPaperInfo.title
        }
        realmManager.updateCurrentExamInfo(item)
      }
      await this._downloadExam(userInfo.data.lastPaperInfo)
      //只存第一套的
      const paper_id = userInfo.data.lastPaperInfo['id'] || null
      let userQuestionInfo = {}
      if (!!paper_id) {
        userQuestionInfo[paper_id] = userInfo.data.userQuestionInfo[paper_id]
      }
      this._handleMemoryModels(userQuestionInfo);
      this.setState({
        loading: false
      })
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    } else {
      Alert.alert(data);
    }
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
        {this.state.loading && <Progress />}
        <ImageBackground style={styles.logo} source={require('../../Images/wechat_logo.png')} resizeMode="contain"></ImageBackground>
        <TouchableOpacity onPress={this.wechatLoginButtonClick}>
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
    width: width - 48,
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
