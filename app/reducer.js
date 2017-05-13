// @flow

const initialState = {
	todos: [],
	displayType: 'all',
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...state,
				todos: [...state.todos, { text: action.payload, completed: false }],
			};
		case 'REMOVE_TODO':
			return {
				...state,
				todos: [...state.todos.slice(0, action.index), ...state.todos.slice(action.index + 1)],
			};
		case 'TOGGLE_TODO':
			return {
				...state,
				todos: state.todos.map((todo, index) => {
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