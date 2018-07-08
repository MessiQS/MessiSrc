import React, { Component } from 'react';
import { View,Text } from 'react-native';
import styles from '../../style';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}
