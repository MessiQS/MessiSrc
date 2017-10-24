import React, { Component } from 'react';
import {
    List,
    ListItem,
    Right,
    Button
} from 'native-base';
import styles, { nativeStyle } from './messageCss';

export default class RepeatItem extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = props;
        this.renderHtml = '';
        if (!Array.isArray(props.model)) {
            props.model = [];
        }
        console.log(props);
    };

    render() {
        return (
            <List>
                {this.props.model.map(value => {
                    return <ListItem
                        button
                        style={nativeStyle.listItem}
                        key={value.key}
                    >
                        <Body>
                            <Text style={styles.text}>{value.name} {value.haveRead}/{value.number}</Text>
                        </Body>
                        <Right>
                            <Button bordered danger small
                                style={nativeStyle.button}
                                onPress={() => { value.call(value) }}>
                                <Text style={styles.buttonText}>购买</Text>
                            </Button>
                            {/* <Text style={styles.tips}>app内购买</Text> */}
                        </Right>
                    </ListItem>
                })}
            </List>
        )
    }
}