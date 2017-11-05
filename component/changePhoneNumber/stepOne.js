import React, { Component } from 'react';
import {
    Alert,
} from 'react-native';
import Http from '../../service/http';
import AccountCheck from '../../service/accountCheck';
import MD5 from 'crypto-js/md5';
import Storage from '../../service/storage';
import UserTemplate from '../usual/userTemplate';

export default class CPStepOne extends React.Component {
    constructor(props) {
        super(props);
        Storage.getItem('account').then( res=>{
            this.setState({
                account:res
            })
        })
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: '更换手机号',
        headerStyle: {
            backgroundColor: '#051425',
            opacity: 0.9,
        },
        headerTintColor: 'white',
    });

    updatePassword(password){
        this.setState({
            password:password
        })
    }
    next(){
        const { navigate } = this.props.navigation;        
        const { account,password } = this.state;
        if (!AccountCheck.isValidPassword(password)) {
            Alert.alert('请输入6-21位字母与数字')
            return;
        };
        let secretPassword = MD5(password).toString();
        Http.post('api/checkPassword',{
            "account":account,
            "password":secretPassword
        }).then( res => {
            if(res.type){
                navigate('CPStepTwo', { name: 'CPStepTwo' })                        
            }else{
                Alert.alert(res.data);
            }
        })
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
