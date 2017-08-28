// @flow

import React from 'react'

import type { UserRecord } from '../types'
import {
  Content,
  Text,
  Spinner,
  Button,
  Input,
  Form,
  Item,
  Label,
  Icon,
  View,
  Grid,
  Row,
} from 'native-base'
import { ErrorTypes } from '../constants'
import type { NavigationScreenProp } from 'react-navigation/src/TypeDefinition'

type State = {
  name: string,
}

type Props = {
  user: UserRecord,
  error: string,
  loadingUser: boolean,
  renameUser: (name: string) => void,
  setError: (error: string | false) => void,
  navigation: NavigationScreenProp,
}

export class Profile extends React.Component {
  props: Props
  state: State = {
    name: '',
  }

  componentDidMount() {}

  componentWillReceiveProps(props: Props) {
    const { name } = props.user
    this.setState({ name })
    if (!props.loadingUser && !props.user.isRegistered()) {
      // no Login
      this.props.navigation.navigate('LoginModal')
    }
  }

  render() {
    if (this.props.loadingUser) {
      return <Spinner color="blue" />
    }
    const duplicateNameError =
      this.props.error === ErrorTypes.USER_NAME_DUPLICATE
    return (
      <Content style={{ padding: 5 }}>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            height: 200,
            alignItems: 'center',
          }}
        >
          <Icon active name="person" style={{ color: 'black', fontSize: 60 }} />
          <Text style={{ fontSize: 30 }}>
            {this.props.user.name}
          </Text>
        </View>
        <Form>
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
            <Icon
              name="close-circle"
              onPress={() => this.setState({ name: '' })}
            />
          </Item>
          <Text style={{ padding: 5 }}>
            {duplicateNameError && 'ユーザ名が使われています。'}
          </Text>
        </Form>
        <Button
          block
          primary
          disabled={this.state.name === ''}
          onPress={() => {
            this.props.renameUser(this.state.name)
          }}
        >
          <Text>変更</Text>
        </Button>
      </Content>
    )
  }
}
