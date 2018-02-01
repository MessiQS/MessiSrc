import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Http from '../../../service/http'
import ProgressView from '../../../component/progress/progress'
import realmManager from '../../../component/Realm/realmManager';

export default class Feedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            title: "",
            isProcess:false
        }
    }
    changeValue($event, type) {
        this.setState({
            [type]: $event
        })
    }
    _renderProcess(){
        const {isProcess} = this.state
        if(!!isProcess){
            return (<ProgressView />)
        }
    }
    async submitData() {
        this.setState({
            isProcess: true
        })
        const { title, content } = this.state

        console.log("feedback.js title content", title, content)
        let user = realmManager.getCurrentUser()
        let user_id = user.userId

        const response = await Http.post('api/feedback', { user_id, title, content }, true)
        console.log("feedback.js response", response)
        this.setState({
            isProcess: false
        })
        if (response.type == false) {
            Alert.alert('发送失败，请稍后重试！')
            return
        }

        Alert.alert('已经收到您的反馈！', '', [
            {
                text: '确定',
                onPress: async () => {
                    this.props.navigation.goBack()
                }
            },
        ],);
    }
    render() {
        return (
            <ScrollView style={styles.container}>
            {this._renderProcess()}
                <View style={styles.question}>
                    <TextInput 
                    style={styles.textInput}
                    placeholder="请详细描述您遇到的问题（不超过100字）"
                    underlineColorAndroid={'transparent'}
                    maxLength={100}
                    multiline = {true}                    
                    onChangeText={($event) => { this.changeValue($event, 'content') }}

                    />
                </View>
                <View style={styles.email}>
                    <TextInput 
                    style={styles.textInput}
                    placeholder="电子邮箱"
                    underlineColorAndroid={'transparent'}
                    onChangeText={($event) => { this.changeValue($event, 'title') }}

                    />
                </View>
                <TouchableOpacity style={styles.submit} onPress={this.submitData.bind(this)}>
                    <Text style={styles.submitText}>提交</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

var styles = {
    container: {
        backgroundColor: "#F6F6F6",
        height: '100%',
    },
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