import React, { Component } from 'react';
import {
    Alert,
    View,
    TextInput,
    Text,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import AccountCheck from '../../service/accountCheck';
import UserTemplate from '../usual/userTemplate';


export default class FPStepOne extends React.Component {

    constructor(props) {
		super(props);
    }

    accountChange(account){
        this.account = account;
    }

    nextNaviegate(){
        if(!AccountCheck.isValidPhoneNumber(this.account)){
            Alert.alert('请输入正确的手机号码');
            return;
        }
        const { navigate } = this.props.navigation;        
        navigate('FPStepTwo', { account: this.account })
    }

    render() {
        const inputPasswors = {
            title:{
                content:'请输入手机号码验证身份'
            },
            text:{
                content:'+86',
                style:{
                    color:'#FF5B29'
                }
            },
            input:{
                onChangeText:this.accountChange.bind(this),
                placeholder:"请输入手机号码",
                maxLength:11
            },
            button:{
                title:"下一步",
                onPress:this.nextNaviegate.bind(this)
            }
        }
        return (
            <UserTemplate data = {inputPasswors} />
        );
    }
}


var styles = ({
    headerLeftView: {
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
    },
})