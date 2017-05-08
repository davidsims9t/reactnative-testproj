/* @flow */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

export default class extends Component {
  render() {
    const { item } = this.props;

    return (
      <Card
        key={item.id}
        image={{ uri: item.img }}
        title={item.title}>
        <Text>{item.title}</Text>
      </Card>
    );
  }
}
