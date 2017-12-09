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
        deselect: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            answerTitle: null,
        }
    }

    _addSelect(option) {
        this.props.addSelect(option)
    }

    _deselect(option) {
        this.props.deselect(option)
    }

    _doneSelect() {
        this.props.doneSelect()
    }

    _filterTag(str) {

        let filterStr = str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
        filterStr = filterStr.replace(/<p style=\"display: inline;\">/g, "").replace(/<\/p>/g, "")
        filterStr = filterStr.replace(/<p class=\"item-p\">/g, "")

        return filterStr
    }

    _showTitle() {

        const { isSelected, selectedOption, answer, detail } = this.props

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

    render() {
        const { detail, selectedOption, isSelected } = this.props;

        return (
            <View style={styles.content}>
                <View style={styles.answerTitleView}>
                    {this._showTitle()}
                </View>
                <MultipleOption option_Text={this._filterTag(detail.option_A)}
                    addSelect={this._addSelect.bind(this)}
                    deselect={this._deselect.bind(this)}
                    selection={"A"}
                    isSelected={isSelected}
                    detail={detail}
                    selectedOption={selectedOption}
                />
                <MultipleOption option_Text={this._filterTag(detail.option_B)}
                    addSelect={this._addSelect.bind(this)}
                    deselect={this._deselect.bind(this)}
                    selection={"B"}
                    isSelected={isSelected}
                    detail={detail}
                    selectedOption={selectedOption}
                />
                <MultipleOption option_Text={this._filterTag(detail.option_C)}
                    addSelect={this._addSelect.bind(this)}
                    deselect={this._deselect.bind(this)}
                    selection={"C"}
                    isSelected={isSelected}
                    detail={detail}
                    selectedOption={selectedOption}
                />
                <MultipleOption option_Text={this._filterTag(detail.option_D)}
                    addSelect={this._addSelect.bind(this)}
                    deselect={this._deselect.bind(this)}
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