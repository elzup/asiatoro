// @flow

import React from "react"
import { Form, Content, Input, Item, Button } from "native-base"
import { Text } from "react-native"
import { UserRecord } from "../types"
import { ErrorType } from "../constants"
// ErrorType.USER_NAME_DUPLICATE

type Props = {
	user: UserRecord,
	userRegisterError: string,
	setUser: (user: UserRecord) => {},
	createUser: (name: string) => {}
}

type State = {
	name: string
}

export default class AccessPointList extends React.Component {
	props: Props
	state: State = {
		name: "",
	}

	componentDidMount() {}

	componentWillReceiveProps(props) {
		const { id, token } = props.user
		this.setState({ id, token })
	}

	renderRegistered() {
		const { user } = this.props
		if (!user.isRegistered()) {
			return null
		}
		return <Text>Registered: {user.name}</Text>
	}

	renderRegisterForm() {
		const { user } = this.props
		if (user.isRegistered()) {
			return null
		}
		return (
			<View>
				<Form>
					<Item>
						<Input
							placeholder="yourname"
							value={this.state.name}
							onChangeText={name => this.setState({ name })}
						/>
					</Item>
				</Form>
				<Button
					success
					block
					onPress={() => {
						this.props.createUser(this.state.name)
					}}
				>
					<Text>設定</Text>
				</Button>
			</View>
		)
	}

	render() {
		return (
			<Content>
				{this.renderRegistered()}
				{this.renderRegisterForm()}
			</Content>
		)
	}
}
