import React, { Component } from 'react';
import { WebView, View, StyleSheet, Text } from 'react-native';
import injectJS from './injectJS'
export default class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.option !== this.props.option) {
            this.refs.canvas.reload();
        }
    }

    onMessage = (e) => {
        console.log(e.nativeEvent.data)
    }

    render() {
        return (
            <View style={{ flex: 1, height: this.props.height || 400 }}>
                <WebView
                    ref="canvas"
                    scrollEnabled={false}
                    injectedJavaScript={injectJS(this.props)}
                    style={{
                        width: this.props.width,
                        height: this.props.height || 400,
                    }}
                    // javaScriptEnabled={true}
                    source={require('./unlock.html')}
                    onMessage={this.onMessage}
                />
            </View>
        );
    }
}
