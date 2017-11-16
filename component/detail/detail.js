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
import RealmManager from "../Realm/realmManager";
import OptionForm from "./optionForm";
import Analysis from "./analysis";
import key from "../../service/path"

export default class Detail extends Component {

    componentDidMount() {
        this.props.navigation.setParams({ handleNextQuestion: this.nextQuestion.bind(this) });
    }

    constructor(props) {
        super(props);
        let questions = RealmManager.getRandomPaper();
        let random = this.getRandomInt(0, questions.length)

        this.state = {
            detail: questions[random],
            isSelected: false,
            selectedOption: "",
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
        headerRight: (
            <TouchableOpacity onPress={ navigation.state.params.handleNextQuestion }>
                 <View style={styles.rightButtonStyle}>
                    <Text style={styles.rightText}>下一题</Text>
                 </View>
            </TouchableOpacity>
        )
    });

    _select(option) {

        const that = this

        that.setState({
            isSelected: true,
            selectedOption: option,
        })

        


    }

    _renderAnalysis() {

        if (this.state.isSelected) {
            return (
                <Analysis analysis={this._filterTag(this.state.detail.analysis)}/>
            );
        } else {
            return null;
        }
    }

    _filterTag(str) {

        let filterStr = str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
        filterStr = filterStr.replace(/<p style=\"display: inline;\">/g, "").replace(/<\/p>/g, "")
        filterStr = filterStr.replace(/<p class=\"item-p\">/g, "")

        return filterStr
    }

    _renderQuestion(str) {

        let filterStr = str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
        filterStr = filterStr.replace(/<p style=\"display: inline;\">/g, "").replace(/<\/p>/g, "")
        filterStr = filterStr.replace(/<p class=\"item-p\">/g, "")

        var re = /.\/(.*)files/g;
        var results = re.exec(filterStr);
        var img="";
        if(results) {
            img = results[0].replace("./", "")
            console.log("filterStr " + filterStr)            
            filterStr = filterStr.replace(img, key[img])
            console.log("filterStr " + filterStr)
        }

        var re2 = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;

        let splits = filterStr.split(re2)

        return (
            <View style={styles.questionView}>
                {
                    splits.map ((content, index) => {
                        if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
                            const url = content.replace("./", "http://www.samso.cn/images/")
                            return (
                                <Image key={index} style={styles.questionImage} resizeMode={'contain'}  source={{uri: url}} />
                            )
                        } else {
                            return (
                                <Text key={index} style={styles.questionText}>{ content }</Text>
                            )
                        }
                    })
                }
            </View>
        )
    }

    nextQuestion() {

        const that = this

        let questions = RealmManager.getRandomPaper();
        let random = that.getRandomInt(0, questions.length)

        that.setState({
            detail: questions[random],
            isSelected: false,
            selectedOption: ""
        })
    }

    render() {
        return (
            <View style={{ flexDirection: 'column', height: "100%" }}>
                <View style={styles.topContent}>
                    <ScrollView style={styles.content}>
                        <View style={styles.typeOfProblemView}>
                            <Text style={styles.typeOfProblem}>（{this.state.detail.subject}）</Text>
                        </View>
                        { this._renderQuestion(this.state.detail.question) }
                    </ScrollView>
                </View>
                <View style={styles.separatorLine}></View>
                <ScrollView style={styles.bottomContent}>
                    <OptionForm 
                        detail={this.state.detail}
                        select={this._select.bind(this)}
                        isSelected={this.state.isSelected}
                        selectedOption={this.state.selectedOption}
                    />
                    { this._renderAnalysis() }
                </ScrollView>
            </View>
        )
    }
};

var styles = StyleSheet.create({
    topContent: {
        flex: 1,
    },
    bottomContent: {
        flex: 1,
        backgroundColor: 'white',
    },
    typeOfProblemView: {
        height: 30,
        top: 20,
        left: 10,
    },
    typeOfProblem: {
        color: '#0076FF',
        fontSize: 17,
    },
    questionView: {
        marginTop: 20,
        marginRight: 15,
        marginLeft: 15,
    },
    questionText: {
        color: 'black',
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
        color: "#FFA200",
        fontSize: 16,
    }
})

