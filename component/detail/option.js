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
import {webURL} from "../../service/constant"
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export default class Option extends React.Component {

    static propTypes = {
        option_Text: PropTypes.string,
        select: PropTypes.func,
        selection: PropTypes.string,
        isSelected: PropTypes.bool,
        status: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    _select(option) {
        const that = this
        that.props.select(option);
    }

    _handleImageURL(content) {

        console.log("_handleImageURL content", content)
        /// 获取 "/2016年上海《行测》真题（B类） - 腰果公考_files/normal_610x328_a0d18f5c4d9ceac41b845efc3b73876a.png"
        var re2 = /\/.*?\.(?:png|jpg)/gm;
        let suffixUrl = re2.exec(content)
        console.log("suffixUrl", suffixUrl)
        let sufUrl = suffixUrl[0]
        console.log("_handleImageURL sufUrl", sufUrl)

        // 获取"/952428d694d9f518/normal_764x574_f7cd44964754b57.png"
        var re = /\/(.*)files/g;
        var results = re.exec(sufUrl);
        console.log("results", results)
        let suffix = null
        if (results) {
            let img = results[0].replace("/", "", )
            if (key[img] != null) {
                suffix = sufUrl.replace(img, key[img])
            } else {
                suffix = sufUrl
            }
        } else {

            suffix = sufUrl
        }
        return webURL + "images" + suffix
    }

    _afterSelectText() {

        const { status, selection } = this.props
        if (status == "normal") { }
        if (status == "selected") { }
        if (status == "right") {
            return { color: "#8FDA3C" }
        }
        if (status == "error") {
            return { color: "#FF5B29" }
        }
        return null
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

        let regex = /<img/g
        let splits = str.split(regex)

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
                                console.log("option.js, content ", content)
                                let url = this._handleImageURL(content)
                                console.log("option.js url", url)
                                let expr = /\/(.*)_(.*)x(.*)_/;
                                let size = url.match(expr)
                                console.log("option.js size", size)
                                const scale = 0.3
                                let width = size[2] * scale /// cannot read 2 TODO
                                let height = size[3] * scale

                                if (size[1].search("formula")) {
                                    width = size[2] * (23 / size[3])
                                    height = 23
                                }

                                return (
                                    <Image key={index} style={[styles.optionImage, { width: width, height: height }]} resizeMode={'contain'} source={{ uri: url }} />
                                )
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