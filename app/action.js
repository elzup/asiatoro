// @flow

import types from './constants'

export function addTodo(payload) {
	return {
		type: 'ADD_TODO',
		payload,
	};
}

export function toggleTodo(index) {
	return {
		type: 'TOGGLE_TODO',
		index,
	};
}

export function removeTodo(index) {
	return {
		type: 'REMOVE_TODO',
		index,
	};
}

export function setVisibilityFilter(displayType) {
	return {
		type: 'SET_VISIBILITY_FILTER',
		displayType,
	};
}

export function setAccessPoints(accessPoints) {
	return {
		type: types.SET_ACCESS_POINTS,
		accessPoints,
	};
}
