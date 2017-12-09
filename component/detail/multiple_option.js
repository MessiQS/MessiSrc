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
        addSelect: PropTypes.func,
        deselect: PropTypes.func,
        isSelected: PropTypes.bool,
        detail: PropTypes.object,
        selectedOption: PropTypes.array,
    }

    constructor(props) {
        super(props)
    }

    _select(option) {

        if (this.props.selectedOption.includes(option)) {
            this.props.deselect(option)
        } else {
            this.props.addSelect(option)
        }
    }

    _afterSelectText() {

        const { isSelected, selection, detail } = this.props
        const answers = detail.answer.split(',')
        console.log("answers", answers)
        if (isSelected) {
            ///  选择正确
            if (answers.includes(selection) == true) {
                return { color: "#8FDA3C" }
            }

            /// 选择错误
            if (answers.includes(selection) == false) {
                return { color: "#FF5B29" }
            }
        }
        
        return null
    }

    _selectIcon() {
        const { isSelected, selection, detail } = this.props
        let answers = detail.answer.split(",")

        ///  选择正确
        if (isSelected && answers.includes(selection) == true) {

            switch (selection) {
                case 'A': return require("../../Images/Option_A_Selected_Right.png")
                case 'B': return require("../../Images/Option_B_Selected_Right.png")
                case 'C': return require("../../Images/Option_C_Selected_Right.png")
                case 'D': return require("../../Images/Option_D_Selected_Right.png")
            }
        }

        /// 选择错误
        if (isSelected && answers.includes(selection) == false) {

            switch (selection) {
                case 'A': return require("../../Images/Option_A_Selected_Error.png")
                case 'B': return require("../../Images/Option_B_Selected_Error.png")
                case 'C': return require("../../Images/Option_C_Selected_Error.png")
                case 'D': return require("../../Images/Option_D_Selected_Error.png")
            }
        }

        return this._selectDefalutIcon(selection)
    }

    _afterSelectBackgroundView() {
        const { isSelected, selection, detail } = this.props
        const answers = detail.answer.split(',')

        if (isSelected && answers.includes(selection) == true) {
            return styles.background
        }
        return null
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

        const { selection, isSelected, selectedOption, detail } = this.props
        const answers = detail.answer.split(',')

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

        let imageTagRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
        let splits = filterStr.split(imageTagRegex)

        if (selectedOption.includes(selection) == true || answers.includes(selection)) {
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
                                        <Text key={index} style={[styles.detailOptionText, this._afterSelectText()]}>{content}</Text>
                                    )
                                }
                            })
                        }
                    </View>
                </View>
            );

        } else {

            return (
                <View style={[styles.answerItem]} >
                    <Image
                        style={styles.icon}
                        source={this._selectDefalutIcon(selection)}
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