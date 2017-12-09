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
import key from "../../service/path"

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

        let filterStr = str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
        filterStr = filterStr.replace(/<p style=\"display: inline;\">/g, "").replace(/<\/p>/g, "")
        filterStr = filterStr.replace(/<p class=\"item-p\">/g, "")

        let re = /.\/(.*)files/g;
        let results = re.exec(filterStr);
        let img = "";
        if (results) {
            img = results[0].replace("./", "")
            filterStr = filterStr.replace(img, key[img])
        }

        return filterStr
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

    render() {
        const { detail, isSelected, A_Status, B_Status, C_Status, D_Status } = this.props;

        return (
            <View style={styles.content}>
                <View style={styles.answerTitleView}>
                    {this._showTitle()}
                </View>
                <Option option_Text={this._filterTag(detail.option_A)}
                    select={this._select.bind(this)}
                    selection={"A"}
                    isSelected={isSelected}
                    status={A_Status}
                />
                <Option option_Text={this._filterTag(detail.option_B)}
                    select={this._select.bind(this)}
                    selection={"B"}
                    isSelected={isSelected}
                    status={B_Status}
                />
                <Option option_Text={this._filterTag(detail.option_C)}
                    select={this._select.bind(this)}
                    selection={"C"}
                    isSelected={isSelected}
                    status={C_Status}
                />
                <Option option_Text={this._filterTag(detail.option_D)}
                    select={this._select.bind(this)}
                    selection={"D"}
                    isSelected={isSelected}
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