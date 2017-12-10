import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import key from "../../service/path"
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class MultipleOption extends React.Component {

    static propTypes = {
        option_Text: PropTypes.string,
        selection: PropTypes.string,    /// 当前选项
        multipleSelect: PropTypes.func,
        isSelected: PropTypes.bool,
        detail: PropTypes.object,
        status: PropTypes.string
    }

    constructor(props) {
        super(props)
    }

    _select(option) {

        this.props.multipleSelect(option)
    }

    _selectIcon() {

        const { status, selection } = this.props
        if (status == "normal") {
            return this._selectDefalutIcon(selection)
        }
        if (status == "selected") {
            return this._selectDefalutIcon(selection)
        }
        if (status == "right") {
            return this._selectIconRight(selection)
        }
        if (status == "error") {
            return this._selectIconError(selection)
        }
        return null        
    }

    _afterSelectBackgroundView() {

        const { status, selection } = this.props
        if (status == "normal") {
            return null
        }
        if (status == "selected") {
            return styles.background
        }
        if (status == "right") {
            return styles.background
        }
        if (status == "error") {
            return null
        }
        return null
    }

    _selectIconRight(selection) {

        switch (selection) {
            case 'A': return require("../../Images/Option_A_Selected_Right.png")
            case 'B': return require("../../Images/Option_B_Selected_Right.png")
            case 'C': return require("../../Images/Option_C_Selected_Right.png")
            case 'D': return require("../../Images/Option_D_Selected_Right.png")
        }
    }

    _selectIconError(selection) {

        switch (selection) {
            case 'A': return require("../../Images/Option_A_Selected_Error.png")
            case 'B': return require("../../Images/Option_B_Selected_Error.png")
            case 'C': return require("../../Images/Option_C_Selected_Error.png")
            case 'D': return require("../../Images/Option_D_Selected_Error.png")
        }
    }

    _selectDefalutIcon(selection) {

        switch (selection) {
            case 'A': return require("../../Images/Option_A.png")
            case 'B': return require("../../Images/Option_B.png")
            case 'C': return require("../../Images/Option_C.png")
            case 'D': return require("../../Images/Option_D.png")
        }
        return null
    }

    _renderOptionView(str) {

        let imageTagRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
        let splits = str.split(imageTagRegex)

        return (
            <View style={[styles.answerItem, this._afterSelectBackgroundView()]} >
                <Image
                    style={styles.icon}
                    source={this._selectIcon()}
                />
                <View style={styles.detailOptionView}>
                    {
                        splits.map((content, index) => {
                            if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
                                this._renderImage(content)
                            } else {
                                return (
                                    <Text key={index} style={styles.detailOptionText}>{content}</Text>
                                )
                            }
                        })
                    }
                </View>
            </View>
        );
    }

    _renderImage(content) {
        const url = content.replace("./", "http://www.samso.cn/images/")
        let expr = /\/(.*)_(.*)x(.*)_/;
        let size = url.match(expr)
        const scale = 0.3
        let width = size[2] * scale
        let height = size[3] * scale

        if (size[1].search("formula")) {
            width = size[2] * (23 / size[3])
            height = 23
        }

        return (
            <Image key={index} style={[styles.optionImage, { width: width, height: height }]} resizeMode={'contain'} source={{ uri: url }} />
        )
    }

    render() {
        const { option_Text, selection, isSelected } = this.props
        return (
            <TouchableOpacity disabled={isSelected} onPress={() =>
                this._select(selection)
            }>
                {this._renderOptionView(option_Text)}
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    icon: {
        margin: 10,
        width: 23,
        height: 23,
    },
    answerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 19,
        paddingRight: 29,
    },
    detailOptionView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    detailOptionText: {
        marginTop: 12,
        lineHeight: 20,
        fontSize: 18,
        color: "#172434",
    },
    background: {
        backgroundColor: "#D8D8D8"
    },
    optionImage: {
        marginTop: 10,
    },
})