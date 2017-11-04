import React, { Component } from 'react';
import {
    Alert,
    View,
    TextInput,
    Text,
    StyleSheet
} from 'react-native';
import SamsoButton from './button';
export default class UserTemplate extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }
    isHaveTitle() {
        const { title } = this.data;
        if (title) {
            return (
                <Text style={styles.title}>{title.content}</Text>
            )
        }
    }
    isHaveText() {
        const { text } = this.data;
        if (text) {
            return (
                <Text style={[styles.text, text.style]}>{text.content}</Text>
            )
        }
    }
    render() {
        const { input,button } = this.data;
        return (
            <View style={styles.container}>
                {this.isHaveTitle()}
                <View style={styles.input}>
                    {this.isHaveText()}
                    <TextInput 
                        secureTextEntry={input.secureTextEntry}
                        style={styles.passwordInputStyle}
                        placeholder={input.placeholder}
                        maxLength={21}
                        onChangeText={value => input.onChangeText(value)}
                    ></TextInput>
                </View>
                <SamsoButton
                    onPress={button.onPress}
                    title={button.title}
                ></SamsoButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:"14.28%",
        paddingRight:"14.28%",
        paddingTop:36
    },
    title:{
        fontSize:18,
        color:"#000",
    },
    input:{
        marginTop:20,
        // flex:1,
        flexDirection:'row',
        borderBottomWidth:1,
        paddingBottom:7,
        borderBottomColor:'#dcdcdc',
        marginBottom:70
    },
    text:{
        fontSize:14,
        color:"#9b9b9b",
        lineHeight: 29,
        justifyContent:'center',
    },
    passwordInputStyle:{
        paddingTop:3,
        fontSize: 14,
        lineHeight: 29,
        justifyContent:'center',
        marginLeft: 16,
    },
    padd:{
        backgroundColor:"red"
    }
})