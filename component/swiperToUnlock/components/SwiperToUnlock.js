import React, { Component } from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import injectJS from './injectJS'
export default class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.option !== this.props.option) {
            this.refs.canvas.reload();
        }
    }

    render() {
        return (
            <View style={{ flex: 1, height: 400 ,backgroundColor:'red'}}>
                <WebView
                    ref="canvas"
                    scrollEnabled={false}
                    injectedJavaScript={injectJS(this.props)}
                    style={{
                        width: 500,
                        // height: 400,
                    }}
                    source={require('./tpl.html')}
                />
            </View>
        );
    }
}
