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
        this.state = {
            selected: false,
        }
    }

    _select(option) {
        const that = this
        if (that.props.select) {
            this.setState({
                selected: true
            })
            that.props.select(option);
        }
    }

    _afterSelectText() {

        const that = this

        if (that.state.selected && that.props.selection == that.props.answer) {
            return {color: "#FFA200"}
        }
        if (that.state.selected && that.props.selection != that.props.answer) {
            return {color: "#FFA200", textDecorationLine:'line-through'}
        }

        return null
    }

    _afterSelectBackgroundView() {

        const that = this
        
        if (that.state.selected && that.props.selection == that.props.answer) {
            return styles.background
        }
        return null
    }

    static propTypes = {
        option_Text: PropTypes.string,
        select: PropTypes.func,
        iconURLSource: PropTypes.number,
        selectedURLSource: PropTypes.number,
        selection: PropTypes.string,
        isDisable: PropTypes.bool,
        answer: PropTypes.string
    }

    render() {
        const { option_Text, select, iconURLSource, selection, isDisable, selectedURLSource } = this.props
        return (
            <TouchableOpacity disabled={isDisable} onPress={() =>
                this._select(selection)
            }>
                <View style={[styles.answerItem, this._afterSelectBackgroundView()]} >
                    <Image
                        style={styles.icon}
                        source={this.state.selected ? selectedURLSource : iconURLSource}
                    />
                    <View style={styles.detailOptionView}>
                        <Text style={[styles.detailOptionText, this._afterSelectText()]}>{option_Text}</Text>
                    </View>
                </View>
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