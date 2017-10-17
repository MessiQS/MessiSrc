
import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    SectionList,
    ListItem,
} from 'react-native';
import ExpanableList from 'react-native-expandable-section-flatlist';

export default class CollapseListView extends React.PureComponent {

    _renderRow = (rowItem, rowId, sectionId) => <Text>{rowItem.title}</Text>;
    _renderSection = (section, sectionId)  => <Text>{section}</Text>;
  
    render() {
        const MockData = [
            {
                header: 'sectionHeader',
                member: [
                    {
                        title: 'memberTitle',
                        content: 'content',
                    },
                ]
            },
        ]
      return (
        <ExpanableList
          dataSource={MockData}
          headerKey="header"
          memberKey="member"
          renderRow={this._renderRow}
          renderSectionHeaderX={this._renderSection}
          openOptions={[1,2,]}
        />
      );
    }
}