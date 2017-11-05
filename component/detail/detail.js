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

export default class Detail extends Component {

    componentDidMount() {

        
    }

    constructor(props) {
        super(props);
        let questions = RealmManager.getRandomPaper();
        this.state = {
            detail : questions[10]
        }
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

