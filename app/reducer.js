// @flow

import { fromJS, toJS } from 'immutable'
import types from './constants';

const initialState = fromJS({
	todos: [],
	accessPoints: false,
	displayType: 'all',
});

export default function (state = initialState, action) {
	switch (action.type) {
		case 'ADD_TODO':
			return state.update('todos', todos => todos.concat({ text: action.payload, completed: false }));
		case 'REMOVE_TODO':
			return state.update('todos', todos => [...todos.slice(0, action.index), ...todos.slice(action.index + 1)]);
		case 'TOGGLE_TODO':
			return state.update('todos', todos => {
				return todos.map((todo, index) => {
					if (index === action.index) {
						return {
							...todo,
							completed: !todo.completed,
						};
					}
					return todo;
				}),
			};
		case 'SET_VISIBILITY_FILTER':
			return {
				...state, displayType: action.displayType,
			};
		default:
	}
	return state;
}