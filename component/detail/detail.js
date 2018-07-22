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
    Modal
} from 'react-native';
import realmManager from "../Realm/realmManager";
import OptionForm from "./optionForm";
import MultipleOptionForm from './multiple_option_form';
import Analysis from "./analysis";
import QuestionFeedback from "./question_feedfack";
import runtime from '../../service/runtime';
import { DBChange } from "../../service/constant";
import OptionController from './option.controller'
import ImageViewer from 'react-native-image-zoom-viewer';
import questionManager from "../../service/question_manager"

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

const ItemStatus = {
    NORMAL: 'normal',
    SELECTED: 'selected',
    RIGHT: 'right',
    ERROR: 'error',
}

const example = {
    question: {
      id: "",
      analysis: "受伤者无法自行下车，就说明伤者行动不便，这时应设法将其移出，以免汽车发生突发状况，造成二次伤害。",
      answer: "A",
      category: "判断",
      created_at: "1521977933121",
      option_A: "对",
      option_B: "错",
      option_C: "",
      option_D: "",
      province: "科目四",
      question: "受伤者在车内无法自行下车时，可设法将其从车内移出，尽量避免二次受伤。",
      question_material: "",
      question_number: 7,
      question_point: "单选",
      subject: "subject",
      title: "交通事故救护及常见危化品处置常识试题",
      updated_at: "000",
    }
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
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
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

    constructor(props) {
        super(props);
        this.selectedImageURL = null
        this.state = {
            detail: example,
            isSelected: false,
            selectedOption: [],
            A_Status: ItemStatus.NORMAL,
            B_Status: ItemStatus.NORMAL,
            C_Status: ItemStatus.NORMAL,
            D_Status: ItemStatus.NORMAL,
            showImageDetail: false,
        }
        // console.log(this.memoryModel)
    }

    componentDidMount() {
        this.nextQuestion()
    }

    componentWillMount() {
        this.props.navigation.setParams({
            headerTitle: "",
            clickNextQuestion: this.nextQuestion.bind(this),
            nextButtonDisable: true,
        })
    }

    nextQuestion() {
        const that = this
        let type = that.props.navigation.state.params.type
        let value = questionManager.getRandomMemoryModel(type)
        that.memoryModel = value
        if (that.memoryModel == null) {
            that.props.navigation.goBack()
        } else {
            var headerTitle = that.memoryModel.question.category
            if (that.memoryModel.question.subject == "不定项" ||
                that.memoryModel.question.question.indexOf("不定项选择") !== -1 ||
                that.state.detail.question.subject.indexOf("多选") !== -1) {
                headerTitle = that.memoryModel.question.category + "（多选）"
            }
            that.props.navigation.setParams({
                headerTitle,
                nextButtonDisable: true,
            });

            that.setState({
                detail: that.memoryModel,
                isSelected: false,
                selectedOption: [],
                A_Status: ItemStatus.NORMAL,
                B_Status: ItemStatus.NORMAL,
                C_Status: ItemStatus.NORMAL,
                D_Status: ItemStatus.NORMAL,
            })
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    async _select(option) {

        questionManager.select(option, this.memoryModel)

        var isRight = option == this.state.detail.question.answer ? true : false;
        let itemStatus = ItemStatus.NORMAL;
        if (isRight) {
          itemStatus = ItemStatus.RIGHT;
        } else {
          itemStatus = ItemStatus.ERROR;
        }

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
        var answer = this.memoryModel.question.answer

        let score = 0
        var isRight = false
        if (sortedSelection == answer.toString()) {
            isRight = true
            score = 7 - this.memoryModel.appearedServeralTime
            score = Math.max(1, score)
        }
        var record = {
            select: sortedSelection,
            isRight: isRight
        }

        const newWeighting = this.memoryModel.weighting + score
        realmManager.updateMemoryModel(this.memoryModel, record, newWeighting)
            .then(model => {
                setTimeout(function () {
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

    _renderAnalysis() {
        if (this.state.isSelected) {
            return (
                <Analysis detail={this.state.detail.question} />
            );
        } else {
            return null;
        }
    }

    _renderQuestionFeedback() {
        if (this.state.isSelected) {
            return (
                <QuestionFeedback detail={this.state.detail} />
            );
        } else {
            return null;
        }
    }

    _filterTag(str) {
        return str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n").replace(/<br/g, "\n\n")
    }

    _renderQuestion(str) {

        let filterStr = this._filterTag(str)
        let regex = /<img/g
        let splits = filterStr.split(regex)
        const scale = 0.9

        const _afterSelectText = () => {

            const { status, selection } = this.props
            if (status == "normal") { }
            if (status == "selected") { }
            if (status == "right") {
                return { color: "#8FDA3C" }
            }
            if (status == "error") {
                return { color: "#FF5B29" }
            }
            return null
        }
        const renderContent = () => {
            //没有图片
            if (splits.length === 1 && filterStr.indexOf('img') < 0) {
                return <Text style={[styles.questionText, _afterSelectText()]}>{filterStr}</Text>
            }
            //文字与图嵌套
            let optionArray = [],
                count = 0;

            splits.forEach((result, index) => {
                if (result.indexOf('/>') >= 0) {
                    let imgArr = result.split('/>')
                    if (!!imgArr[1]) {
                        optionArray[index] = imgArr
                    } else {
                        splits[index] = imgArr[0]
                    }
                }
            })
            optionArray.forEach((result, index) => {
                splits.splice(index, 1 + count, ...result)
                count++
            })
            return splits.map((content, index) => {
                if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
                    let url = OptionController._handleImageURL(content)

                    let styleObj = OptionController.getStyle(content)
                    let attrObj = OptionController.getAttr(content)

                    let expr = /\/(.*)_(.*)x(.*)_/;
                    let size = url.match(expr)

                    let width = window.width - 40
                    let height = 200
                    if (Array.isArray(size) && size.length !== 0) {

                        let styleFromCulti = OptionController.setStyle(attrObj, styleObj, size, scale)
                        let newSize = OptionController.setStyleForAnalysis(styleFromCulti)
                        width = newSize.width
                        height = newSize.height
                    }

                    /// 当图片宽度小于屏幕的0.7倍，不可点击放大
                    let disabled = width < (window.width * 0.7) ? true : false

                    return (
                        <TouchableOpacity key={index} disabled={disabled} onPress={() => {
                            this.selectedImageURL = url
                            this.setState({
                                showImageDetail: true
                            })
                        }}>
                            <Image style={[styles.questionImage, { width, height }]} resizeMode={'contain'} source={{ uri: url }} />
                        </TouchableOpacity>
                    )
                }
                if (content.search(/.\/(.*)gif/g) >= 0) {

                    var re2 = /\".*?\"/gm;
                    let urlArray = re2.exec(content)
                    let url = urlArray[0].replace(/\"/g, "")
                    return (
                        <TouchableOpacity key={index} disabled={false} onPress={() => {
                            this.selectedImageURL = url
                            this.setState({
                                showImageDetail: true
                            })
                        }}>
                            <Image style={[styles.questionImage, styles.gif]} resizeMode={'cover'} source={{ uri: url }} />                        
                        </TouchableOpacity>
                    )
                }

                return (
                    <Text key={index} style={[styles.questionText, styles.analysisTextInline, _afterSelectText()]}>{content}</Text>
                )
            })
        }
        return (
            <View style={styles.questionView}>
                {renderContent()}
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
        console.log("detail", detail)
        if (detail == null) {
            return 
        }
        if (questionManager.isMultipleChoiceQuestion(detail.question)) {
            return (
                <MultipleOptionForm
                    detail={detail.question}
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
                    detail={detail.question}
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

    renderImageDetail() {

        return (
            <Modal visible={this.state.showImageDetail} transparent={true} onRequestClose={() => { }}>
                <ImageViewer imageUrls={[{ url: this.selectedImageURL }]} onClick={() => {
                    this.setState({
                        showImageDetail: false
                    })
                }} />
            </Modal>
        )
    }

    render() {

        const { detail } = this.state
        let str = ""
        let str1 = ""
        if (detail.question.category.indexOf("资料分析") !== -1 ||
            detail.question.question_material !== "") {
            str = detail.question.question_material
            str1 = detail.question.question
        } else {
            str = detail.question.question
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
                    {this.renderImageDetail()}
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
        flexDirection: "row",
        flexWrap: "wrap"
    },
    questionText: {
        color: '#172434',
        fontSize: 16,
        lineHeight: 25,
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
    gif: {
        width: window.width - 40,
        height: 200
    }
})

