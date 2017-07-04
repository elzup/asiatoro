// @flow

import React from "react"

import type { UserRecord } from "../types"
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
} from "native-base"
import { ErrorTypes } from "../constants"
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition"

type State = {
	name: string
}

type Props = {
	user: UserRecord,
	error: string,
	loadingUser: boolean,
	renameUser: (name: string) => void,
	setError: (error: string | false) => void,
	navigation: NavigationScreenProp
}

export class Profile extends React.Component {
	props: Props
	state: State = {
		name: "",
	}

	componentDidMount() {}

	componentWillReceiveProps(props: Props) {
		const { name } = props.user
		this.setState({ name })
		if (!props.loadingUser && !props.user.isRegistered()) {
			// no Login
			this.props.navigation.navigate("LoginModal")
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
				<Text>
					ユーザ: {this.props.user.name}
				</Text>
				<Form>
					<Text>名前変更</Text>
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
						this.props.renameUser(this.state.name)
					}}
				>
					<Text>確定</Text>
				</Button>
			</Content>
		)
	}
}
