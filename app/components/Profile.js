// @flow

import React from "react"
import {
	Form,
	Content,
	Input,
	Button,
	Label,
	Text,
	Item,
	Icon,
} from "native-base"
import { View } from "react-native"
import { UserRecord } from "../types"
import { ErrorTypes } from "../constants"

type Props = {
	user: UserRecord,
	error: string,
	setUser: (user: UserRecord) => {},
	setError: (error: string) => {},
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
		debugger
		return (
			<View>
				<Form>
					<Item
						style={{ marginBottom: 10 }}
						error={this.props.error === ErrorTypes.USER_NAME_DUPLICATE}
					>
						<Label>ユーザ名</Label>
						<Input
							error
							placeholder="yourname"
							value={this.state.name}
							onChangeText={name => {
								this.setState({ name })
								if (this.props.error === ErrorTypes.USER_NAME_DUPLICATE) {
									this.setError(false)
								}
							}}
						/>
						<Icon
							name="close-circle"
							onPress={() => {
								this.setState({ name: "" })
								if (this.props.error === ErrorTypes.USER_NAME_DUPLICATE) {
									this.setError(false)
								}
							}}
						/>
					</Item>
				</Form>
				<Button
					block
					primary
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
			<Content style={{ padding: 5 }}>
				{this.renderRegistered()}
				{this.renderRegisterForm()}
			</Content>
		)
	}
}
