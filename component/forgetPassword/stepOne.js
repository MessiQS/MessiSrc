import React, { Component } from 'react';
import {
    Alert,
    View,
    TextInput,
    Text,
    Button,
} from 'react-native';
import AccountCheck from '../../service/accountCheck';
export default class FPStepOne extends React.Component {

    constructor(props) {
		super(props);
    }

    static navigationOptions = ({ navigation }) => ({
        title: '忘记密码',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });

    accountChange(account){
        this.account = account;
    }

    nextNaviegate(){
        if(!AccountCheck.isValidPhoneNumber(this.account)){
            Alert.alert('请输入正确的手机号码');
            return;
        }
        const { navigate } = this.props.navigation;        
        navigate('ForgotPasswordStepTwoPage', { account: this.account })
    }

    render() {
        const inputPasswors = {
            title:{
                content:'输入登录密码验证身份'
            },
            text:{
                content:'密码'
            },
            input:{
                onChangeText:this.updatePassword.bind(this),
                placeholder:"请输入密码",
                secureTextEntry:true,
                maxLength:21
            },
            button:{
                title:"下一步",
                onPress:this.next.bind(this)
            }
        }
        return (
            <UserTemplate data = {inputPasswors} />
        );
    }
}

var styles = ({
    
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentStyle: {
        width: '80%',
        marginTop: 57,
    }, 
    item: {
        marginTop: 0,
        height: 32,
    },
    phoneNumberTextStyle: {
        color: '#FFA200',
        fontSize: 14,
    },
    phoneNumberInputStyle: {
        fontSize: 14,
        height: 29,
        marginLeft: 16,
    },
    nextStepButtonSytle: {
        width: '100%',
        height: 44,
        backgroundColor: '#FFA200'
    },
    nextStepTextStyle: {
        textAlign: 'center', 
        width: '100%',   
    },
});