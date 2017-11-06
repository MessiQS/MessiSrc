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

export default class Detail extends Component {

    componentDidMount() {


    }

    constructor(props) {
        super(props);
        let questions = RealmManager.getRandomPaper();
        let random = this.getRandomInt(0, questions.length)

        this.state = {
            detail: questions[random],
            isSelected: false,
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
        header: ({ state, setParams }) => {
            right: <Button title="下一题" />,
        },
        headerTintColor: 'white',
    });

    _select(option) {

        const that = this

        that.setState({
            isSelected: true,
        })
    }

    _renderAnalysis() {

        if (this.state.isSelected) {
            return (
                <Analysis analysis={this.state.detail.analysis}/>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'column', height: "100%" }}>
                <View style={styles.topContent}>
                    <ScrollView style={styles.content}>
                        <View style={styles.typeOfProblemView}>
                            <Text style={styles.typeOfProblem}>（{this.state.detail.subject}）</Text>
                        </View>
                        <View style={styles.questionView}>
                            <Text style={styles.questionText}>{this.state.detail.question}</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.separatorLine}></View>
                <ScrollView style={styles.bottomContent}>
                    <OptionForm 
                        detail={this.state.detail}
                        select={this._select.bind(this)}
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
    }
})

