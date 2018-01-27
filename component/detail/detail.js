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
import QuestionFeedback from "./question_feedfack";
import Http from '../../service/http';
import runtime from '../../service/runtime';
import { webURL, imageWebURL, DBChange } from "../../service/constant";

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
            color: '#172434',
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
                    <Text style={[styles.rightText, navigation.state.params.nextButtonDisable == false ? { opacity: 1 } : { opacity: 0.5 }]}>下一题</Text>
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
                        <Image style={{ width: 16, height: 16 }} source={require('../../Images/back_arrow.png')} />
                    </View>
                </TouchableOpacity>
            ) : navigation.state.params.headerLeft
        ),
    });

    componentWillMount() {

        var category = this.state.detail.questionPaper.category
        if (this.state.detail.questionPaper.subject == "不定项" ||
            this.state.detail.questionPaper.question.indexOf("不定项选择") !== -1 || 
            this.state.detail.questionPaper.subject == "多选") {
                category = category + "（多选）"
            }

        this.props.navigation.setParams({
            headerTitle: category,
            clickNextQuestion: this.nextQuestion.bind(this),
            nextButtonDisable: true,
        })
    }

    constructor(props) {
        super(props);
        this._memoryModel = this._getMemoryModel()
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

        var re2 = /\/.*?\.(?:png|jpg)/gm;
        let suffixUrl = re2.exec(content)
        let sufUrl = suffixUrl[0]
        
        return imageWebURL + sufUrl
    }

    nextQuestion() {

        this._memoryModel = this._getMemoryModel()
        if (this._memoryModel == null) {

            this.props.navigation.goBack()

        } else {

            var category = this._memoryModel.questionPaper.category
            if (this._memoryModel.questionPaper.subject == "不定项" ||
                this._memoryModel.questionPaper.question.indexOf("不定项选择") !== -1 || 
                this.state.detail.questionPaper.subject.indexOf("多选") !== -1) {
                category = category + "（多选）"
            }
            this.props.navigation.setParams({
                headerTitle: category,
                nextButtonDisable: true,
            });
    
            this.setState({
                detail: this._memoryModel,
                isSelected: false,
                selectedOption: [],
                A_Status: ItemStatus.NORMAL,
                B_Status: ItemStatus.NORMAL,
                C_Status: ItemStatus.NORMAL,
                D_Status: ItemStatus.NORMAL,
            })
        }
        console.log(this._memoryModel)
    }

    _getMemoryModel() {

        var category = this.props.navigation.state.params.category
        return realmManager.getCurrentMemoryModel(category);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    _select(option) {

        let score = 0
        let itemStatus = ItemStatus.NORMAL
        var isRight = false
        if (option == this._memoryModel.questionPaper.answer) {
            score = 7 - this._memoryModel.appearedSeveralTime
            score = Math.max(1, score)
            itemStatus = ItemStatus.RIGHT
            isRight = true
        } else {
            itemStatus = ItemStatus.ERROR
        }

        const type = isRight == true ? "right" : "wrong"
        var record = {
            select: option,
            isRight: isRight
        }

        this._sendUpdateInfoCache(type, newWeighting)
        
        const newWeighting = this._memoryModel.weighting + score
        realmManager.updateMemoryModel(this._memoryModel, record, newWeighting)
        .then(model => {
            setTimeout(() => {
                runtime.emit(DBChange);
            }, 1);
        })
        .catch(e => {
            console.log("detail.js updateMemoryModel error", e)
        })        

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

        const { selectedOption } = this.state
        if (selectedOption.length == 0) {
            return null
        }
        var array = selectedOption
        var sortedSelection = array.sort().toString()
        var answer = this._memoryModel.questionPaper.answer

        let score = 0
        var isRight = false
        if (sortedSelection == answer.toString()) {
            isRight = true
            score = 7 - this._memoryModel.appearedSeveralTime
            score = Math.max(1, score)
        }
        var record = {
            select: sortedSelection,
            isRight: isRight
        }

        const newWeighting = this._memoryModel.weighting + score
        realmManager.updateMemoryModel(this._memoryModel, record, newWeighting)
        .then(model => {
            setTimeout(function(){
                runtime.emit(DBChange);
            }, 1);
        })
        .catch(e => {
            console.log("detail.js updateMemoryModel error", e)
        }) 
        this.setState({
            isSelected: true,
        })
        this.props.navigation.setParams({
            nextButtonDisable: false,
        });
    }

    /// 更新服务端试卷信息
    _sendUpdateInfoCache(type, weighted) {

        var user = realmManager.getCurrentUser()
        var timestamp = Date.parse(new Date())
        var param = {
            user_id: user.userId,
            bankname: user.currentExamId,
            qname: this._memoryModel.questionPaper.question_number.toString(),
            type: type,
            weighted: weighted,
            dateTime: timestamp
        }
        Http.post('api/getUpdateInfoCache', param).then(res => {
            console.log("api/getUpdateInfoCache", res)
        }).catch(err => {
            console.log(err)
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

    _renderQuestionFeedback() {
        if (this.state.isSelected) {
            return (
                <QuestionFeedback detail={this.state.detail.questionPaper} />
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
        if (filterStr[0] == " ") {
            filterStr = filterStr.replace(" ", "")
        }

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
            detail.questionPaper.question.indexOf("不定项选择") !== -1 || 
            detail.questionPaper.subject.indexOf("多选") !== -1) {

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
        if (detail.questionPaper.category.indexOf("资料分析") !== -1 ||
            detail.questionPaper.question_material !== "") {
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
                    {this._renderQuestionFeedback()}
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
        marginBottom: 20,
    },
    questionText: {
        color: '#172434',
        fontSize: 16,
        lineHeight: 25,
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
        color: "#172434",
        fontSize: 16,
    },
})

