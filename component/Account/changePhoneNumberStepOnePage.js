import React, { Component } from 'react';
import {
    Alert,
    View,
} from 'react-native';
import { Button, Container, Content, Input, Item, Text } from 'native-base';
import ChangePhoneNumberStepTwoPage from "./changePhoneNumberStepTwoPage";
import Http from '../../service/http';
import AccountCheck from '../../service/accountCheck';
import MD5 from 'crypto-js/md5';
import Storage from '../../service/storage';

export default class ChangePhoneNumberStepOnePage extends React.Component {
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
                navigate('ChangePhoneNumberStepTwoPage', { name: 'ChangePhoneNumberStepTwoPage' })                        
            }else{
                Alert.alert(res.data);
            }
        })
    }
    render() {
        return (
            <Container style={styles.containerStyle}>
            <Content style={styles.contentStyle}>
                <Text style={styles.titleTextSytle}>
                  输入登录密码验证身份
                </Text>
                <Item style={styles.item}>
                    <Text style={styles.passwordTextStyle}>密码</Text>
                    <Input secureTextEntry={true}  
                            style={styles.passwordInputStyle} 
                            placeholder="输入您的旧密码"
                            maxLength={21}
                            onChangeText = {value => this.updatePassword(value)}
                    ></Input>
                </Item>
                <View style={{height:74}}></View>
                <Button style={styles.nextStepButtonSytle} 
                        onPress={this.next.bind(this)}
                >
                    <Text style={styles.nextStepTextStyle}>下一步</Text>
                </Button>
            </Content>
        </Container>
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
        marginTop: 30,
    }, 
    titleTextSytle: {
        fontSize: 20,
        color: 'black',
    },
    item: {
        marginTop: 30,
        height: 32,
    },
    passwordTextStyle: {
        color: '#9B9B9B',
        fontSize: 14,
    },
    passwordInputStyle: {
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