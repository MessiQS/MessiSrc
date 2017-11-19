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
            return {color: "#FFA200"}
        }
        if (that.props.isSelected && that.props.selection != that.props.answer) {
            return {color: "#FFA200", textDecorationLine:'line-through'}
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
            console.log("filterStr " + filterStr)            
            filterStr = filterStr.replace(img, key[img])
            console.log("filterStr " + filterStr)
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
                                let expr = /_(.*)x(.*)_/;
                                let size = url.match(expr)
                                let scale = window.width / size[1]
                                let height = size[2] * scale                       
                                return (
                                    <Image key={index} style={[styles.optionImage, {height:height}]} resizeMode={'contain'}  source={{uri: url}} />
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
                                let expr = /_(.*)x(.*)_/;
                                let size = url.match(expr)
                                let scale = (window.width - 80) / size[1]
                                let height = size[2] * scale
                                return (
                                    <Image key={index} style={[styles.optionImage, {height:height}]} resizeMode={'contain'}  source={{uri: url}} />
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
    },
    background: {
        backgroundColor: "#D8D8D8"
    },
    optionImage: {  
        width: '100%',
        height: '100%',
    },
})