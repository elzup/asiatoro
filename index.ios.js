// @flow

import React, { Component } from "react"
import { AppRegistry } from "react-native"
import Index from "./app/index"

class Asiatoro extends Component {
  render() {
    return <Index />
  }
}

AppRegistry.registerComponent("asiatoro", () => Asiatoro)
