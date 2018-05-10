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
    Button,
    Modal
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
import OptionController from './option.controller'
import ImageViewer from 'react-native-image-zoom-viewer';

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
        this.selectedImageURL = null
        this.state = {
            detail: this._memoryModel,
            isSelected: false,
            selectedOption: [],
            A_Status: ItemStatus.NORMAL,
            B_Status: ItemStatus.NORMAL,
            C_Status: ItemStatus.NORMAL,
            D_Status: ItemStatus.NORMAL,
            showImageDetail: false,
        }
        // console.log(this._memoryModel)
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

    async _select(option) {

        let score = 0
        let itemStatus = ItemStatus.NORMAL
        var isRight = false
        if (option == this._memoryModel.questionPaper.answer) {
            score = 7 - this._memoryModel.appearedServeralTime
            score = Math.max(1, score)
            itemStatus = ItemStatus.RIGHT
            isRight = true
        } else {
            itemStatus = ItemStatus.ERROR
        }
        var record = {
            select: option,
            isRight: isRight
        }

        const newWeighting = this._memoryModel.weighting + score
        let model = await realmManager.updateMemoryModel(this._memoryModel, record, newWeighting)

        this._sendUpdateInfoCache(isRight, model)

        setTimeout(() => {
            runtime.emit(DBChange);
        }, 1);

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
            score = 7 - this._memoryModel.appearedServeralTime
            score = Math.max(1, score)
        }
        var record = {
            select: sortedSelection,
            isRight: isRight
        }

        const newWeighting = this._memoryModel.weighting + score
        realmManager.updateMemoryModel(this._memoryModel, record, newWeighting)
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

    /// 更新服务端试卷信息
    _sendUpdateInfoCache(isRight, model) {

        var user = realmManager.getCurrentUser()

        let records = []

        model.records.forEach(value => {
            let record = {
                time: value.time,
                isRight: value.isRight,
                select: value.select
            }
            records.push(record)
        })

        var param = {
            user_id: user.userId,
            paper_id: user.currentExamId,
            question_id: model.questionPaper.id,
            question_number: model.questionPaper.question_number,
            weighted: model.weighting,
            lastDateTime: model.lastBySelectedTime,
            record: JSON.stringify(records),
            firstDateTime: model.firstBySelectedTime,
        }

        if (isRight == true) {
            param.correct = "1"
            param.wrong = "0"
        } else {
            param.correct = "0"
            param.wrong = "1"
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
                        let size = OptionController.setStyleForAnalysis(styleFromCulti)
                        width = size.width
                        height = size.height
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

