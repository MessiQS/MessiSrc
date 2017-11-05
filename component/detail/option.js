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

    select(option) {
        if (this.props.select) {
            this.props.select(option);
        }
    }

    static propTypes = {
        option_Text: PropTypes.string,
        select: PropTypes.func,
        iconURLSource: PropTypes.number,
    }

    render() {
        const { option_Text, select, iconURLSource } = this.props
        return (
            <TouchableOpacity onPress={() =>
                this.select('A')
            }>
                <View style={styles.answerItem} >
                    <Image
                        style={styles.icon}
                        source={iconURLSource}
                    />
                    <View style={styles.detailOptionView}>
                        <Text style={styles.detailOptionText}>{option_Text}</Text>
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
    }
})