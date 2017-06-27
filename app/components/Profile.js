// @flow

import React from "react"

import { UserRecord } from "../types"
import { Content, Text, Spinner } from "native-base"

type State = {
	name: string
}

export class Profile extends React.Component {
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

	componentDidMount() {}

	componentWillReceiveProps(props) {
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
		return (
			<Content style={{ padding: 5 }}>
				<Text>Registered: {this.props.user.name}</Text>
			</Content>
		)
	}
}
