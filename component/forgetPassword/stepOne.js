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

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "忘记密码",        
        headerTitleStyle: {
            color: 'black', 
            alignSelf: 'center',
            fontSize: 20 
        },
		headerStyle: {
			backgroundColor: '#FFF',
            opacity: 1,
            borderBottomWidth: 0,
            shadowOpacity: 0.2,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1}
		},
		headerTintColor: 'black',
        gesturesEnabled: true,
        headerLeft: (
            <TouchableOpacity onPress={ () => { navigation.goBack() }}>
                <View style={styles.headerLeftView}>
                    <Image source={require('../../Images/back_arrow.png')}/>
                </View>
            </TouchableOpacity>
        ),
        headerRight: navigation.state.params.headerRight
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