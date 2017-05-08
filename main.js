/* @flow */
import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder } from 'react-native';
import { Card } from 'react-native-elements';

class App extends Component {
  constructor(props) {
    super(props);

    this.panResponser = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
      },
      onPanResponderRelease: () => {}
    });
  }

  render() {
    const collection = [{
      title: 'Test',
      id: 1,
      img: 'http://aboutcolonblank.com/wp-content/uploads/2012/07/nyan-cat.png'
    }];

    return (
      <View style={styles.container} {...this.panResponser.panHandlers}>
        {collection.map(item => {
          return (
            <Card
              key={item.id}
              image={{ uri: item.img }}
              title={item.title}>
              <Text>Open up main.js to start working on your app!</Text>
            </Card>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

Expo.registerRootComponent(App);
