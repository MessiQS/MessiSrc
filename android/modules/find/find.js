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
    View
} from 'react-native';
import Echarts from 'native-echarts';
import { newPaper, pieOption, rememberPaper } from './chartOptions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import realmManager from "../../../component/Realm/realmManager";
import Storage from "../../../service/storage";
import realm from '../../../component/Realm/realm';
import runtime from "../../../service/runtime";
import { DBChange } from "../../../service/constant";

const clientWidth = 375;
const chartArray = [1, 2];
const header = {
    header: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        paddingLeft: 10,
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
            {
                /*<View style={header.icon}>
                     <Image style={header.magnifier} source={require('../../../Images/magnifier.png')} />
                 </View> */
            }
                <TouchableOpacity onPress={navigation.state.params.setting} style={header.icon}>
                    <Image style={header.more} source={require('../../../Images/more.png')} />
                </TouchableOpacity>
            </View>)
    })

    constructor(props) {
        super(props);
        const user = realmManager.getCurrentUser()
        if (user && !!user.currentExamId) {
            let info = realmManager.getFindInfo(user.currentExamId)
            this.state = {
                currentExam: user.currentExamTitle,
                currentExamDetail: "历年真题",
                newQuestionCount: info.newQuestionCount,
                wrongQuestionCount: info.wrongQuestionCount,
                newLastSelectDate: info.newLastSelectDate,
                wrongLastSelectDate: info.wrongLastSelectDate,
                futureArray: info.futureArray,
                beforeArray: info.beforeArray,
                pieArray: info.pieArray,
            }
        } else {
            this.state = {
                currentExam: "当前暂无题库信息",
                currentExamDetail: "请选择题库",
                newQuestionCount: "0",
                wrongQuestionCount: "0",
                newLastSelectDate: "暂无数据",
                wrongLastSelectDate: "暂无数据",
                futureArray: [0, 0, 0, 0, 0, 0],
                beforeArray: [0, 0, 0, 0, 0, 0],
                pieArray: [{value:1}],
            }
        }

        this.onMessage();
    }

    onMessage() {

        runtime.on(DBChange, () => {
            const user = realmManager.getCurrentUser()
            let info = realmManager.getFindInfo(user.currentExamId)
            this.setState({
                currentExam: user.currentExamTitle,
                newQuestionCount: info.newQuestionCount,
                wrongQuestionCount: info.wrongQuestionCount,
                newLastSelectDate: info.newLastSelectDate,
                wrongLastSelectDate: info.wrongLastSelectDate,
                futureArray: info.futureArray,
                beforeArray: info.beforeArray,
                pieArray: info.pieArray,
            })
        })
    }

    componentDidMount() {

        this.props.navigation.setParams({
            setting: this.routeToMine.bind(this)
        });
    }

    componentWillMount() {
        this.props.navigation.setParams({
            setting: this.routeToMine.bind(this)
        });
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

    routeToNewDetail() {
        const that = this
        if (this.state.newQuestionCount == 0) {
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
            navigate('Detail', { category: "new" })
        }
    }

    routeToWrongDetail() {
        const that = this
        if (this.state.wrongQuestionCount == 0) {
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
            navigate('Detail', { category: "wrong" })
        }
    }

    _renderGetChatNewPaper() {
        const newPaperOption = newPaper.option;

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
        newPaperOption.xAxis[0].data = weekArray
        newPaperOption.series[0].data = this.state.beforeArray

        return (
            <View style={styles.calendarView}>
                <TouchableOpacity onPress={this.routeToNewDetail.bind(this)} style={styles.chartTitle}>
                    <View style={styles.rightContainer}>
                        <Image style={styles.blueBlock} source={require("../../../Images/blue_block.png")} />
                        <View style={styles.chartTitleLeft}>
                            <Text style={styles.h4}>过去5日刷题量统计</Text>
                            <Text style={styles.psmall}>最后刷题日:{this.state.newLastSelectDate}</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.chartTitleRight}>
                            <Text style={[styles.rightTitle, { color: "#1495EB" }]}>刷新题</Text>
                            <Text style={styles.rightDetail}>剩余：{this.state.newQuestionCount}</Text>
                        </View>
                        <Image style={[styles.arrow, { top: 1 }]} source={require("../../../Images/find_arrow_right.png")} />
                    </View>
                </TouchableOpacity>
                <Echarts option={newPaperOption} height={clientWidth * 0.7} />
            </View>
        )
    }
   
    _renderGetChatRemember() {
        const newPaperOption = rememberPaper.option;
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
        newPaperOption.xAxis[0].data = weekArray
        newPaperOption.series[0].data = this.state.futureArray

        return (
            <View style={styles.calendarView}>
                <TouchableOpacity onPress={this.routeToWrongDetail.bind(this)} style={styles.chartTitle}>
                    <View style={styles.wrongContainer}>
                        <Image style={styles.redBlock} source={require("../../../Images/red_block.png")} />
                        <View style={styles.chartTitleLeft}>
                            <Text style={styles.h4}>未来5日遗忘数量统计</Text>
                            <Text style={styles.psmall}>最后刷题日:{this.state.wrongLastSelectDate}</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.chartTitleRight}>
                            <Text style={[styles.rightTitle, { color: "#FF5B29" }]}>刷错题</Text>
                            <Text style={styles.rightDetail}>剩余：{this.state.wrongQuestionCount}</Text>
                        </View>
                        <Image style={[styles.arrow, { top: 2 }]} source={require("../../../Images/find_arrow_right.png")} />
                    </View>
                </TouchableOpacity>
                <Echarts option={newPaperOption} height={clientWidth * 0.7} />
            </View>
        )
    }

    render() {

        const option = pieOption.option
        option.series[0].data = this.state.pieArray

        return (
            <View style={styles.container}>
                {this.state.showAlert == true ? <Alert/> : null}
                <ScrollView>
                    <TouchableOpacity onPress={this.routeToPayPage.bind(this)} >
                    <View style={styles.titleContent}>
                        <Image style={styles.greenBlock} source={require("../../../Images/green_block.png")} />
                            <View style={styles.titleText}>
                                <Text numberOfLines={1} style={[styles.h2, styles.examTitle]}>{this.state.currentExam}</Text>
                                <Text style={[styles.p, styles.examDetail]}>{this.state.currentExamDetail}</Text>
                            </View>
                            <View style={styles.circleChart}>
                                <Echarts option={pieOption.option} height={60} />
                            </View>
                            <Image style={[styles.arrow, { top: 17 }]} source={require("../../../Images/find_arrow_right.png")} />
                        </View>
                    </TouchableOpacity>
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
        right: 10,
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
        width: '70%',
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
        marginTop: 9,
        marginLeft: 35,
        fontSize: 12,
        color: "#8E9091"
    },
    rightTitle: {
        position: "absolute",
        top: 12,
        right: 50,
        fontSize: 16
    },
    rightDetail: {
        position: "absolute",
        top: 9,
        right: 49,
        fontSize: 12,
        color: "#8E9091"
    },
    rightContainer: {
        flexDirection: "row",
        height: 68,
        width: '100%',
        position: "absolute",
    },
    greenBlock: {
        marginLeft: 10,
        marginTop: 23,
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
        marginTop: 12,
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