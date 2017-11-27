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
import { newPaper, pieOption } from './chartOptions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';



const clientWidth = 375;
const chartArray = [1, 2];
const header = {
    header: {
        // height: 66,
        // paddingTop: 30,
        // marginBottom: 5,
        // paddingLeft: 15,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFF',
        // shadowOpacity: 0.1,
        // shadowColor: '#333',
        // shadowOffset: { width: 0, height: 1 }
    },
    text: {
        fontSize: 30,
        paddingLeft: 15,
        flex: 7
    },
    icon: {
        marginRight: 20
        // flex: 1,
    },
    magnifier: {
        width:18,
        height:17,
    },
    more: {
        width:20, 
        height:4
    }
}
export default class Find extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: {
            backgroundColor: '#FFF',
            shadowOpacity: 0.1,
            shadowColor: '#333',
            shadowOffset: { width: 0, height: 1 }
        },
        headerTintColor: 'white',
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
    getChatDom() {
        const newPaperOption = newPaper.option;
        return chartArray.map(res => {
            return (
                <View style={styles.calendarView} key={res}>
                    <TouchableOpacity onPress={this.routeToDetail.bind(this)} style={styles.chartTitle}>
                        <View style={styles.chartTitleLeft}>
                            <Text style={styles.h4}>过去6日刷题亮统计</Text>
                            <Text style={styles.psmall}>平均值:318</Text>
                        </View>
                        <View style={styles.chartTitleRight}>
                            <Text style={styles.h4}>本月共进行6次</Text>
                            <Text style={styles.psmall}>最后刷题日：今日</Text>
                        </View>
                        <View style={[styles.titleIcon, { paddingTop: 15, flex: 2 }]}>
                            <Icon name={'arrow-right'} size={14} ></Icon >
                        </View>
                    </TouchableOpacity>
                    <Echarts option={newPaperOption} height={clientWidth * 0.7} />
                </View>
            )
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity onPress={this.routeToPayPage.bind(this)} style={styles.titleContent}>
                        <View style={styles.text}>
                            <Text style={styles.h2}>2017年北京省考</Text>
                            <Text style={styles.p}>历年真题</Text>
                        </View>
                        <View style={styles.circleChart}>
                            <Echarts option={pieOption.option} height={clientWidth * 0.253} />
                        </View>
                        <View style={styles.titleIcon}>
                            <Icon name={'arrow-right'} size={14} ></Icon >
                        </View>
                    </TouchableOpacity>

                    {this.getChatDom()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        width: '100%',
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
        height: clientWidth * 0.253,
        marginBottom: 5,
    },
    text: {
        flex: 6,
        paddingTop: 20,
        paddingLeft: 15,
        backgroundColor: "#fff"
    },
    h2: {
        fontSize: 24,
        lineHeight: 30
    },
    p: {
        marginTop: 5,
        fontSize: 14,
        lineHeight: 20,
        color: "#8E9091"
    },
    circleChart: {
        flex: 4,
    },
    titleIcon: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: 'center'
    },
    calendarView: {
        // flex: 5,
        paddingTop: 20,
        backgroundColor: '#F1F4FB',
        height: clientWidth * 0.78,
        position: 'relative'
    },
    chartTitle: {
        flexDirection: "row",
        position: "absolute",
        width: '100%',
        height: 55,
        left: 0,
        top: 0,
        zIndex: 100
    },
    chartTitleLeft: {
        flex: 11,
        paddingTop: 20,
        paddingLeft: 15,
        backgroundColor: "#fff"
    },
    chartTitleRight: {
        flex: 9,
        paddingTop: 20,
        backgroundColor: "#fff"
    },
    h4: {
        fontSize: 16,
    },
    psmall: {
        fontSize: 14,
        color: "#8E9091"
    },
}