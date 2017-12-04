import { Platform, StyleSheet } from 'react-native';

const iOSStyles = StyleSheet.create({
    item: {
        marginTop: 20,
        paddingBottom: 5,
        flexDirection: 'row',
        borderBottomWidth :1,
        borderBottomColor:'rgba(5,20,37,0.2)', 
    },
    iconViewStyle: {
        marginRight: 5,
        marginLeft: 10,
        width: 23,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 23,
        opacity: 0.7,
    },
    textInput: {
        fontSize: 14,
        width: 200,
    }
});

const androidStyles = StyleSheet.create({
    item: {
        marginTop: 20,
        paddingBottom: 5,
        flexDirection: 'row',
        borderBottomWidth :1,
        borderBottomColor:'rgba(5,20,37,0.2)', 
    },
    iconViewStyle: {
        marginRight: 5,
        marginLeft: 10,
        width: 23,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 23,
        opacity: 0.7,
    },
    textInput: {
        fontSize: 14,
        width: 200,
        paddingBottom: 4
        
    }
});

var styles = null

if (Platform.OS === 'ios') {
    styles = iOSStyles
} else {
    styles = androidStyles
}

export default styles