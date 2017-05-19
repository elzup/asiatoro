// @flow

import React from "react"
import { Form, Content, Input, Item, Button } from "native-base"
import { Text } from "react-native"
import { UserRecord } from "../types"

type Props = {
	user: UserRecord,
	setUser: Function
}

type State = {
	id: number,
	token: string
}

export default class AccessPointList extends React.Component {
	props: Props
	state: State = {
		id: 0,
		token: "",
	}

	render() {
		return (
			<Content>
				<Form>
					<Item>
						<Input
							placeholder="ID"
							value={this.state.id.toString()}
							onChangeText={id => this.setState({ id: parseInt(id) || 1 })}
						/>
					</Item>
					<Item last>
						<Input
							placeholder="Token"
							value={this.state.token}
							onChangeText={token => this.setState({ token })}
						/>
					</Item>
				</Form>
				<Button
					success
					block
					onPress={() => {
						this.props.setUser(
							new UserRecord({
								id: this.state.id,
								name: "elzup",
								token: this.state.token,
							})
						)
					}}
				>
					<Text>設定</Text>
				</Button>
			</Content>
		)
	}
}
