/* @flow */
import Expo from 'expo';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

// import { Deck, Card } from './src/components';
import Deck from './src/components/Deck';
import Card from './src/components/Card';

class App extends Component {
  renderCard = item => {
    return <Card item={item} />
  }

  render() {
    const collection = [
      {
        title: 'Test',
        id: 1,
        img: 'http://aboutcolonblank.com/wp-content/uploads/2012/07/nyan-cat.png'
      },
      {
        title: 'Test2',
        id: 2,
        img: 'http://aboutcolonblank.com/wp-content/uploads/2012/07/nyan-cat.png'
      }
    ];

    return (
      <Deck
        data={collection}
        renderCard={this.renderCard} />
    );
  }
}

Expo.registerRootComponent(App);
