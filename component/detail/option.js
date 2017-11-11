import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class Option extends React.Component {

    constructor(props) {
        super(props);
    }

    _select(option) {
        const that = this
        that.props.select(option);
    }

    _afterSelectText() {

        const that = this

        if (that.props.isSelected && that.props.selection == that.props.answer) {
            return {color: "#FFA200"}
        }
        if (that.props.isSelected && that.props.selection != that.props.answer) {
            return {color: "#FFA200", textDecorationLine:'line-through'}
        }

        return null
    }

    _afterSelectBackgroundView() {

        const that = this
        
        if (that.props.isSelected && that.props.selection == that.props.answer) {
            return styles.background
        }
        return null
    }

    _renderOptionView() {

        const { option_Text, select, iconURLSource, selection, isSelected, selectedURLSource } = this.props
        if (isSelected == true) {
            return (
                <View style={[styles.answerItem, this._afterSelectBackgroundView()]} >
                <Image
                    style={styles.icon}
                    source={isSelected ? selectedURLSource : iconURLSource}
                />
                <View style={styles.detailOptionView}>
                    <Text style={[styles.detailOptionText, this._afterSelectText()]}>{option_Text}</Text>
                </View>
            </View>
            );
            
        } else {

            return (
                <View style={[styles.answerItem]} >
                <Image
                    style={styles.icon}
                    source={iconURLSource}
                />
                <View style={styles.detailOptionView}>
                    <Text style={styles.detailOptionText}>{option_Text}</Text>
                </View>
            </View>
            );
        }
    }

    static propTypes = {
        option_Text: PropTypes.string,
        select: PropTypes.func,
        iconURLSource: PropTypes.number,
        selectedURLSource: PropTypes.number,
        selection: PropTypes.string,
        isSelected: PropTypes.bool,
        answer: PropTypes.string,
        selectedOption: PropTypes.string,
    }

    render() {
        const { option_Text, select, iconURLSource, selection, isSelected, selectedURLSource } = this.props
        return (
            <TouchableOpacity disabled={isSelected} onPress={() =>
                this._select(selection)
            }>
                { this._renderOptionView() }
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    icon: {
        marginRight: 10,
        width: 23,
        height: 23,
    },
    answerItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },
    detailOptionView: {
        flex: 1,
        paddingTop:2,
    },
    detailOptionText: {
        lineHeight: 20,
        color: "#0076FF",
        fontSize: 18,
    },
    background: {
        backgroundColor: "#D8D8D8"
    }
})