import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { styles } from "./action.item.styles"
import PropTypes from 'prop-types';

export default class ActionItem extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    handler: PropTypes.func,
    hideAnimation: PropTypes.func,
    index: PropTypes.number,
  }

  render() {
    const that = this
    const { text, type, handler, hideAnimation } = this.props
    console.log("text, type, handler", text, type, handler)
    var color = "#333333"
    if (type == "HightLight") {
      color = "#E76153"
    }
    if (type == "Disabled") {
      color = "#CCCCCC"
    }
    return (
      <TouchableHighlight style={styles.item} onPressOut={() => {
        hideAnimation()
        handler(that.props.index)
      }} underlayColor="#EFEDE7">
        <Text style={[{ color }, styles.text]}>{text}</Text>
      </TouchableHighlight>
    )
  }
}