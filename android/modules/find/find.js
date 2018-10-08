/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  View,
  Animated,
  Easing,
  Alert
} from 'react-native'
import Echarts from 'native-echarts'
import { newPaper, pieOption, rememberPaper } from '../../../component/Home/chartOptions'
import moment from 'moment'
import realmManager from "../../../component/Realm/realmManager"
import Storage from "../../../service/storage"
import runtime from "../../../service/runtime"
import AlertView from "../../../component/progress/alert"
import { NavigationActions } from 'react-navigation'
import { Dimensions } from 'react-native'
import questionManager from "../../../service/question_manager"
import ActionSheet from "../../../component/ActionSheet/action.sheet"
import { handleFeedback, handleAccount } from './actionSheet'
import styles, { header, daysTransfer } from './styles'
//安卓独有
import MessageService from '../../../service/message.service';
import { appVersion } from "../../../service/constant";

const { height, width } = Dimensions.get('window')
var WeChat = require('react-native-wechat');

export default class Find extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: '#FFF',
      shadowOpacity: 0.1,
      shadowColor: '#333',
      shadowOffset: { width: 0, height: 1 }
    },
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: (
      <View style={header.header}>
        <Text style={header.text}>
          刷题统计
                </Text>
      </View>
    ),
    headerRight: (
      <View style={header.header}>
        <TouchableOpacity onPress={navigation.state.params ? navigation.state.params.route : () => ({})} style={header.icon} >
          <Image style={header.more} source={require('../../../Images/more.png')} />
        </TouchableOpacity>
      </View>
    )
  })

  constructor(props) {
    super(props)
    this.state = {
      currentExam: "当前暂无题库信息",
      currentExamDetail: "请选择题库",
      info: {},
      showAlert: false,
      fadeInOpacity: new Animated.Value(1),
      actionSheetVisable: false,
    }

    this.params = {
      items: [
        // { text: "账号信息", type: "Normal", handler: () => handleAccount(props) },
        { text: "版本更新", type: "Normal", handler: () => this.handleUpdate() },
        { text: "问题反馈", type: "Normal", handler: () => handleFeedback(props) },
        { text: "退出登录", type: "HighLight", handler: () => this.outLogin() },
      ],
      cancel: "取消",
      touchWildToHide: true,  /// 点击灰色阴影是否消失弹窗
    }
  }

  async handleUpdate() {
    let versionInfoResponse = await MessageService.getUpdateInfo(appVersion);
    if (versionInfoResponse.type) {
      this.setState({
        showVersionInfo: true,
        versionInfo: versionInfoResponse.data
      })
      return true
    } else {
      this.setState({
        showVersionAlert: true,
        alertInfo: versionInfoResponse.data
      })
      this.timeout = setTimeout(() => {
        this.timeout = null
        this.setState({
          showVersionAlert: false,
        })
      }, 3000)
    }
  }
  /// index 从0-3
  itemButtonClick = (index) => {
    this.setState({
      actionSheetVisable: false,
    })
  }

  componentDidMount() {
    this._updateUI()
    this.isUpdateChart = false

    runtime.on('find_update_state', () => {
      console.log("updateUI")
      this._updateUI()
    })
  }

  async _updateUI() {

    const user = realmManager.getCurrentUser()
    const that = this
    this.isUpdateChart = true
    setTimeout(() => {
      that.isUpdateChart = false
    }, 1000)
    if (questionManager.hasQuestions()) {
      let info = questionManager.getChartInfo()
      that.setState({
        currentExam: questionManager.getCurrentPaperTitle(),
        currentExamDetail: "历年真题",
        fadeInOpacity: new Animated.Value(0.01),
        info: info,
      })
    } else {
      let info = new Object()
      info.newQuestionCount = "0"
      info.wrongQuestionCount = "0"
      info.newLastSelectDate = "暂无数据"
      info.wrongLastSelectDate = "暂无数据"
      info.futureArray = [0, 0, 0, 0, 0, 0]
      info.beforeArray = [0, 0, 0, 0, 0, 0]
      info.pieArray = [{ value: 1 }, { value: 1 }, { value: 1 }]
      info.newAverage = 0
      info.wrongAverage = 0
      this.setState({
        currentExam: "当前暂无题库信息",
        currentExamDetail: "请选择题库",
        fadeInOpacity: new Animated.Value(0.01),
        info: info,
      })
    }

    Animated.timing(this.state.fadeInOpacity, {
      toValue: 0.001, // 目标值
      duration: 200, // 动画时间
      easing: Easing.ease, // 缓动函数
    }).start(() => this.showAnimate())
  }

  showAnimate() {
    Animated.timing(this.state.fadeInOpacity, {
      toValue: 1, // 目标值
      duration: 1500, // 动画时间
      easing: Easing.ease, // 缓动函数
    }).start()
  }

  _isShowEmptyData() {

    const { info } = this.state

    if (info.futureArray.toString() == [0, 0, 0, 0, 0, 0].toString() &&
      info.beforeArray.toString() == [0, 0, 0, 0, 0, 0].toString()) {
      return true
    }
    return false
  }

  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.setParams({
        route: this.showMore.bind(this)
      })
    }, 1)
  }

  showMore() {
    this.setState({
      actionSheetVisable: true
    })
  }

  outLogin = () => {
    this.setState({
      actionSheetVisable: false
    })
    const that = this

    setTimeout(function () {
      Alert.alert(
        '确定退出吗?',
        '',
        [
          {
            text: '确定', onPress: async () => {
              const isWechat = await WeChat.isWXAppInstalled()
              let routeName = isWechat ? "LoginWechat" : "Login"
              await realmManager.deleteAllRealmData()
              await Storage.clearAll()
              questionManager.clearData()
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName })
                ]
              })
              that.props.navigation.dispatch(resetAction)
            }
          },
          { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: true }
      )
    }, 500)
  }

  routeToClassification() {
    const { navigate, state } = this.props.navigation
    navigate('MainCategory', {
      callback: (data) => {
        console.log("call back update UI")
        this._updateUI()
      }
    })
  }

  routeToNewDetail() {
    const that = this
    if (this.state.info.newQuestionCount == 0) {
      that.setState({
        showAlert: true,
      })
      setTimeout(() => {
        that.setState({
          showAlert: false,
        })
      }, 2000)

    } else {

      const { navigate } = this.props.navigation
      navigate('Detail', { type: "new" })
    }
  }

  routeToWrongDetail() {
    const that = this
    if (this.state.info.wrongQuestionCount == 0) {
      that.setState({
        showAlert: true,
      })
      setTimeout(() => {
        that.setState({
          showAlert: false,
        })
      }, 2000)

    } else {

      const { navigate } = this.props.navigation
      navigate('Detail', { type: "wrong" })
    }
  }

  _renderTopView() {
    const that = this
    let option = pieOption.option
    if (this.isUpdateChart) {
      option = {
        ...option,
        series: [{
          ...option.series[0],
          data: this.state.info.pieArray
        }]
      }
    } else {
      option.series[0].data = this.state.info.pieArray
    }

    return (

      <View style={styles.titleContent}>
        <ActionSheet visible={that.state.actionSheetVisable} params={that.params} cancelHandler={() => {
          that.setState({
            actionSheetVisable: false
          })
        }} />
        <Image style={styles.greenBlock} source={require("../../../Images/green_block.png")} />
        <View style={styles.titleText}>
          <Text numberOfLines={2} style={[styles.h2, styles.examTitle]}>{this.state.currentExam}</Text>
        </View>
        <Animated.View style={[styles.circleChart, {
          opacity: this.state.fadeInOpacity
        }]}>
          <Echarts option={option} width={60} height={60} />
        </Animated.View>
        <TouchableOpacity style={styles.choosePaperButton} onPress={this.routeToClassification.bind(this)} >
          <Text style={[styles.button, { borderColor: '#1AAD19', borderWidth: 1, color: "#1AAD19" }]}>选题库</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _renderGetChatNewPaper() {

    let newPaperOption = newPaper.option
    let weekArray = []
    for (var i = 5; i > 0; i--) {
      let day = moment().subtract(i, 'days').format('dddd')
      let d = {
        value: daysTransfer[day],
        textStyle: {
          fontSize: 12,
          color: '#8E9091'
        }
      }
      weekArray.push(d)
    }
    weekArray.push({
      value: '今日',
      textStyle: {
        fontSize: 12,
        color: '#172434'
      }
    })

    if (this.isUpdateChart) {

      newPaperOption = {
        ...newPaperOption,
        xAxis: [{
          ...newPaperOption.xAxis[0],
          data: weekArray
        }],
        series: [{
          ...newPaperOption.series[0],
          data: this.state.info.beforeArray
        }]
      }

    } else {

      newPaperOption.xAxis[0].data = weekArray
      newPaperOption.series[0].data = this.state.info.beforeArray
    }

    return (
      <View style={styles.calendarView}>
        <View style={styles.chartTitleContainer}>
          <View style={styles.chartTopContainer}>
            <Image style={styles.redBlock} source={require("../../../Images/blue_block.png")} />
            <Text style={styles.h4}>过去5日刷题数量统计</Text>
            <TouchableOpacity style={[styles.rightTitle]} onPress={this.routeToNewDetail.bind(this)}>
              <Text style={[styles.button, {
                borderColor: '#1495EB',
                borderWidth: 1, color: "#1495EB"
              }]}>刷新题</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.chartBottomContainer}>
            <Text style={styles.psmall}>最后刷题日：{this.state.info.newLastSelectDate}</Text>
            <Text style={styles.average}>平均：{this.state.info.newAverage}</Text>
            <Text style={styles.rightDetail}>剩余：{this.state.info.newQuestionCount}</Text>
          </View>
        </View>
        <Animated.View style={{
          opacity: this.state.fadeInOpacity
        }}>
          <Echarts option={newPaperOption} height={width * 0.6} />
        </Animated.View>
      </View>
    )
  }

  _renderGetChatRemember() {

    let newPaperOption = rememberPaper.option
    let weekArray = [{
      value: '今日',
      textStyle: {
        fontSize: 12,
        color: '#172434'
      }
    }]
    for (var i = 1; i < 6; i++) {
      let day = moment().add(i, 'days').format('dddd')
      let d = {
        value: daysTransfer[day],
        textStyle: {
          fontSize: 12,
          color: '#8E9091'
        }
      }
      weekArray.push(d)
    }

    if (this.isUpdateChart) {
      newPaperOption = {
        ...newPaperOption,
        xAxis: [{
          ...newPaperOption.xAxis[0],
          data: weekArray
        }],
        series: [{
          ...newPaperOption.series[0],
          data: this.state.info.futureArray
        }]
      }
    } else {
      newPaperOption.xAxis[0].data = weekArray
      newPaperOption.series[0].data = this.state.info.futureArray
    }

    return (
      <View style={styles.calendarView}>
        <View style={styles.chartTitleContainer}>
          <View style={styles.chartTopContainer}>
            <Image style={styles.redBlock} source={require("../../../Images/red_block.png")} />
            <Text style={styles.h4}>未来5日遗忘数量预测</Text>
            <TouchableOpacity style={styles.rightTitle} onPress={this.routeToWrongDetail.bind(this)}>
              <Text style={[styles.button, {
                borderColor: '#FF5B29',
                borderWidth: 1, color: "#FF5B29"
              }]}>刷错题</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.chartBottomContainer}>
            <Text style={styles.psmall}>最后刷题日：{this.state.info.wrongLastSelectDate}</Text>
            <Text style={styles.average}>平均：{this.state.info.wrongAverage}</Text>
            <Text style={styles.rightDetail}>剩余：{this.state.info.wrongQuestionCount}</Text>
          </View>
        </View>
        <Animated.View style={{
          opacity: this.state.fadeInOpacity
        }}>
          <Echarts option={newPaperOption} height={width * 0.6} />
        </Animated.View>
      </View>
    )
  }

  render() {

    return (
      <View style={styles.container}>
        {this.state.showAlert == true && <AlertView content="当前没有可刷题目" />}
        {this.state.showVersionAlert && <AlertView content={this.state.alertInfo} />}
        <ScrollView>
          {this._renderTopView()}
          {this._renderGetChatNewPaper()}
          {this._renderGetChatRemember()}
        </ScrollView>
      </View>
    )
  }
}