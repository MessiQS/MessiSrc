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
import MessageService from "../../service/message.service"
import realmManager from "../../component/Realm/realmManager"

export default class QuestionFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabledButton: false
        }
    }

    static propTypes = {
        detail: PropTypes.object,
        isSelected: PropTypes.bool,
    }

    feedbackClick() {

        const that = this
        var user = realmManager.getCurrentUser()
        let detail = this.props.detail
        let params = {
            title: detail.questionPaper.title,
            id:detail.questionPaper.id,
            question_number: detail.questionPaper.question_number.toString(),
            user_id: user.userId,
        }

        Alert.alert('请确认该题是否内容有误', '', [
            {
                text: '确定',
                onPress: async () => {
                    that.feedbackRequest(params)
                }
            },
            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: true }
     );
    }

    feedbackRequest(params) {

        Alert.alert('感谢您的反馈', '', [
            {
                text: '确定',
                onPress: async () => {
                    
                }
            },
        ]);

        MessageService.wrongFeedback(params)
        .then( value => {
            console.log("MessageService.wrongFeedback", params)

            this.setState({
                disabledButton: true
            })
        })
        .catch( e => {
            console.log("error", e)
        })
    }

    render() {

        if (this.state.disabledButton == false) {

            return (
                <View style={styles.container}>
                    <View style={styles.separotar}></View>
                    <TouchableOpacity style={styles.feedbackContainer} onPress={this.feedbackClick.bind(this)}>
                        <Text style={styles.feedback}>报告内容有误</Text>
                    </TouchableOpacity>
                </View>
            )

        } else {

            return (
                <View style={styles.container}>
                    <View style={styles.separotar}></View>
                    <TouchableOpacity disabled={this.state.disabledButton} style={styles.feedbackDisableContainer} >
                        <Text style={styles.feedbackDisableColor}>报告内容有误</Text>
                    </TouchableOpacity>
                </View>
            )
        }
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
        borderColor: "rgba(0,0,0,.75)",
        borderWidth: 1,
        width: 90,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedback: {
        fontSize: 10,
        color: '#172434',

    },
    feedbackDisableContainer: {
        marginTop: 10,
        marginBottom: 30,
        borderColor: 'rgba(151,151,151, .6)',
        borderWidth: 1,
        width: 90,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedbackDisableColor: {
        fontSize: 10,
        color: 'rgba(155,155,155, 1)',
    }
})
