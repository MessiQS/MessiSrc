import {
    StyleSheet,
} from 'react-native';

export const styles = {
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
        width:23,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        opacity: 0.7,
    },
    vertificationCodeView: {
        backgroundColor: '#FFA200',
        justifyContent: 'center',
        width: 100,
        height: 35,
        paddingVertical: 0,
        marginTop: 7,
        borderRadius: 8,
        marginRight:0,
    },
    vertificationCodeText: {
        fontSize: 14,
        width: '100%',
        color: 'white',
        textAlign: 'center',
    },
    registerButton: {
        justifyContent: 'center',
        backgroundColor: '#FFA200',
        height: 55,
        width: 290,
        borderRadius: 8,
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
        color: '#FFA200',
    },
    agreeBaseText: {
        width:'100%',        
        textAlign: 'center',
        fontSize: 14,
    },
    agreeButton:{
        fontSize:14,
        color:"#ffa200"
    }
};
export default stylesContainer = StyleSheet.create({
    container:{
        paddingTop: 89,
        flex:1,
        paddingLeft: 48,
        paddingRight: 48,
    },
    registerView: {
        flex:2,
        // height:260,
        // flex:2,
    },
    agreeView: {
        bottom:10,
        width:'133%',
        // flex:1,
        position :'absolute',
    }
});