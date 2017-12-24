import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import key from "../../service/path"

export default class Analysis extends React.Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        detail: PropTypes.object,
        isSelected: PropTypes.bool,
        selectedOption: PropTypes.string
    }

    _handleImageURL(content) {
        /// 获取 "/2016年上海《行测》真题（B类） - 腰果公考_files/normal_610x328_a0d18f5c4d9ceac41b845efc3b73876a.png"
        var re2 = /\/.*?\.(?:png|jpg)/gm;
        let suffixUrl = re2.exec(content)
        let sufUrl = suffixUrl[0]

        // 获取"/952428d694d9f518/normal_764x574_f7cd44964754b57.png"
        var re = /\/(.*)files/g;
        var results = re.exec(sufUrl);
        let suffix = null
        if (results) {
            let img = results[0].replace("/", "", )
            if (key[img] != null) {
                suffix = sufUrl.replace(img, key[img])
            } else {
                suffix = sufUrl
            }
        }
        return "http://118.89.196.123/images" + suffix
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

        return (
            <View>
                {
                    splits.map ((content, index) => {
                        if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
                            
                            const url = this._handleImageURL(content)
                            let expr = /_(.*)x(.*)_/;
                            let size = url.match(expr)
                            let scale = (window.width - 60) / size[1]
                            let height = size[2] * scale
                            return (
                                <Image key={index} style={[styles.analysisImage, {height:height}]} resizeMode={'contain'}  source={{uri: url}} />
                            )
                        } else {
                            return (
                                <Text key={index} style={styles.analysis}>{content}</Text>
                            )
                        }
                    })
                }
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.separotar}></View>
                <Text style={styles.titleText}>查看本题解析</Text>
                { this._renderAnalysisFormated() }
            </View>
        )
    }
}

var styles = StyleSheet.create ({

    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separotar: {
        marginTop:16,
        height: 0.5,
        backgroundColor: "#979797",
        width: "60%",
    },
    titleText: {
        marginTop:6,
        fontSize:15,
        color:"#FF5B29",
        lineHeight:20,
    },
    analysis: {
        marginTop:35,
        marginRight: 44,
        marginLeft: 44,
        marginBottom: 44,
        fontSize:16,
        lineHeight: 20,
    },
    analysisImage: {  
        width: '100%',
        height: '100%',
    },
})
