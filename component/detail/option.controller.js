import { webURL, imageWebURL } from "../../service/constant"
import { Dimensions } from 'react-native';

function changeEm(str) {
    if (str.indexOf("em") >= 0) {
        str = str.replace("em", "")
        return Number(str) * 20
    }
    if (str.indexOf('auto') >= 0) {
        return 'auto'
    }
    return str
}
export default class OptionController {
    //获取url
    static _handleImageURL(content) {
        var re2 = /\/.*?\.(?:png|jpg)/gm;
        let suffixUrl = re2.exec(content)
        return imageWebURL + suffixUrl
    }

    //获取属性中的wdith 和 height
    static getAttr(str) {
        let widthReg = /width=[\'\"]?([^\'\"]*)[\'\"]?/i,
            heightReg = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let widthStr = str.match(widthReg),
            heightStr = str.match(heightReg);
        let obj = {}
        if (!!widthStr) {
            obj['width'] = changeEm(widthStr[1])

        }
        if (!!heightStr) {
            obj['height'] = changeEm(heightStr[1])

        }
        return obj

    }

    //获取style 属性
    static getStyle = (str) => {
        let styleReg = /style=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let styleStr = str.match(styleReg);
        let obj = {}
        if (!!styleStr) {
            //可能在style里
            let styleArr = styleStr[1].split(';')
            styleArr.forEach(res => {
                let arr = ([], res.split(':'))
                if (arr[0].indexOf('width') >= 0) {
                    obj['width'] = changeEm(arr[1])

                }
                if (arr[0].indexOf('height') >= 0) {
                    obj['height'] = changeEm(arr[1])

                }
            })
        }
        return obj
    }

    static setStyle(attr, style, size, scale) {
        let obj = {}
        obj.height = attr['height'] || style['height'] || size[3] * scale

        if (attr['width'] === 'auto' || style['width'] === 'auto') {
            obj.width = obj.height / size[3] * size[2]
            return obj
        }
        obj.width = attr['width'] || style['width'] || size[2] * scale
        return obj
    }

    static setStyleForAnalysis({ width, height }) {
        const window = Dimensions.get('window');
        let returnWidth = width,
            returnHeight = height;

        if (width > (window.width - 60)) {
            returnWidth = window.width - 60
            returnHeight = returnWidth / width * height
        }

        return {
            width: returnWidth,
            height: returnHeight
        }
    }
}