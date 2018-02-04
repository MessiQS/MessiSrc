/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    View,
    Vibration
} from 'react-native';
import Echarts from 'native-echarts';
import { newPaper, pieOption, rememberPaper } from '../../../component/Home/chartOptions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import realmManager from "../../../component/Realm/realmManager";
import Storage from "../../../service/storage";
import realm from '../../../component/Realm/realm';
import runtime from "../../../service/runtime";
import Alert from "../../../component/progress/alert";
import { DBChange } from "../../../service/constant";
import { NavigationActions } from 'react-navigation'
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const chartArray = [1, 2];
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
        super(props);
        this._prepareUI()
        this.isUpdateChart = false
    }

    componentDidMount() {
        // this.onMessage()
    }

    _prepareUI() {

        const user = realmManager.getCurrentUser()
        if (user && user.currentExamId) {
            let info = realmManager.getFindInfo(user.currentExamId)
            this.state = {
                currentExam: user.currentExamTitle,
                currentExamDetail: "历年真题",
                info: info,
                showAlert: false,
            }
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
            this.state = {
                currentExam: "当前暂无题库信息",
                currentExamDetail: "请选择题库",
                info: info,
                showAlert: false,
            }
        }
    }

    _updateUI() {

        const user = realmManager.getCurrentUser()
        const that = this
        this.isUpdateChart = true
        setTimeout(() => {
            that.isUpdateChart = false
        }, 1000);

        if (user && user.currentExamId) {
            let info = realmManager.getFindInfo(user.currentExamId)
            this.setState({
                currentExam: user.currentExamTitle,
                currentExamDetail: "历年真题",
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
                info: info,
            })
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.props.navigation.setParams({
                route: this.routeToMine.bind(this)
            });
        }, 1);
    }

    onMessage() {

        const that = this
        runtime.on(DBChange, () => {
            that._updateUI()
        })
    }

    routeToMine() {
        const { navigate } = this.props.navigation;
        const user = realmManager.getCurrentUser()

        if (user) {

            navigate('Mine', {})

        } else {

            realmManager.deleteAllRealmData()
            let clearPromise = Storage.clearAll()
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ]
            })
            clearPromise.then(res => {
                this.props.navigation.dispatch(resetAction)
            })
        }
    }

    routeToPayPage() {
        const { navigate } = this.props.navigation;
        navigate('Message', {
            callback: (data) => {
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

            const { navigate } = this.props.navigation;
            navigate('Detail', {
                category: "new",
                callback: (data) => {
                    this._updateUI()
                }
            })
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

            const { navigate } = this.props.navigation;
            navigate('Detail', {
                category: "wrong", 
                callback: (data) => {
                    this._updateUI()
                }
            })
        }
    }

    _isShowEmptyData() {

        const { info } = this.state

        if (info.futureArray.toString() == [0, 0, 0, 0, 0, 0].toString() &&
            info.beforeArray.toString() == [0, 0, 0, 0, 0, 0].toString()) {
            return true
        }
        return false
    }

    _renderTopView() {

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
            <TouchableOpacity onPress={this.routeToPayPage.bind(this)} >
                <View style={styles.titleContent}>
                    <Image style={styles.greenBlock} source={require("../../../Images/green_block.png")} />
                    <View style={styles.titleText}>
                        <Text numberOfLines={1} style={[styles.h2, styles.examTitle]}>{this.state.currentExam}</Text>
                        <Text style={[styles.p, styles.examDetail]}>{this.state.currentExamDetail}</Text>
                    </View>
                    <View style={styles.circleChart}>
                        <Echarts option={option} width={60} height={60} />
                    </View>
                    <Image style={[styles.arrow, { top: 23 }]} source={require("../../../Images/find_arrow_right.png")} />
                </View>
            </TouchableOpacity>
        )
    }

    _renderGetChatNewPaper() {
        let newPaperOption = newPaper.option;

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

        /// 空数组，显示特殊化
        if (this._isShowEmptyData()) {

            newPaperOption.series[0].data = [3, 3, 3, 3, 3, 3]
            newPaperOption.series[0].label.normal.show = false
            newPaperOption.series[0].symbolSize = 0

        } else {

            newPaperOption.series[0].label.normal.show = true
            newPaperOption.series[0].symbolSize = 6
        }

        return (
            <View style={styles.calendarView}>
                <View style={styles.chartTitleContainer}>
                    <TouchableOpacity style={styles.chartTopContainer} onPress={this.routeToNewDetail.bind(this)}>
                        <Image style={styles.redBlock} source={require("../../../Images/blue_block.png")} />
                        <Text style={styles.h4}>过去5日刷题数量统计</Text>
                        <Text style={[styles.rightTitle, { color: "#1495EB" }]}>刷新题</Text>
                        <Image style={[styles.arrow, { top: 6 }]} source={require("../../../Images/find_arrow_right.png")} />
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <View style={styles.chartBottomContainer}>
                        <Text style={styles.psmall}>最后刷题日：{this.state.info.newLastSelectDate}</Text>
                        <Text style={styles.average}>平均値：{this.state.info.newAverage}</Text>
                        <Text style={styles.rightDetail}>剩余：{this.state.info.newQuestionCount}</Text>
                    </View>
                </View>
                <Echarts option={newPaperOption} height={width * 0.6} />
            </View>
        )
    }

    _renderGetChatRemember() {

        let newPaperOption = rememberPaper.option;
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

        /// 空数组，显示特殊化
        if (this._isShowEmptyData()) {

            newPaperOption.series[0].data = [3, 3, 3, 3, 3, 3]
            newPaperOption.series[0].label.normal.show = false
            newPaperOption.series[0].symbolSize = 0

        } else {

            newPaperOption.series[0].label.normal.show = true
            newPaperOption.series[0].symbolSize = 6
        }

        return (
            <View style={styles.calendarView}>
                <View style={styles.chartTitleContainer}>
                    <TouchableOpacity style={styles.chartTopContainer} onPress={this.routeToWrongDetail.bind(this)}>
                        <Image style={styles.redBlock} source={require("../../../Images/red_block.png")} />
                        <Text style={styles.h4}>未来5日遗忘数量预测</Text>
                        <Text style={[styles.rightTitle, { color: "#FF5B29" }]}>刷错题</Text>
                        <Image style={[styles.arrow, { top: 6 }]} source={require("../../../Images/find_arrow_right.png")} />
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <View style={styles.chartBottomContainer}>
                        <Text style={styles.psmall}>最后刷题日：{this.state.info.wrongLastSelectDate}</Text>
                        <Text style={styles.average}>平均値：{this.state.info.wrongAverage}</Text>
                        <Text style={styles.rightDetail}>剩余：{this.state.info.wrongQuestionCount}</Text>
                    </View>
                </View>
                <Echarts option={newPaperOption} height={width * 0.6} />
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                {this.state.showAlert == true ? <Alert content="当前没有可刷题目" /> : null}
                <ScrollView>
                    {this._renderTopView()}
                    {this._renderGetChatNewPaper()}
                    {this._renderGetChatRemember()}
                </ScrollView>
            </View>
        );
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
        width: width - 140,
        marginTop: 17,
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
        marginTop: 3,
    },
    chartTitleContainer: {
        flexDirection: "column",
        backgroundColor: "#fff",
        height: 78,
        zIndex: 100
    },
    chartTopContainer: {
        flexDirection: "row",
        height: 48,
        zIndex: 100
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
        left: 190,
        fontSize: 12,
        color: '#8E9091',
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 1
    },
    rightTitle: {
        position: "absolute",
        top: 12,
        right: 50,
        fontSize: 16
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
    greenBlock: {
        marginLeft: 10,
        marginTop: 31.5,
        width: 15,
        height: 15,
    },
    redBlock: {
        marginLeft: 10,
        marginTop: 16,
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
