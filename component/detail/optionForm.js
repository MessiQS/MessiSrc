import React from 'react';
import Option from "./option";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';

export default class OptionForm extends React.Component {

    static propTypes = {
        detail: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            isDisable: false,
            answerTitle: null,
        }
    }

    _select(option) {

        const that = this
        let answerTitle

        if (option == that.props.detail.answer) {
            answerTitle = "回答正确！"
        } else {
            answerTitle = "回答错误！"
        }
        that.setState({
            isDisable:true,
            answerTitle:answerTitle,
        })
    }

    render() {
        const { detail } = this.props;

        return(
            <ScrollView style={styles.content}>
                <View style={styles.answerTitleView}>
                    <Text style={styles.answerTitleText}>{this.state.answerTitle}</Text>
                </View>
                <Option option_Text={detail.option_A} 
                        select={this._select.bind(this)}
                        iconURLSource={require('../../Images/Option_A.png')}
                        selectedURLSource={require('../../Images/Option_A_Selected.png')}
                        selection={"A"}
                        isDisable={this.state.isDisable}
                        answer={detail.answer}
                ></Option>
                <Option option_Text={detail.option_B} 
                        select={this._select.bind(this)}
                        iconURLSource={require('../../Images/Option_B.png')}
                        selectedURLSource={require('../../Images/Option_B_Selected.png')}
                        selection={"B"}
                        isDisable={this.state.isDisable}
                        answer={detail.answer}
                ></Option>
                <Option option_Text={detail.option_C} 
                        select={this._select.bind(this)}
                        iconURLSource={require('../../Images/Option_C.png')}
                        selectedURLSource={require('../../Images/Option_C_Selected.png')}
                        selection={"C"}
                        isDisable={this.state.isDisable}
                        answer={detail.answer}
                ></Option>
                <Option option_Text={detail.option_D} 
                        select={this._select.bind(this)}
                        iconURLSource={require('../../Images/Option_D.png')}
                        selectedURLSource={require('../../Images/Option_D_Selected.png')}
                        selection={"D"}
                        isDisable={this.state.isDisable}
                        answer={detail.answer}
                ></Option>
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({

    answerTitleView: {
        height: 30,
        backgroundColor: 'white',
        paddingLeft: 28,
        paddingTop: 8,
    },
    answerTitleText: {
        color:"#FFA200",
        fontSize: 13,
    },
    content: {
        backgroundColor: 'white',
        flex: 1,
        width: "100%"
    }
})