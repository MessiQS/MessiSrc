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
    Platform
} from 'react-native';
import realmManager from "../Realm/realmManager";
import realm from '../Realm/realm';
import OptionForm from "./optionForm";
import MultipleOptionForm from './multiple_option_form';
import Analysis from "./analysis";
import key from "../../service/path"

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

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
            <TouchableOpacity onPress={() => {
                navigation.state.params.clickNextQuestion()
            }}>
                <View style={[styles.rightButtonStyle, { overflow: navigation.state.params.showNextQuestion }]}>
                    <Text style={styles.rightText}>下一题</Text>
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
            showNextQuestion: 'hidden'
        })
    }

    constructor(props) {
        super(props);
        this.memoryModel = realmManager.getMemoryModels()
            .filtered("weighting < 7")
            .sorted('lastBySelectedTime', false)[0]

        this.state = {
            detail: this.memoryModel,
            isSelected: false,
            selectedOption: [],
        }

        console.log(this.memoryModel.questionPaper.category)
    }

    nextQuestion() {

        const that = this
        that.memoryModel = realmManager.getMemoryModels()
            .filtered("weighting < 7")
            .filtered("questionPaper.subject == '不定项'")
            .sorted('lastBySelectedTime', false)[0]
        that.setState({
            detail: that.memoryModel,
            isSelected: false,
            selectedOption: []
        })
        that.props.navigation.setParams({
            headerTitle: that.memoryModel.questionPaper.category,
            showNextQuestion: 'hidden'
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    _select(option) {

        let score = 0
        if (option == this.memoryModel.questionPaper.answer) {
            score = 7 - this.memoryModel.appearedSeveralTime
            score = Math.max(1, score)            
        } 

        realm.write(() => {
            this.memoryModel.weighting = this.memoryModel.weighting + score
            this.memoryModel.appearedSeveralTime += 1
            this.memoryModel.lastBySelectedTime = Date.parse(new Date())
        });
        this.setState({
            isSelected: true,
            selectedOption: [option],
        })
    }
    
    /**
     * 多选题，添加答案
     * 
     * @param {any} option 
     * @memberof Detail
     */
    _addSelect(option) {
        console.log("_addSelect", option)
        const array = this.state.selectedOption
        array.push(option)
        this.setState({
            selectedOption: array,
        })
    }

    /**
     * 多选题确认按钮
     * 
     * @memberof Detail
     */
    _doneSelect() {

        let score = 7 - this.memoryModel.appearedSeveralTime
        score = Math.max(1, score)
        realm.write(() => {
            this.memoryModel.weighting = this.memoryModel.weighting + score
            this.memoryModel.appearedSeveralTime += 1
            this.memoryModel.lastBySelectedTime = Date.parse(new Date())
        });
        this.setState({
            isSelected: true,
        })
    }

    /**
     * 取消勾选答案
     * 
     * @param {any} option 
     * @memberof Detail
     */
    _deselecte(option) {
        console.log("_addSelect", option)
        const array = this.state.selectedOption

        if (array.includes(option)) {
            array.splice(array, 1)
        }

        this.setState({
            selectedOption: array,
        })
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
        var re = /.\/(.*)files/g;
        var results = re.exec(filterStr);
        var img = "";
        if (results) {
            img = results[0].replace("./", "")
            filterStr = filterStr.replace(img, key[img])
        }

        var re2 = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
        let splits = filterStr.split(re2)

        return (
            <View style={styles.questionView}>
                {
                    splits.map((content, index) => {
                        if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
                            const url = content.replace("./", "http://118.89.196.123/images/")
                            let expr = /_(.*)x(.*)_/;
                            let size = url.match(expr)
                            let scale = (window.width - 60) / size[1]
                            let height = size[2] * scale
                            return (
                                <Image key={index} style={[styles.questionImage, { height: height }]} resizeMode={'contain'} source={{ uri: url }} />
                            )
                        } else {
                            return (
                                <Text key={index} style={styles.questionText}>{content}</Text>
                            )
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

        if (detail.questionPaper.subject == "不定项") {

            return (
                <MultipleOptionForm 
                detail={detail.questionPaper}
                isSelected={isSelected}
                selectedOption={selectedOption}
                addSelect={this._addSelect.bind(this)}
                deselecte={this._deselecte.bind(this)}
                doneSelect={this._doneSelect.bind(this)} />
            )

        } else {

            return (
                <OptionForm
                detail={detail.questionPaper}
                isSelected={isSelected}
                selectedOption={selectedOption}
                select={this._select.bind(this)}/>
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
        color: "#FF5B29",
        fontSize: 16,
    },
})

