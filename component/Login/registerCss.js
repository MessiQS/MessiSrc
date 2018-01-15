import {
    StyleSheet,
} from 'react-native';

export const styles = {
    headerLeftView: {
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
    },
    form: {
        flex: 1,
    },
    textInput: {
        top: 30,
        height: 48,
    },
    iconViewStyle: {
        marginRight: 5,
        marginLeft: 10,
        width:25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        opacity: 0.7,
    },
    vertificationCodeView: {
        justifyContent: 'center',
        width: 100,
        height: 35,
        paddingVertical: 0,
        marginTop: 7,
        borderRadius: 8,
        marginRight:0,
    },
    isValidCodeView:{
        backgroundColor: '#ccc',
    },
    vertificationCodeText: {
        fontSize: 14,
        width: '100%',
        color: 'white',
        textAlign: 'center',
        backgroundColor: "rgba(0,0,0,0)",
    },
    registerButton: {
        justifyContent: 'center',
        height: 55,
        borderRadius: 6,
        overflow: 'hidden',
    },
    item: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 0,
        height: 50,
    },
    bottomLine: {
        height:1,
        backgroundColor: "#D8D8D8",
    },
    bottomLineVertification: {
        height:1,
        backgroundColor: "#D8D8D8",
        width: "60%",
    },
    registerText: {
        backgroundColor: "rgba(0,0,0,0)",
        width: '100%',
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    agreeText: {
        width: 100,
        height: 50,
        color: '#FF5B29',
    },
    agreeBaseText: {
        width:'100%',        
        textAlign: 'center',
        fontSize: 14,
    },
    agreeButton:{
        fontSize:14,
        color:"#FF5B29"
    },
    textInput: {
        width: "100%",
    },
    vertiTextInput: {
        width: "50%",
    }
};
export default stylesContainer = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        paddingTop: 89,
        flex:1,
        paddingLeft: 48,
        paddingRight: 48,
    },
    registerView: {
        flex:2,
        borderRadius: 6,
        // height:260,
        // flex:2,
    },
    agreeView: {
        bottom:16,
        width:'100%',
    }
});