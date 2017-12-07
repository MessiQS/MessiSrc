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
    }

    constructor(props) {
        super(props);

        this.state = {
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
            answerTitle: answerTitle,
        })
        this.props.select(option)
    }

    _filterTag(str) {

        let filterStr = str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
        filterStr = filterStr.replace(/<p style=\"display: inline;\">/g, "").replace(/<\/p>/g, "")
        filterStr = filterStr.replace(/<p class=\"item-p\">/g, "")

        return filterStr
    }

    // _isSelected(option) {

    //     if (this.props.detail.subject == "不定项") {


    //     } 



    //     if (this.props.selectedOption.includes(option)) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    _showTitle() {

        const { isSelected, selectedOption, answer, detail } = this.props

        if (detail.subject == "单选题") {
/// 选择正确
if (isSelected && selectedOption.includes(detail.answer) == true) {
    return (
        <Text style={[styles.answerTitleText, { color: "#8FDA3C" }]}>{this.state.answerTitle}</Text>
    )
}

/// 选择错误
if (isSelected && selectedOption.includes(detail.answer) == false) {
    return (
        <Text style={[styles.answerTitleText, { color: "#FF5B29" }]}>{this.state.answerTitle}</Text>
    )
}
        }
        
        if (detail.subject == "不定项") {
            return (
                <View style={styles.indefiniteItem}>
                    <Text style={styles.indefiniteItemText}>请你选择多个答案</Text>
                    <ScrollView></ScrollView>
                    <TouchableOpacity onPress={() => {

                    }}>
                        <View style={styles.doneView}>
                            <Text style={styles.doneText}>确定选择</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        const { detail, selectedOption, isSelected } = this.props;

        return (
            <View style={styles.content}>
                <View style={styles.answerTitleView}>
                    {this._showTitle()}
                </View>
                <Option option_Text={this._filterTag(detail.option_A)}
                    select={this._select.bind(this)}
                    iconURLSource={require('../../Images/Option_A.png')}
                    selection={"A"}
                    isSelected={isSelected}
                    detail={detail}
                    selectedOption={selectedOption}
                />
                <Option option_Text={this._filterTag(detail.option_B)}
                    select={this._select.bind(this)}
                    selection={"B"}
                    isSelected={isSelected}
                    detail={detail}
                    selectedOption={selectedOption}
                />
                <Option option_Text={this._filterTag(detail.option_C)}
                    select={this._select.bind(this)}
                    selection={"C"}
                    isSelected={isSelected}
                    detail={detail}
                    selectedOption={selectedOption}
                />
                <Option option_Text={this._filterTag(detail.option_D)}
                    select={this._select.bind(this)}
                    selection={"D"}
                    isSelected={isSelected}
                    detail={detail}
                    selectedOption={selectedOption}
                />
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
        marginTop: 8,
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