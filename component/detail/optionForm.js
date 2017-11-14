import React from 'react';
import Option from "./option";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class OptionForm extends React.Component {

    static propTypes = {
        detail: PropTypes.object,
        select: PropTypes.func,
        isSelected: PropTypes.bool,
        selectedOption: PropTypes.string,
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
            answerTitle:answerTitle,
        })
        this.props.select(option)
    }

    _filterTag(str) {
        
        let filterStr = str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
        filterStr = filterStr.replace(/<p style=\"display: inline;\">/g, "").replace(/<\/p>/g, "")
        filterStr = filterStr.replace(/<p class=\"item-p\">/g, "")
        
        return filterStr
    }

    _isSelected(option) {
        if (this.props.selectedOption == option) {
            return true
        } else {
            return false
        }
    }

    _showTitle() {
        if (this.props.isSelected == true) {
            return(
                <View style={styles.answerTitleView}>
                   <Text style={styles.answerTitleText}>{this.state.answerTitle}</Text>
                </View>
            )
        } else {
            return( 
                <View style={styles.answerTitleView}></View>
            )
        }
    }

    render() {
        const { detail, selectedOption, isSelected } = this.props;

        return(
            <View style={styles.content}>
                { this._showTitle() }
                <Option option_Text={this._filterTag(detail.option_A)} 
                        select={this._select.bind(this)}
                        iconURLSource={require('../../Images/Option_A.png')}
                        selectedURLSource={require('../../Images/Option_A_Selected.png')}
                        selection={"A"}
                        isSelected={isSelected}
                        answer={detail.answer}
                        selectedOption={selectedOption}
                />
                <Option option_Text={this._filterTag(detail.option_B)} 
                        select={this._select.bind(this)}
                        iconURLSource={require('../../Images/Option_B.png')}
                        selectedURLSource={require('../../Images/Option_B_Selected.png')}
                        selection={"B"}
                        isSelected={isSelected}
                        answer={detail.answer}
                        selectedOption={selectedOption}
                />
                <Option option_Text={this._filterTag(detail.option_C)} 
                        select={this._select.bind(this)}
                        iconURLSource={require('../../Images/Option_C.png')}
                        selectedURLSource={require('../../Images/Option_C_Selected.png')}
                        selection={"C"}
                        isSelected={isSelected}
                        answer={detail.answer}
                        selectedOption={selectedOption}
                />
                <Option option_Text={this._filterTag(detail.option_D)} 
                        select={this._select.bind(this)}
                        iconURLSource={require('../../Images/Option_D.png')}
                        selectedURLSource={require('../../Images/Option_D_Selected.png')}
                        selection={"D"}
                        isSelected={isSelected}
                        answer={detail.answer}
                        selectedOption={selectedOption}
                />
            </View>
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