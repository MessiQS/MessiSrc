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
} from 'react-native'
import Echarts from 'native-echarts'
import { newPaper, pieOption, rememberPaper } from '../../../component/Home/chartOptions'
import moment from 'moment'
import realmManager from "../../../component/Realm/realmManager"
import runtime from "../../../service/runtime"
import AlertView from "../../../component/progress/alert"
import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')
import questionManager from "../../../service/question_manager"
import ActionSheet from "../../../component/ActionSheet/action.sheet"


const header = {
  header: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    paddingLeft: 35,
    flex: 7,
    color: "#172434",
  },
  icon: {
    marginRight: 20,
  },
  magnifier: {
    width: 18,
    height: 18,
  },
  more: {
    width: 22,
    height: 44,
    resizeMode: 'contain',
  }
}
var daysTransfer = {
  'Sunday': '周日',
  'Monday': '周一',
  'Tuesday': '周二',
  'Wednesday': '周三',
  'Thursday': '周四',
  'Friday': '周五',
  'Saturday': '周六'
}

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
        { text: "账号信息", type: "Normal", handler: this.itemButtonClick },
        { text: "版本更新", type: "Normal", handler: this.itemButtonClick },
        { text: "问题反馈", type: "Normal", handler: this.itemButtonClick },
        { text: "退出登录", type: "HighLight", handler: this.itemButtonClick },
      ],
      cancel: "取消",
      touchWildToHide: true,  /// 点击灰色阴影是否消失弹窗
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
    if (user && user.currentExamId) {
      let info = questionManager.getChartInfo()
      console.log("info", info)
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
            <Text style={styles.average}>平均値：{this.state.info.newAverage}</Text>
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
            <Text style={styles.average}>平均値：{this.state.info.wrongAverage}</Text>
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
        {this.state.showAlert == true ? <AlertView content="当前没有可刷题目" /> : null}
        <ScrollView>
          {this._renderTopView()}
          {this._renderGetChatNewPaper()}
          {this._renderGetChatRemember()}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    backgroundColor: '#F6F6F6',
    width: '100%',
    height: '100%'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  titleContent: {
    marginTop: Math.min(Math.max((height - 64 - 78 - (2 * 304)) / 3, 3), 10),
    flexDirection: "row",
    backgroundColor: "white",
    height: 78,
  },
  arrow: {
    position: 'absolute',
    resizeMode: 'contain',
    right: 18.8,
    width: 7.4,
  },
  titleText: {
    width: '70%',
    height: '100%',
    backgroundColor: "#fff",
    marginLeft: 10,
  },
  h2: {
    fontSize: 16,
    lineHeight: 25,
    color: "#172434",
  },
  examTitle: {
    width: width - 235,
    marginTop: 17,
  },
  choosePaperButton: {
    position: 'absolute',
    right: 15,
    top: 24,
  },
  examDetail: {

  },
  p: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 20,
    color: "#8E9091"
  },
  circleChart: {
    position: 'absolute',
    top: 10,
    right: 40,
    width: 60,
    height: 60,
  },
  titleIcon: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: 'center'
  },
  calendarView: {
    position: 'relative',
    backgroundColor: '#fff',
    marginTop: Math.min(Math.max((height - 64 - 78 - (2 * 304)) / 3, 3), 10),
  },
  chartTitleContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    height: 75,
    zIndex: 100
  },
  chartTopContainer: {
    flexDirection: "row",
    height: 48,
  },
  chartBottomContainer: {
    flexDirection: "row",
    width: "100%",
    zIndex: 100,
  },
  h4: {
    marginTop: 12,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "400",
    color: "#172434"
  },
  psmall: {
    marginTop: 14,
    marginLeft: 35,
    fontSize: 12,
    color: "#8E9091",
    backgroundColor: 'rgba(0,0,0,0)'
  },
  average: {
    position: 'absolute',
    top: 14,
    left: 175,
    fontSize: 12,
    color: '#8E9091',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  rightTitle: {
    position: "absolute",
    top: 8,
    right: 15,
    fontSize: 13,
  },
  rightDetail: {
    position: "absolute",
    top: 14,
    right: 49,
    fontSize: 12,
    color: "#8E9091",
    backgroundColor: 'rgba(0,0,0,0)'
  },
  rightContainer: {
    flexDirection: "row",
    height: 68,
    width: '100%',
    position: "absolute",
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  greenBlock: {
    marginLeft: 10,
    marginTop: 31.5,
    width: 15,
    height: 15,
  },
  redBlock: {
    marginLeft: 10,
    marginTop: 14,
    width: 15,
    height: 15,
  },
  blueBlock: {
    marginLeft: 10,
    marginTop: 10,
    width: 15,
    height: 15,
  },
  separator: {
    marginRight: 10,
    marginLeft: 10,
    height: 1,
    backgroundColor: '#7A8FAC',
    zIndex: 9,
    opacity: 0.1,
  }
}
