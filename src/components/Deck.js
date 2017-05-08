/* @flow */
import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  View,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {}
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  forceSwipe = (direction = 'left') => {
    const directions = {
      'left': -SCREEN_WIDTH,
      'right': SCREEN_WIDTH
    };

    Animated.timing(this.state.position, {
      toValue: { x: directions[direction], y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete = (direction = 'left') => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;

    const directions = {
      'left': onSwipeLeft,
      'right': onSwipeRight
    };

    const item = data[this.state.index];

    directions[direction](item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...this.state.panResponder.panHandlers}>
              {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item.id}
          style={[styles.cardStyle, { top: 10 * (index - this.state.index), zIndex: 5 }]}>
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

export default Deck;
