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

        const _handleImageURL = (content) => {

            var re2 = /\/.*?\.(?:png|jpg)/gm;
            let suffixUrl = re2.exec(content)

            return imageWebURL + suffixUrl
        }
        //获取属性中的wdith 和 height
        getAttr = (str) => {
            let widthReg = /width=[\'\"]?([^\'\"]*)[\'\"]?/i,
                heightReg = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
            let widthStr = str.match(widthReg),
                heightStr = str.match(heightReg);
            let obj = {}
            if(!!widthStr){
                obj['width'] = widthStr[1]
            }
            if(!!heightStr){
                obj['height'] = heightStr[1]
            }
            return obj

        }
        //获取style 属性
        const getStyle = (str) => {
            let styleReg = /style=[\'\"]?([^\'\"]*)[\'\"]?/i;
            let styleStr = str.match(styleReg);
            let obj = {}
            if (!!styleStr) {
                //可能在style里
                let styleArr = styleStr[1].split(';')
                styleArr.forEach(res => {
                    if (([], res.split(':'))[0].indexOf('width') >= 0) {
                        obj['width'] = ([], res.split(':'))[1]
                    }
                    if (([], res.split(':'))[0].indexOf('height') >= 0) {
                        obj['height'] = ([], res.split(':'))[1]
                    }
                })
            }
            return obj
        }
        const renderContent = () => {
            //单图情况
            if (splits.length === 2 && !splits[0]) {
                let url = _handleImageURL(splits[1])
                let styleObj = getStyle(str)
                let attrObj = getAttr(str)
                
                let width, height;

                let expr = /\/(.*)_(.*)x(.*)_/;
                let size = url.match(expr)
                const scale = 0.3
                width = attrObj.width || styleObj.width || size[2] * scale /// cannot read 2 TODO
                height = attrObj.height || styleObj.height || size[3] * scale
                return (<Image key={index} style={[styles.optionImage, { width: width, height: height }]} resizeMode={'contain'} source={{ uri: url }} />)
            }
            //文字与图嵌套
            return splits.map((content, index) => {
                if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {


                    let url = _handleImageURL(content)
                    let expr = /\/(.*)_(.*)x(.*)_/;
                    let size = url.match(expr)
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
        marginTop: 10,
    },
})