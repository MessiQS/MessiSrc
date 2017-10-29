import React, { Component } from 'react';
import {
    Alert,
    View,
    TextInput,
    Text,
    Button,
} from 'react-native';
import Http from '../../service/http';
import AccountCheck from '../../service/accountCheck';
import MD5 from 'crypto-js/md5';

export default class ForgotPasswordStepThreePage extends React.Component {

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

    initPassowrd(password) {
        this.setState({
            password:password
        });
    };

    checkPassowrd(password) {
        this.setState({
            repeatPassword:password
        })
    };

    updatePassword() {
        const {repeatPassword,password} = this.state;
        if (repeatPassword !== password) {
            Alert.alert('两次输入不一致');
            return;
        }
        if (!AccountCheck.isValidPassword(password)) {
            Alert.alert('请输入6-21位字母与数字')
            return;
        }
        /*  这里要不要发原始密码，待商榷 */
        /*  
            商榷结果，只发md5码 
            时间：2017年09月26日21:32:40
        */
        let secretPassword = MD5(password).toString();
        const { navigate,
                state:{
                    params
                } } = this.props.navigation;
        Http.post('api/updatepassword', {
            account: params.account,
            password: secretPassword
        }).then(res => {
            if(res.type){
            //成功后跳转
                navigate('Login',{})
            }else{
            //失败后提示
                Alert.alert(res.data);
            }
        })
    }
    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.contentStyle}>
                    <View>
                        <Text style={styles.titleTextStyle}>新密码</Text>
                        <TextInput
                            maxLength={21}
                            style={styles.passwordInputStyle}
                            placeholder="请输入新密码"
                            onChangeText={password => this.initPassowrd(password)}
                        ></TextInput>
                    </View>
                    <View>
                        <Text style={styles.titleTextStyle}>确认密码</Text>
                        <TextInput
                            maxLength={21}
                            style={styles.passwordInputStyle}
                            placeholder="请再次确认新密码"
                            onChangeText={password => this.checkPassowrd(password)}
                        ></TextInput>
                    </View>
                    <View style={{ height: 38 }}></View>
                    <Button style={styles.doneButtonStyle} onPress={this.updatePassword.bind(this)}>
                        <Text style={styles.doneTextStyle}>完成</Text>
                    </Button>
                </View>
            </View>
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
        marginTop: 30,
        width: '80%',
    },
    titleTextStyle: {
        color: '#FFA200',
        width: 68,
        fontSize: 14,
    },
    passwordInputStyle: {
        fontSize: 14,
    },
    doneButtonStyle: {
        backgroundColor: '#FFA200',
        width: '100%',
        height: 44,
    },
    doneTextStyle: {
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
    },
})
