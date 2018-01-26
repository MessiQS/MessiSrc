import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { webURL, imageWebURL } from "../../service/constant"

export default class QuestionFeedback extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        detail: PropTypes.object,
        isSelected: PropTypes.bool,
    }

    feedbackClick() {

        Alert.alert('提示', '是否提交', [
            {
                text: '确定',
                onPress: async () => {
                    // navigate('mine', { account: account })
                }
            },
            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: true }
    );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.separotar}></View>
                <TouchableOpacity style={styles.feedbackContainer} onPress={this.feedbackClick.bind(this)}>
                    <Text sytle={styles.feedback}>报告内容有误</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create ({

    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separotar: {
        marginTop:16,
        height: 0.5,
        backgroundColor: "#979797",
        width: "60%",
    },
    feedbackContainer: {
        marginTop: 10,
        marginBottom: 30,
        borderColor: "#172434",
        borderWidth: 1,
        width: 100,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedback: {
        fontSize: 10,
        color: '#172434',

    }
})
