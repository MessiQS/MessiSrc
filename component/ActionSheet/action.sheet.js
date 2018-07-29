import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Animated,
  Modal,
  Easing
} from 'react-native';
import { styles } from "./action.sheet.styles"
import Item from "./action.item"
import PropTypes from 'prop-types';

export default class ActionSheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeInOpacity: 0.3,
    }
  }

  static propTypes = {
    visible: PropTypes.bool,
    params: PropTypes.object,
    cancelHandler: PropTypes.func,
  }

  showAnimation = () => {
    console.log("showAnimation")
    const that = this
  }

  hideAnimation = () => {
    console.log("hideAnimation")
  }

  render() {
    const that = this
    const { params, visible, cancelHandler } = this.props
    var cancel = "取消"
    if (params.cancel !== null && typeof params.cancel !== 'undefined') {
      cancel = params.cancel
    }
    return (
      <Modal visible={visible}
        transparent={true}
        animationType="fade" >
        <TouchableHighlight style={styles.maskBackground} onPress={() => {
          console.log("touchWildToHide", params.touchWildToHide)
          if (params.touchWildToHide) {
            cancelHandler()
          }
        }} >
          <View />
        </TouchableHighlight>
        <View style={styles.titleView}>
          <Text style={styles.title}>{params.title}</Text>
        </View>
        {
          params.items.map((result, index) => (
            that.renderItem(result, index)
          ))
        }
        <View>
          <TouchableHighlight
            style={styles.cancel}
            onPressOut={() => { cancelHandler() }}
            underlayColor="#EFEDE7"
          >
            <Text style={styles.cancelText}>{cancel}</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    )
  }

  renderItem(result, index) {
    return (
      <Item
        key={index}
        text={result.text}
        type={result.type}
        handler={result.handler}
        index={index}
        hideAnimation={this.hideAnimation.bind(this)} />
    )
  }
}


