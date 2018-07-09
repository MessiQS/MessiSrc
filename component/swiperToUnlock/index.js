import React, { Component } from 'react';
import SwiperToUnlock from './components/SwiperToUnlock'
import Container from './components/Container'

export default class App extends Component {
    render() {
        return (
            <Container>
                <SwiperToUnlock {...this.props} />
            </Container>
        );
    }
}
