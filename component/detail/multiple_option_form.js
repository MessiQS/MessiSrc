import React from 'react';
import MultipleOption from "./multiple_option";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';


export default class MultipleOptionForm extends React.Component {

    static propTypes = {
        detail: PropTypes.object,
        isSelected: PropTypes.bool,
        selectedOption: PropTypes.array,
        addSelect: PropTypes.func,
        doneSelect: PropTypes.func,
        A_Status: PropTypes.string,
        B_Status: PropTypes.string,
        C_Status: PropTypes.string,
        D_Status: PropTypes.string,
    }

    constructor(props) {
        super(props);
    }

    _multipleSelect(option) {
        this.props.multipleSelect(option)
    }

    _doneSelect() {
        this.props.doneSelect()
    }

    _filterTag(str) {

        return str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
    }

    _showTitle() {

        const { isSelected, selectedOption, detail } = this.props
        
        if (isSelected) {
            let answers = detail.answer.split(",")
            const array =  selectedOption
            const compareSO = array.sort().toString()
            const compareAns = answers.sort().toString()

            /// 选择正确
            if (compareSO == compareAns) {
                return (
                    <Text style={[styles.answerTitleText, { color: "#8FDA3C" }]}>{"答案正确！"}</Text>
                )
            }

            /// 选择错误
            if (compareSO != compareAns) {
                return (
                    <Text style={[styles.answerTitleText, { color: "#FF5B29" }]}>{"答案错误！"}</Text>
                )
            }
            return null

        } else {

            return (
                <View style={styles.indefiniteItem}>
                    <Text style={styles.indefiniteItemText}>请你选择多个答案</Text>
                    <ScrollView></ScrollView>
                    <TouchableOpacity onPress={() => {
                        this._doneSelect()
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
        const { detail, isSelected, A_Status, B_Status, C_Status, D_Status } = this.props;

        return (
            <View style={styles.content}>
                <View style={styles.answerTitleView}>
                    {this._showTitle()}
                </View>
                <MultipleOption option_Text={this._filterTag(detail.option_A)}
                    multipleSelect={this._multipleSelect.bind(this)}
                    selection={"A"}
                    isSelected={isSelected}
                    detail={detail}
                    status={A_Status}
                />
                <MultipleOption option_Text={this._filterTag(detail.option_B)}
                    multipleSelect={this._multipleSelect.bind(this)}
                    selection={"B"}
                    isSelected={isSelected}
                    detail={detail}
                    status={B_Status}
                />
                <MultipleOption option_Text={this._filterTag(detail.option_C)}
                    multipleSelect={this._multipleSelect.bind(this)}
                    selection={"C"}
                    isSelected={isSelected}
                    detail={detail}
                    status={C_Status}
                />
                <MultipleOption option_Text={this._filterTag(detail.option_D)}
                    multipleSelect={this._multipleSelect.bind(this)}
                    selection={"D"}
                    isSelected={isSelected}
                    detail={detail}
                    status={D_Status}
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
        height: 52,
    },
    answerTitleText: {
        marginLeft: 28,
        marginTop: 32,
        fontSize: 13,
    },
    indefiniteItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 52,
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