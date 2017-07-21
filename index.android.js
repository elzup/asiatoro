// @flow

import React, { Component } from "react"
import { AppRegistry, View, StatusBar } from "react-native"
import Index from "./app/index"

class Asiatoro extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={"#304FFE"} barStyle="light-content" />
        <Index />
      </View>
    )
  }
}

AppRegistry.registerComponent("asiatoro", () => Asiatoro)
