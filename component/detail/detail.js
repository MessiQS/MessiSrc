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
    ScrollView,
    Platform,
    Button
} from 'react-native';
import realmManager from "../Realm/realmManager";
import realm from '../Realm/realm';
import OptionForm from "./optionForm";
import MultipleOptionForm from './multiple_option_form';
import Analysis from "./analysis";
import key from "../../service/path"

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const ItemStatus = {
    NORMAL: 'normal',
    SELECTED: 'selected',
    RIGHT: 'right',
    ERROR: 'error',
}

export default class Detail extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.headerTitle,
        headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            fontSize: 18
        },
        headerStyle: {
            backgroundColor: '#FFF',
            opacity: 1,
            borderBottomWidth: 0,
            shadowOpacity: 0.2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 }
        },
        headerTintColor: 'black',
        gesturesEnabled: true,
        headerRight: (
            <TouchableOpacity
                disabled={navigation.state.params.nextButtonDisable}
                onPress={() => {
                    navigation.state.params.clickNextQuestion()
                }}>
                <View style={styles.rightButtonStyle}>
                    <Text style={[styles.rightText, navigation.state.params.nextButtonDisable == false ? { color: "#FF5B29" } : {}]}>下一题</Text>
                </View>
            </TouchableOpacity>
        ),
        headerLeft: (
            Platform.OS == "ios" ? (
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <View style={{
                        left: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 44,
                        height: 44,
                    }}>
                        <Image style={{ width: 14, height: 10 }} source={require('../../Images/back_arrow.png')} />
                    </View>
                </TouchableOpacity>
            ) : navigation.state.params.headerLeft
        ),
    });

    componentWillMount() {
        this.props.navigation.setParams({
            headerTitle: this.state.detail.questionPaper.category,
            clickNextQuestion: this.nextQuestion.bind(this),
            nextButtonDisable: true,
        })
    }

    constructor(props) {
        super(props);
        this._memoryModel = realmManager.getMemoryModels()
            .filtered("weighting < 7")
            .sorted('lastBySelectedTime', false)[0]

        this.state = {
            detail: this._memoryModel,
            isSelected: false,
            selectedOption: [],
            A_Status: ItemStatus.NORMAL,
            B_Status: ItemStatus.NORMAL,
            C_Status: ItemStatus.NORMAL,
            D_Status: ItemStatus.NORMAL,
        }
        console.log(this._memoryModel)
    }

    _handleImageURL(content) {
        /// 获取 "/2016年上海《行测》真题（B类） - 腰果公考_files/normal_610x328_a0d18f5c4d9ceac41b845efc3b73876a.png"
        var re2 = /\/.*?\.(?:png|jpg)/gm;
        let suffixUrl = re2.exec(content)
        let sufUrl = suffixUrl[0]

        // 获取"/952428d694d9f518/normal_764x574_f7cd44964754b57.png"
        var re = /\/(.*)files/g;
        var results = re.exec(sufUrl);
        let suffix = null
        if (results) {
            let img = results[0].replace("/", "", )
            if (key[img] != null) {
                suffix = sufUrl.replace(img, key[img])
            }
        }
        return url = "http://118.89.196.123/images" + suffix
    }
    
    nextQuestion() {

        this._memoryModel = realmManager.getMemoryModels()
            .filtered("weighting < 7")
            .sorted('lastBySelectedTime', false)[0]
        this.setState({
            detail: this._memoryModel,
            isSelected: false,
            selectedOption: [],
            A_Status: ItemStatus.NORMAL,
            B_Status: ItemStatus.NORMAL,
            C_Status: ItemStatus.NORMAL,
            D_Status: ItemStatus.NORMAL,
        })
        this.props.navigation.setParams({
            headerTitle: this._memoryModel.questionPaper.category,
            nextButtonDisable: true,
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    _select(option) {

        let score = 0
        let itemStatus = ItemStatus.NORMAL
        if (option == this._memoryModel.questionPaper.answer) {
            score = 7 - this._memoryModel.appearedSeveralTime
            score = Math.max(1, score)
            itemStatus = ItemStatus.RIGHT
        } else {
            itemStatus = ItemStatus.ERROR
        }

        realm.write(() => {
            this._memoryModel.weighting = this._memoryModel.weighting + score
            this._memoryModel.appearedSeveralTime += 1
            this._memoryModel.lastBySelectedTime = Date.parse(new Date())
            this._memoryModel.records.push({
                select: option,
                isRight: isRight
            })
        });

        if (option == "A") {
            this.setState({
                isSelected: true,
                selectedOption: [option],
                A_Status: itemStatus
            })
        }
        if (option == "B") {
            this.setState({
                isSelected: true,
                selectedOption: [option],
                B_Status: itemStatus
            })
        }
        if (option == "C") {
            this.setState({
                isSelected: true,
                selectedOption: [option],
                C_Status: itemStatus
            })
        }
        if (option == "D") {
            this.setState({
                isSelected: true,
                selectedOption: [option],
                D_Status: itemStatus
            })
        }
        this.props.navigation.setParams({
            nextButtonDisable: false,
        });
    }

    /**
     * 多选题，添加答案
     * 
     * @param {any} option 
     * @memberof Detail
     */
    _multipleSelect(option) {

        const array = this.state.selectedOption

        let itemStatus = null

        if (this.state.selectedOption.includes(option)) {
            array.splice(array, 1)
            itemStatus = ItemStatus.NORMAL
        } else {
            array.push(option)
            itemStatus = ItemStatus.SELECTED
        }

        if (option == "A") {
            this.setState({
                selectedOption: array,
                A_Status: itemStatus
            })
        }
        if (option == "B") {
            this.setState({
                selectedOption: array,
                B_Status: itemStatus
            })
        }
        if (option == "C") {
            this.setState({
                selectedOption: array,
                C_Status: itemStatus
            })
        }
        if (option == "D") {
            this.setState({
                selectedOption: array,
                D_Status: itemStatus
            })
        }
    }

    /**
     * 多选题确认按钮
     * 
     * @memberof Detail
     */
    _doneSelect() {

        if (this.state.selectedOption.length == 0) {
            return null
        }

        let score = 7 - this._memoryModel.appearedSeveralTime
        score = Math.max(1, score)
        realm.write(() => {
            this._memoryModel.weighting = this._memoryModel.weighting + score
            this._memoryModel.appearedSeveralTime += 1
            this._memoryModel.lastBySelectedTime = Date.parse(new Date())
        });
        this.setState({
            isSelected: true,
        })
        this.props.navigation.setParams({
            nextButtonDisable: false,
        });
    }

    _renderAnalysis() {

        if (this.state.isSelected) {
            return (
                <Analysis detail={this.state.detail.questionPaper} />
            );
        } else {
            return null;
        }
    }

    _filterTag(str) {

        let filterStr = str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
        filterStr = filterStr.replace(/<p style=\"display: inline;\">/g, "").replace(/<\/p>/g, "")
        filterStr = filterStr.replace(/<p class=\"item-p\">/g, "")
        filterStr = filterStr.replace(/<span style=\"color: #46a546;\">/g, "")
        filterStr = filterStr.replace(/<\/span>/g, "")

        return filterStr
    }

    _renderQuestion(str) {

        let filterStr = this._filterTag(str)
        let regex = /<img/g
        let splits = filterStr.split(regex)

        return (
            <View style={styles.questionView}>
                {
                    splits.map((content, index) => {
                        if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
                        
                            const url = this._handleImageURL(content)
                            let expr = /_(.*)x(.*)_/;
                            let size = url.match(expr)
                            let scale = (window.width - 60) / size[1]
                            let height = size[2] * scale

                            return (
                                <Image key={index} style={[styles.questionImage, { height: height }]} resizeMode={'contain'} source={{ uri: url }} />
                            )
                        } else {
                            if (content.length > 0) {
                                return (
                                    <Text key={index} style={styles.questionText}>{content}</Text>
                                )
                            }
                            return null
                        }
                    })
                }
            </View>
        )
    }

    _renderQuestion2(str) {

        if (str !== "") {
            return this._renderQuestion(str)
        } else {
            return (<View></View>)
        }
    }

    _renderOptionForm() {
        const { detail, isSelected, selectedOption } = this.state

        if (detail.questionPaper.subject == "不定项" ||
            detail.questionPaper.question.indexOf("不定项选择题") !== -1) {

            return (
                <MultipleOptionForm
                    detail={detail.questionPaper}
                    isSelected={isSelected}
                    selectedOption={selectedOption}
                    multipleSelect={this._multipleSelect.bind(this)}
                    doneSelect={this._doneSelect.bind(this)}
                    A_Status={this.state.A_Status}
                    B_Status={this.state.B_Status}
                    C_Status={this.state.C_Status}
                    D_Status={this.state.D_Status} />
            )

        } else {

            return (
                <OptionForm
                    detail={detail.questionPaper}
                    isSelected={isSelected}
                    selectedOption={selectedOption}
                    select={this._select.bind(this)}
                    A_Status={this.state.A_Status}
                    B_Status={this.state.B_Status}
                    C_Status={this.state.C_Status}
                    D_Status={this.state.D_Status} />
            )
        }
    }

    render() {

        const { detail } = this.state
        let str = ""
        let str1 = ""
        if (detail.questionPaper.category.indexOf("资料分析") !== -1) {
            str = detail.questionPaper.question_material
            str1 = detail.questionPaper.question
        } else {
            str = detail.questionPaper.question
            str1 = ""
        }

        return (
            <View style={{ flexDirection: 'column', height: "100%" }}>
                <View style={styles.topContent}>
                    <ScrollView style={styles.content}>
                        {this._renderQuestion(str)}
                    </ScrollView>
                </View>
                <View style={styles.separatorLine}></View>
                <ScrollView style={styles.bottomContent}>
                    {this._renderQuestion2(str1)}
                    {this._renderOptionForm()}
                    {this._renderAnalysis()}
                </ScrollView>
            </View>
        )
    }
};

var styles = StyleSheet.create({
    headerLeftView: {
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
    },
    topContent: {
        flex: 1,
    },
    bottomContent: {
        flex: 1,
        backgroundColor: 'white',
    },
    categoryView: {
        flexDirection: "row",
        alignItems: 'center',
        height: 30,
        top: 13,
        left: 10,
    },
    categoryLine: {
        width: 2,
        height: 15.5,
        marginLeft: 29,
        marginRight: 4,
        backgroundColor: "#172434"
    },
    category: {
        color: '#172434',
        fontSize: 14,
    },
    questionView: {
        marginTop: 17,
        marginRight: 20,
        marginLeft: 20,
    },
    questionText: {
        color: '#172434',
        fontSize: 16,
        lineHeight: 20,
    },
    questionImage: {
        width: '100%',
        height: '100%',
    },
    separatorLine: {
        height: 1,
        backgroundColor: '#979797',
        opacity: 0.7,
    },
    content: {
        backgroundColor: 'white',
        flex: 1,
        width: "100%"
    },
    rightButtonStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        width: 80,
    },
    rightText: {
        color: 'white',
        fontSize: 16,
    },
})

