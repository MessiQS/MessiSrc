import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';

export default class Feedback extends React.Component {

    constructor(props) {
		super(props);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.question}>
                    <TextInput 
                    style={styles.textInput}
                    placeholder="请详细描述您遇到的问题（不超过100字）"
                    underlineColorAndroid={'transparent'}
                    maxLength={100}
                    multiline = {true}                    
                    />
                </View>
                <View style={styles.email}>
                    <TextInput 
                    style={styles.textInput}
                    placeholder="电子邮箱"
                    underlineColorAndroid={'transparent'}
                    
                    />
                </View>
                <View style={styles.submit}>
                    <Text style={styles.submitText}>提交</Text>
                </View>
            </ScrollView>
        )
    }
}

var styles = {
    question: {
        backgroundColor: "white",
        height: 182,
        marginTop: 7,
        marginRight: 12,
        marginLeft: 12,       
        borderRadius: 5,
    },
    email: {
        backgroundColor: "white",
        height: 40,
        marginTop: 14,        
        marginRight: 12,
        marginLeft: 12,        
        borderRadius: 5,
    },
    submit: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FF5B29",
        height: 44,
        marginTop: 14,        
        marginRight: 12,
        marginLeft: 12,
        borderRadius: 5,
    },
    submitText: {
        fontSize: 16,
        color: "white",
    },
    textInput: {
        marginRight: 10,
        marginLeft: 10,
    }
}