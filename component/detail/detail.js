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
    Button
} from 'react-native';
import realmManager from "../Realm/realmManager";
import realm from '../Realm/realm';
import OptionForm from "./optionForm";
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
            shadowOffset: {width: 0, height: 1}
		},
		headerTintColor: 'black',
        gesturesEnabled: true,
        headerLeft: (
            <TouchableOpacity onPress={ () => { navigation.goBack() }}>
                <View style={styles.headerLeftView}>
                    <Image style={{width:14, height:10}} source={require('../../Images/back_arrow.png')}/>
                </View>
            </TouchableOpacity>
        ),
        headerRight: navigation.state.params.headerRight
    });

    componentWillMount() {
        this.props.navigation.setParams({handleNextQuestion: this.nextQuestion.bind(this)});
        this.props.navigation.setParams({headerRight: null});
        this.props.navigation.setParams({headerTitle:this.state.detail.questionPaper.title})   
        
        console.log(this.state.detail.questionPaper)
    }

    constructor(props) {
        super(props);
        this.memoryModel = realmManager.getMemoryModels()
                            .filtered("weighting < 7")
                            .sorted('lastBySelectedTime', false)[0]
                            
        console.log(this.memoryModel)
                            
        this.state = {
            detail: this.memoryModel,
            isSelected: false,
            selectedOption: "",
        }
    }

    nextQuestion() {
        
        const that = this
        that.memoryModel = realmManager.getMemoryModels()
                            .filtered("weighting < 7")
                            .sorted('lastBySelectedTime', false)[0]
        that.setState({
            detail: that.memoryModel,
            isSelected: false,
            selectedOption: ""
        })
        that.props.navigation.setParams({headerRight: null});                        
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    _select(option) {

        const that = this

        let score = 7 - that.memoryModel.appearedSeveralTime
        score = Math.max(1, score)
        realm.write(() => {
            that.memoryModel.weighting = that.memoryModel.weighting + score
            that.memoryModel.appearedSeveralTime += 1
            that.memoryModel.lastBySelectedTime = Date.parse(new Date())
        });
        that.setState({
            isSelected: true,
            selectedOption: option,
        })
        const headerRight = (
            <TouchableOpacity onPress={ that.nextQuestion.bind(that) }>
                    <View style={styles.rightButtonStyle}>
                    <Text style={styles.rightText}>下一题</Text>
                    </View>
            </TouchableOpacity>
        )
        that.props.navigation.setParams({headerRight: headerRight});        
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
        filterStr = filterStr.replace(/<span style=\"color: #46a546;\">  ( 不定项选择 ) <\/span> /g, "")
        filterStr = filterStr.replace(/<span style=\"color: #46a546;\"> ( 不定项选择 ) <\/span> /g, "")
        
        return filterStr
    }

    _renderQuestion(str) {

        let filterStr = this._filterTag(str)
        
        var re = /.\/(.*)files/g;
        var results = re.exec(filterStr);
        var img="";
        if(results) {
            img = results[0].replace("./", "")     
            filterStr = filterStr.replace(img, key[img])
        }

        var re2 = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
        let splits = filterStr.split(re2)

        return (
            <View style={styles.questionView}>
                {
                    splits.map ((content, index) => {
                        if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
                            const url = content.replace("./", "http://www.samso.cn/images/")
                            let expr = /_(.*)x(.*)_/;
                            let size = url.match(expr)
                            let scale = (window.width - 60) / size[1]
                            let height = size[2] * scale
                            return (
                                <Image key={index} style={[styles.questionImage, {height:height}]} resizeMode={'contain'}  source={{uri: url}} />
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

    render() {
        return (
            <View style={{ flexDirection: 'column', height: "100%" }}>
                <View style={styles.topContent}>
                    <ScrollView style={styles.content}>
                        <View style={styles.categoryView}>
                            <View style={styles.categoryLine} />
                            <Text style={styles.category}>{this.state.detail.questionPaper.category}</Text>
                        </View>
                        {this._renderQuestion(this.state.detail.questionPaper.question)}
                    </ScrollView>
                </View>
                <View style={styles.separatorLine}></View>
                <ScrollView style={styles.bottomContent}>
                    <OptionForm 
                        detail={this.state.detail.questionPaper}
                        select={this._select.bind(this)}
                        isSelected={this.state.isSelected}
                        selectedOption={this.state.selectedOption}
                    />
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
    }
})

