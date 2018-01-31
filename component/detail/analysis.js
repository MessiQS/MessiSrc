import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import { webURL, imageWebURL } from "../../service/constant"
import OptionController from './option.controller'

export default class Analysis extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        detail: PropTypes.object,
    }

    _handleImageURL(content) {

        var re2 = /\/.*?\.(?:png|jpg)/gm;
        let suffixUrl = re2.exec(content)
        let sufUrl = suffixUrl[0]

        return imageWebURL + sufUrl
    }

    _filterTag(str) {

        let filterStr = str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
        filterStr = filterStr.replace(/<p style=\"display: inline;\">/g, "").replace(/<\/p>/g, "")
        filterStr = filterStr.replace(/<p class=\"item-p\">/g, "")
        filterStr = filterStr.replace(/<span style=\"color: #46a546;\">  ( 不定项选择 ) <\/span> /g, "")
        filterStr = filterStr.replace(/<span style=\"color: #46a546;\"> ( 不定项选择 ) <\/span> /g, "")
        if (filterStr[0] == " ") {
            filterStr = filterStr.replace(" ", "")
        }
        return filterStr
    }

    _renderAnalysisFormated() {

        const { analysis } = this.props.detail;
        let filterStr = this._filterTag(analysis)
        let regex = /<img/g
        let splits = filterStr.split(regex)
        const scale = 0.3

        const _afterSelectText = () => {

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
        const renderContent = () => {
            //没有图片
            if (splits.length === 1 && filterStr.indexOf('img') < 0) {
                return <Text style={[styles.analysis, _afterSelectText()]}>{filterStr}</Text>
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
                    let styleFromCulti = OptionController.setStyle(attrObj, styleObj, size, scale)
                    const { width, height } = OptionController.setStyleForAnalysis(styleFromCulti)
                    return (
                        <Image key={index} style={[styles.analysisImageInline, { width, height }]} resizeMode={'contain'} source={{ uri: url }} />
                    )
                } else {
                    return (
                        <Text key={index} style={[styles.analysis, styles.analysisTextInline, _afterSelectText()]}>{content}</Text>
                    )
                }
            })
        }
        return (
            <View>
                {renderContent()}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.separotar}></View>
                <Text style={styles.titleText}>查看本题解析</Text>
                {this._renderAnalysisFormated()}
            </View>
        )
    }
}

var styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separotar: {
        marginTop: 16,
        height: 0.5,
        backgroundColor: "#979797",
        width: "60%",
    },
    titleText: {
        marginTop: 6,
        fontSize: 15,
        color: "#FF5B29",
        lineHeight: 20,
    },
    analysis: {
        marginTop: 35,
        marginRight: 44,
        marginLeft: 44,
        marginBottom: 84,
        fontSize: 16,
        lineHeight: 20,
    },
    analysisImageInline: {
        marginRight: 44,
        marginLeft: 44,
    },
    analysisTextInline: {
        marginBottom: 14,
    },
    analysisImage: {
        width: '100%',
        height: '100%',
    },
})
