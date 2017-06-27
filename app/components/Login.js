// @flow

import React from "react"
import { BackHandler, View } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"

import { UserRecord } from "../types"
import { ErrorTypes } from "../constants"
const {
	Form,
	Content,
	Input,
	Button,
	Label,
	Text,
	Item,
	Icon,
} = require("native-base")

type State = {
	name: string
}

export class Login extends React.Component {
	props: {
		user: UserRecord,
		error: string,
		loadingUser: boolean,
		setUser: (user: UserRecord) => {},
		setError: (error: string) => {},
		createUser: (name: string) => {}
	}
	state: State = {
		name: "",
	}

	static navigationOptions = {
		title: "ユーザー登録",
		headerLeft: null,
	}

	handleBackPress = () => {
		console.log("back press")
	}

	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
	}

	componentWillReceiveProps(props) {
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
		return (
			<Content style={{ padding: 5 }}>
				{this.renderRegisterForm()}
				<Spinner
					visible={this.props.loadingUser}
					textContent={"Loading..."}
					textStyle={{ color: "#FFF" }}
				/>
			</Content>
		)
	}
}
