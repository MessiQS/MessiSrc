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
import RealmManager from "../Realm/realmManager";
import Option from "./option";


export default class Detail extends Component {

    componentDidMount() {


    }

    constructor(props) {
        super(props);
        let questions = RealmManager.getRandomPaper();
        let random = this.getRandomInt(0, questions.length)

        this.state = {
            detail: questions[random]
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
    });

    select(option) {

        console.log(option)
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
                <View style={styles.bottomContent}>
                    <ScrollView style={styles.content}>
                        <TouchableOpacity onPress={() =>
                            this.select('A')
                        }>
                            <View style={styles.answerItem} >
                                <Image
                                    style={styles.icon}
                                    source={require('../../Images/Option_A.png')}
                                />
                                <View style={styles.detailOptionView}>
                                    <Text style={styles.detailOptionText}>{this.state.detail.option_A}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>
                            this.select('B')
                        }>
                            <View style={styles.answerItem} >
                                <Image
                                    style={styles.icon}
                                    source={require('../../Images/Option_B.png')}
                                />
                                <View style={styles.detailOptionView}>
                                    <Text style={styles.detailOptionText}>{this.state.detail.option_B}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>
                            this.select('C')
                        }>
                            <View style={styles.answerItem} >
                                <Image
                                    style={styles.icon}
                                    source={require('../../Images/Option_C.png')}
                                />
                                <View style={styles.detailOptionView}>
                                    <Text style={styles.detailOptionText}>{this.state.detail.option_C}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>
                            this.select('D')
                        }>
                            <View style={styles.answerItem}>
                                <Image
                                    style={styles.icon}
                                    source={require('../../Images/Option_D.png')}
                                />
                                <View style={styles.detailOptionView}>
                                    <Text style={styles.detailOptionText}>{this.state.detail.option_D}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
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
    },
    content: {
        backgroundColor: 'white',
        flex: 1,
        width: "100%"
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
    icon: {
        marginRight: 10,
        width: 23,
        height: 23,
    },
    answerItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },
    detailOptionView: {
        flex: 1,
        paddingTop:2,
    },
    detailOptionText: {
        lineHeight: 24,
        color: "#0076FF",
        fontSize: 18,
    }
})

