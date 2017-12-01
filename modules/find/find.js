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
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Echarts from 'native-echarts';
import { newPaper, pieOption, rememberPaper } from './chartOptions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const clientWidth = 375;
const chartArray = [1, 2];
const header = {
    header: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        paddingLeft: 15,
        flex: 7
    },
    icon: {
        marginRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
    },
    magnifier: {
        width: 18,
        height: 17,
    },
    more: {
        width:20, 
    }
}
export default class Find extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

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
                <View style={header.icon}>
                    <Image style={header.magnifier} source={require('../../Images/magnifier.png')} />
                </View>
                <TouchableOpacity onPress={navigation.state.params.setting} style={header.icon}>
                    <Image style={header.more} source={require('../../Images/more.png')} />
                </TouchableOpacity>
            </View>)
    })

    componentWillMount() {
        this.props.navigation.setParams({
            setting: this.routeToMine.bind(this)
        });
    }

    routeToMine() {
        const { navigate } = this.props.navigation;
        navigate('Mine', {})
    }

    routeToPayPage() {
        const { navigate } = this.props.navigation;
        navigate('Message', {})
    }

    routeToDetail() {
        const { navigate } = this.props.navigation;
        navigate('Detail', {})
    }

    _renderGetChatNewPaper() {
        const newPaperOption = newPaper.option;
        return (
            <View style={styles.calendarView}>
                <TouchableOpacity onPress={this.routeToDetail.bind(this)} style={styles.chartTitle}>
                    <View style={styles.chartTitleLeft}>
                        <Text style={styles.h4}>过去6日刷题亮统计</Text>
                        <Text style={styles.psmall}>平均值:318</Text>
                    </View>
                    <View style={styles.chartTitleRight}>
                        <Text style={[styles.rightTitle, {color: "#1495EB"}]}>刷新题</Text>
                        <Text style={styles.rightDetail}>剩余：75</Text>
                    </View>
                    <Image style={[styles.arrow, {height: 74}]} source={require("../../Images/find_arrow_right.png")} />
                </TouchableOpacity>
                <Echarts option={newPaperOption} height={clientWidth * 0.7} />
            </View>
        )
    }

    _renderGetChatRemember() {
        const newPaperOption = rememberPaper.option;
        return (
            <View style={[styles.calendarView, {marginTop:4}]}>
                <TouchableOpacity onPress={this.routeToDetail.bind(this)} style={styles.chartTitle}>
                    <View style={styles.chartTitleLeft}>
                        <Text style={styles.h4}>过去6日刷题亮统计</Text>
                        <Text style={styles.psmall}>平均值:318</Text>
                    </View>
                    <View style={styles.chartTitleRight}>
                        <Text style={[styles.rightTitle, {color: "#FF5B29"}]}>刷错题</Text>
                        <Text style={styles.rightDetail}>剩余：18</Text>
                    </View>
                    <Image style={[styles.arrow, {height: 74}]} source={require("../../Images/find_arrow_right.png")} />
                </TouchableOpacity>
                <Echarts option={newPaperOption} height={clientWidth * 0.7} />
            </View>
        )
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity style={styles.titleContent} onPress={this.routeToPayPage.bind(this)} >
                        <View style={styles.text}>
                            <Text style={styles.h2}>2017年北京省考</Text>
                            <Text style={styles.p}>历年真题</Text>
                        </View>
                        <View style={styles.circleChart}>
                            <Echarts option={pieOption.option} height={75} />
                        </View>
                        <Image style={styles.arrow} source={require("../../Images/find_arrow_right.png")} />
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
        backgroundColor: '#f5f5f5',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    titleContent: {
        flexDirection: "row",
        backgroundColor: "#F1F4FB",
        height: 96,
        marginBottom: 5,
    },
    arrow: {
        position: 'absolute',
        resizeMode: 'contain',
        right: 21,
        width: 4,
        height: 96
    },
    text: {
        flex: 6,
        paddingTop: 20,
        paddingLeft: 15,
        backgroundColor: "#fff"
    },
    h2: {
        fontSize: 16,
        lineHeight: 25
    },
    p: {
        marginTop: 5,
        fontSize: 12,
        lineHeight: 20,
        color: "#8E9091"
    },
    circleChart: {
        position: 'absolute',     
        right: 40,
        width: 96,
        height: 96,
        top: 10
    },
    titleIcon: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: 'center'
    },
    calendarView: {
        // flex: 5,
        backgroundColor: '#F1F4FB',
        height: clientWidth * 0.78,
        position: 'relative',
        paddingTop: 20,
        backgroundColor: '#fff',
        marginBottom:8
    },
    chartTitle: {
        flexDirection: "row",
        position: "absolute",
        width: '100%',
        height: 55,
        backgroundColor: "#fff",
        left: 0,
        top: 0,
        zIndex: 100
    },
    chartTitleLeft: {
        flex: 13,
        paddingTop: 10,
        paddingLeft: 15,
    },
    chartTitleRight: {
        position: "absolute",
        paddingTop: 11,
        right: 54,
    },
    h4: {
        fontSize: 16,
        fontWeight: "400",
        color: "#172434"
    },
    psmall: {
        marginTop: 10,
        fontSize: 12,
        color: "#8E9091"
    },
    rightTitle: {
        fontSize: 16
    },
    rightDetail: {
        marginTop: 9,
        fontSize: 12,
        color: "#8E9091"
    }  
}