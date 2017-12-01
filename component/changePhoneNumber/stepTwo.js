import React from 'react';
import Http from '../../service/http';
import AccountCheck from '../../service/accountCheck';
import UserTemplate from '../usual/userTemplate';
import {
    Alert,
} from 'react-native';

export default class CPStepTwo extends React.Component {

    constructor(props) {
		super(props);
    }
    
    updateDate(account){
        this.setState({
            account:account
        })
    }

    next(){
        const { navigate } = this.props.navigation;        
        const {account} = this.state;
        if(AccountCheck.isValidPhoneNumber(account)){
            navigate('CPStepThree', { account: account})
        }else{
            Alert.alert('请输入正确的账号');
        }
    }
    render() {
        const inputPasswors = {
            title:{
                content:'输入新的手机号'
            },
            text:{
                content:'+86',
                style:{
                    color:'#FF5B29'
                }
            },
            input:{
                onChangeText:this.updateDate.bind(this),
                placeholder:"请输入手机号码",
                maxLength:11               
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