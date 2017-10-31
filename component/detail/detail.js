/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

const question = {
    "year": "2015",
    "province": "nothing",
    "type_of_problem": "单选题",
    "number": "1",
    "category_of_problem": "资料分析",
    "question": "2007年，F省全省人口大2007年总值25662元，则F省全省人口2007年，F省实现地区生产总值9160.14亿元，人均地区生产总值25662元，则F省全省人口2007年，F省实现地区生产总值9160.14亿元，人均地区生产总值25662元，则F省全省人口2007年，F省实现地区生产总值9160.14亿元，人均地区生产总值25662元，则F省全省人口2007年，F省实现地区生产总值9160.14亿元，人均地区生产总值25662元，则F省全省人口约为（）。",
    "option_A": "3569万人",
    "option_B": "3569535人",
    "option_C": "3696万人",
    "option_D": "3696534人",
    "answer": "A",
    "analysis": "2007年，F省实现地区生产总值9160.14亿元，人均地区生产总值25662元，则F省全省人口约为 <img src=\"http://tiku.huatu.com/cdn/images/vhuatu/tiku/c/c484180809cab1c8b270c509381af19145abeced.png\"/>人，即3540万，A项最为接近。因此，本题答案选择A选项。",
    "recipe": "估算法",
    "expand": "", "error_correction": "",
    "paraphrase": "",
    "srcs": [{ "<img src=\"http://tiku.huatu.com/cdn/images/vhuatu/tiku/c/c484180809cab1c8b270c509381af19145abeced.png\"/>": "http://tiku.huatu.com/cdn/images/vhuatu/tiku/c/c484180809cab1c8b270c509381af19145abeced.png" }],
    "subject": [{ "paragraph_0": "阅读下列材料，回答下面的题目。 " }, { "paragraph_1": "F省2007年全年实现地区生产总值9160.14亿元，其中，第一产业生产值1038.38亿元，增长4.0％；第二产业生产值4508.02亿元，增长18.6％；第三产业生产值3613.74亿元，增长13.8％。人均地区生产总值25662元，比上年增长14.3％。" }, { "paragraph_2": "居民消费价格总水平比上年上涨5.2％。其中，服务价格上涨1.9％，商品零售价格上涨4.3％，工业品出厂价格上涨0.8％，原材料、燃料、动力购进价格上涨4.3％，农业生产资料价格上涨10.3％，比上年提高9.4个百分点。F省A.、B.、C.三市房屋销售价格分别上涨6.8％、7.0％和6.7％。" }, { "paragraph_3": "城镇新增就业人员68万人，比预期目标多3万人。全年有9.8万下岗人员实现了再就业。年末城镇登记失业率为3.89％，与上年末同比下降0.04个百分点，控制在预期目标4％以内。" }, { "paragraph_4": "财政总收入1284.27亿元，按可比口径，比上年增长26.8％，其中，地方级财政收入700.03亿元，可比增长29.4％，财政支出901.22亿元，增长23.7％。全省国税税收收入（含进口税收）856亿元，增长22.6％；全省地税系统组织各项收入644.29亿元，增长29.1％。" }],
    "uid": "d0691798-3876-403a-a492-5956907d9e4c"
};

export default class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detail: question
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });

    select(option) {


    }

    render() {
        return (
            <View style={ {flexDirection:'column', height:"100%"}}>
                <View style={styles.topContent}>
                    <ScrollView style={styles.content}>
                        <View style={styles.typeOfProblemView}>
                            <Text style={styles.typeOfProblem}>（{this.state.detail.type_of_problem}）</Text>
                        </View>
                        <View style={styles.questionView}>
                            <Text style={styles.questionText}>{this.state.detail.question}</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.separatorLine}></View>
                <View style={styles.bottomContent}>
                    <ScrollView style={styles.content}>
                        <TouchableOpacity>
                            <View style={styles.answerItem} button={true} onPress={() =>
                                    this.select('A')
                                }>
                                <Image
                                    style={styles.icon}
                                    source={require('../../Images/Option_A.png')}
                                />
                                <View>
                                    <Text>{this.state.detail.option_A}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.answerItem} button={true} onPress={() =>
                                    this.select('B')
                                }>
                                <Image
                                    style={styles.icon}
                                    source={require('../../Images/Option_B.png')}
                                />
                                <Text>{this.state.detail.option_B}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.answerItem} button={true} onPress={() =>
                                    this.select('C')
                                }>
                                <Image
                                    style={styles.icon}
                                    source={require('../../Images/Option_C.png')}
                                />
                                <Text>{this.state.detail.option_C}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.answerItem} button={true} onPress={() =>
                                    this.select('D')
                                }>
                                <Image
                                    style={styles.icon}
                                    source={require('../../Images/Option_D.png')}
                                />
                                <Text>{this.state.detail.option_D}</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        )
    }
};

var styles = StyleSheet.create ({
    topContent: {
        flex: 1,
    },
    content: {
        backgroundColor: 'white',
        flex: 1,
    },
    bottomContent: {
        flex: 1,
    },
    typeOfProblemView: {
        height: 30,
        top: 10,
    },
    typeOfProblem: {
        color: '#0076FF',
        fontSize: 17,
    },
    questionView: {
        marginRight: 15,
        marginLeft: 15,
    },
    questionText: {
        color: 'black',
        fontSize: 16,
    },
    separatorLine: {
        height: 1,
        backgroundColor: '#979797',
        opacity: 0.7,
    },
    icon: {
        marginLeft: 10,
        marginRight: 10,
        width: 23,
        height: 23,
    },
    answerItem: {
        height: 40,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
    }
})

