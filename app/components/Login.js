// @flow

import React from "react"
import { BackHandler, View } from "react-native"

import { UserRecord } from "../types"
import { ErrorTypes } from "../constants"

import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition"

import {
  Button,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Spinner,
  Text
} from "native-base"

type Props = {
  user: UserRecord,
  error: string,
  loadingUser: boolean,
  setUser: (user: UserRecord) => {},
  setError: (error: string | boolean) => {},
  createUser: (name: string) => {},
  navigation: NavigationScreenProp
}

type State = {
  name: string
}

export class Login extends React.Component {
  props: Props
  state: State = {
    name: ""
  }

  static navigationOptions = {
    title: "ユーザー登録",
    headerLeft: null
  }

  handleBackPress = () => {
    console.log("back press")
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
  }

  componentWillReceiveProps(props: Props) {
    const { name } = props.user
    if (props.user.isRegistered()) {
      this.props.navigation.goBack()
    }
    this.setState({ name })
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
  }

  renderRegisterForm() {
    const duplicateNameError =
      this.props.error === ErrorTypes.USER_NAME_DUPLICATE
    return (
      <View>
        <Form>
          <Text>ユーザ登録</Text>
          <Item style={{ marginBottom: 10 }} error={duplicateNameError}>
            <Label>ユーザ名</Label>
            <Input
              error
              placeholder="yourname"
              placeholderTextColor="#ccc"
              value={this.state.name}
              onChangeText={name => {
                this.setState({ name: name.toLowerCase() })
                if (this.props.error === ErrorTypes.USER_NAME_DUPLICATE) {
                  this.props.setError(false)
                }
              }}
            />
            <Icon name="close-circle" />
          </Item>
          <Text style={{ padding: 5 }}>
            {duplicateNameError && "ユーザ名が使われています。"}
          </Text>
        </Form>
        <Button
          block
          primary
          disabled={this.state.name === ""}
          onPress={() => {
            this.props.createUser(this.state.name)
          }}
        >
          <Text>確定</Text>
        </Button>
      </View>
    )
  }

  render() {
    if (this.props.loadingUser) {
      return <Spinner color="blue" />
    }
    return (
      <Content style={{ padding: 5 }}>
        {this.renderRegisterForm()}
      </Content>
    )
  }
}
