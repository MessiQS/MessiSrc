import React from 'react';
import Option from "./option";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';

export default class OptionForm extends React.Component {

    static propTypes = {
        detail: PropTypes.object,
        select: PropTypes.func,
        isSelected: PropTypes.bool,
        selectedOption: PropTypes.array,
        A_Status: PropTypes.string,
        B_Status: PropTypes.string,
        C_Status: PropTypes.string,
        D_Status: PropTypes.string,
    }

    constructor(props) {
        super(props);
    }

    _select(option) {

        this.props.select(option)
    }

    _filterTag(str) {

        return str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
    }

    _showTitle() {

        const { isSelected, selectedOption, detail } = this.props

        /// 选择正确
        if (isSelected && selectedOption.includes(detail.answer) == true) {
            return (
                <Text style={[styles.answerTitleText, { color: "#8FDA3C" }]}>{"答案正确！"}</Text>
            )
        }

        /// 选择错误
        if (isSelected && selectedOption.includes(detail.answer) == false) {
            return (
                <Text style={[styles.answerTitleText, { color: "#FF5B29" }]}>{"答案错误！"}</Text>
            )
        }

        return null;
    }


    _renderOption(selection, option, status, isSelected) {

        if (option.length == 0) {
            return null
        }
        return (
            <Option option_Text={this._filterTag(option)}
                    select={this._select.bind(this)}
                    selection={selection}
                    isSelected={isSelected}
                    status={status}
                />
        )
    }

    render() {
        const that = this
        const { detail, isSelected, A_Status, B_Status, C_Status, D_Status } = this.props;

        return (
            <View style={styles.content}>
                <View style={styles.answerTitleView}>
                    {detail.ignoreWarning == true ? null : that._showTitle()}
                </View>
                {that._renderOption("A", detail.option_A, A_Status, isSelected)}
                {that._renderOption("B", detail.option_B, B_Status, isSelected)}
                {that._renderOption("C", detail.option_C, C_Status, isSelected)}
                {that._renderOption("D", detail.option_D, D_Status, isSelected)}
            </View>
        );
    }
}

var styles = StyleSheet.create({

    content: {
        backgroundColor: 'white',
        flex: 1,
        width: "100%"
    },
    answerTitleView: {
        height: 40,
    },
    answerTitleText: {
        marginLeft: 28,
        marginTop: 18,
        fontSize: 13,
    },
    indefiniteItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
    },
    indefiniteItemText: {
        fontSize: 13,
        color: "#172434",
        marginLeft: 29,
        marginTop: 23,
    },
    doneView: {
        borderWidth: 1,
        borderColor: '#1495EB',
        borderRadius: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 55,
        height: 20,
        marginRight: 29,
        marginTop: 23,
    },
    doneText: {
        fontSize: 12,
        color: '#1495EB',
    }
})