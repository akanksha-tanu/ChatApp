import React, { Component } from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={
            require('./image/logo.png')
          }
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginLeft: 15,
          }}
        />
      </View>
    );
  }
}