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

export default class Option extends React.Component {

    constructor(props) {
        super(props);
    }

    _select(option) {
        const that = this
        that.props.select(option);
    }

    _afterSelectText() {

        const that = this

        if (that.props.isSelected && that.props.selection == that.props.answer) {
            return {color: "#FF5B29"}
        }
        if (that.props.isSelected && that.props.selection != that.props.answer) {
            return {color: "#FF5B29", textDecorationLine:'line-through'}
        }

        return null
    }

    _afterSelectBackgroundView() {

        const that = this
        
        if (that.props.isSelected && that.props.selection == that.props.answer) {
            return styles.background
        }
        return null
    }

    _renderOptionView(str) {
        
        const { iconURLSource, selection, isSelected, selectedURLSource, selectedOption } = this.props

        let filterStr = str.replace(/<\/br>/g, "\n\n").replace(/<br\/>/g, "\n\n")
        filterStr = filterStr.replace(/<p style=\"display: inline;\">/g, "").replace(/<\/p>/g, "")
        filterStr = filterStr.replace(/<p class=\"item-p\">/g, "")

        let re = /.\/(.*)files/g;
        let results = re.exec(filterStr);
        let img="";
        if(results) {
            img = results[0].replace("./", "")     
            filterStr = filterStr.replace(img, key[img])
        }

        let imageTagRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
        let splits = filterStr.split(imageTagRegex)

        if (selection == selectedOption) {
            return (
                <View style={[styles.answerItem, this._afterSelectBackgroundView()]} >
                <Image
                    style={styles.icon}
                    source={isSelected ? selectedURLSource : iconURLSource}
                />
               
                <View style={styles.detailOptionView}>
                    {
                        splits.map ((content, index) => {
                            if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
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
                                    <Image key={index} style={[styles.optionImage, {width: width, height: height}]} resizeMode={'contain'}  source={{uri: url}} />
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
            
        } else {

            return (
                <View style={[styles.answerItem]} >
                    <Image
                        style={styles.icon}
                        source={iconURLSource}
                    />
                    <View style={styles.detailOptionView}>
                        {
                            splits.map ((content, index) => {
                                if (content.search(/.\/(.*)png/g) >= 0 || content.search(/.\/(.*)jpg/g) >= 0) {
                                    const url = content.replace("./", "http://www.samso.cn/images/")
                                    let expr = /\/(.*)_(.*)x(.*)_/;
                                    let size = url.match(expr)
                                    console.log(size)
                                    console.log(window.width)
                                    const scale = 0.3
                                    let width = size[2] * scale
                                    let height = size[3] * scale

                                    if (size[1].search("formula")) {
                                        width = size[2] * (23 / size[3])                                    
                                        height = 23
                                    }
                                    
                                    return (
                                        <Image key={index} style={[styles.optionImage, {width: width, height: height}]} resizeMode={'contain'}  source={{uri: url}} />
                                    )
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

    static propTypes = {
        option_Text: PropTypes.string,
        select: PropTypes.func,
        iconURLSource: PropTypes.number,
        selectedURLSource: PropTypes.number,
        selection: PropTypes.string,
        isSelected: PropTypes.bool,
        answer: PropTypes.string,
        selectedOption: PropTypes.string,
    }

    render() {
        const { option_Text, selection, isSelected } = this.props
        return (
            <TouchableOpacity disabled={isSelected} onPress={() =>
                this._select(selection)
            }>
                { this._renderOptionView(option_Text) }
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