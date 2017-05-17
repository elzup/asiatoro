// @flow

import React, { Component } from "react"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { Provider } from "react-redux"

import AppContainer from "./containers/AppContainer"
import reducer from "./reducer"
import sagas from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

export default class Index extends Component {
	render() {
		return (
			<Provider store={store}>
				<AppContainer />
			</Provider>
		)
	}
}
