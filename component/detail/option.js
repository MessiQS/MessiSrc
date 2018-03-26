import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { webURL, imageWebURL } from "../../service/constant"
import OptionController from './option.controller'
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
            return styles.background
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
        const scale = 0.3

        const renderContent = () => {
            //没有图片
            if (splits.length === 1 && str.indexOf('img') < 0) {
                return <Text style={[styles.detailOptionText, this._afterSelectText()]}>{str}</Text>
            }
            //单图情况
            if (splits.length === 1 && str.indexOf('img') >= 0 || splits.length === 2 && !splits[0].trim()) {
                let trueStr = splits.length === 1 && str.indexOf('img') >= 0 ? splits[0] : splits[1]
                let url = OptionController._handleImageURL(trueStr)
                let styleObj = OptionController.getStyle(str)
                let attrObj = OptionController.getAttr(str)
                let expr = /\/(.*)_(.*)x(.*)_/;
                let size = url.match(expr)
                if (Array.isArray(size) && size.length !== 0) {

                    let { width, height } = OptionController.setStyle(attrObj, styleObj, size, scale)
                    return (<Image style={[styles.optionImage, { width, height }]} resizeMode={'contain'} source={{ uri: url }} />)
                }
                return (<Image style={[styles.optionImage]} resizeMode={'contain'} source={{ uri: url }} />)
            }
            //文字与图嵌套
            let optionArray = [],
                count = 0;
                
            splits.forEach((result, index) => {
                if (result.indexOf('/>') >= 0) {
                    let imgArr = result.split('/>')
                    if (!!imgArr[1]) {
                        optionArray[index] = imgArr
                    } else {
                        splits[index] = imgArr[0]
                    }
                }
            })
            optionArray.forEach((result, index) => {
                splits.splice(index, 1 + count, ...result)
                count++
            })

            return splits.map((content, index) => {
                if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
                    let url = OptionController._handleImageURL(content)

                    let styleObj = OptionController.getStyle(content)
                    let attrObj = OptionController.getAttr(content)

                    let expr = /\/(.*)_(.*)x(.*)_/;
                    let size = url.match(expr)

                    // let { width, height } = OptionController.setStyle(attrObj, styleObj, size, scale)

                    // return (
                    //     <Image key={index} style={[styles.optionImage, { width, height }]} resizeMode={'contain'} source={{ uri: url }} />
                    // )

                    if (Array.isArray(size) && size.length !== 0) {

                        let { width, height } = OptionController.setStyle(attrObj, styleObj, size, scale)
                        return (<Image key={index}  style={[styles.optionImage, { width, height }]} resizeMode={'contain'} source={{ uri: url }} />)
                    }
                    return (<Image key={index}  style={[styles.optionImage]} resizeMode={'contain'} source={{ uri: url }} />)


                } else {
                    return (
                        <Text key={index} style={[styles.detailOptionText, this._afterSelectText()]}>{content}</Text>
                    )
                }
            })
        }
        return (
            <View style={[styles.answerItem, this._afterSelectBackgroundView()]} >
                <Image
                    resizeMode={'contain'}
                    style={styles.icon}
                    source={this._selectIcon()}
                />
                <View style={styles.detailOptionView}>
                    {renderContent()}
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
        marginRight: 10,
        marginLeft: 10,
        width: 23,
        height: '100%',
    },
    answerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 19,
        paddingRight: 29,
        paddingTop: 10,
        paddingBottom: 10,
    },
    detailOptionView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    detailOptionText: {
        lineHeight: 25,
        fontSize: 18,
        color: "#172434",
    },
    background: {
        backgroundColor: "rgba(216, 216, 216, .3)"
    },
    optionImage: {
        marginTop: -10,
    },
})