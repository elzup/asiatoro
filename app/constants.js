// @flow

export const ActionTypes = {
	SET_ACCESS_POINTS: "asiatoro/app/SET_ACCESS_POINTS",
	LOAD_ACCESS_POINTS: "asiatoro/app/LOAD_ACCESS_POINTS",
	LOAD_FOLLOW_ACCESS_POINTS: "asiatoro/app/LOAD_FOLLOW_ACCESS_POINTS",
	LOAD_FOLLOW_ACCESS_POINTS_END: "asiatoro/app/LOAD_FOLLOW_ACCESS_POINTS_END",
	SET_USER: "asiatoro/app/SET_USER",
	UPDATE_USER: "asiatoro/app/UPDATE_USER",
	LOAD_USER: "asiatoro/app/LOAD_USER",
	CREATE_USER: "asiatoro/app/CREATE_USER",
	SET_ERROR: "asiatoro/app/SET_ERROR",
	POST_FOLLOW: "asiatoro/app/POST_FOLLOW",
	TOGGLE_FOLLOW: "asiatoro/app/TOGGLE_FOLLOW",
	POST_CHECKIN: "asiatoro/app/POST_CHECKIN",
}

export const ErrorTypes = {
	USER_NAME_DUPLICATE: "asiatoro/app/USER_NAME_DUPLICATE",
	REQUEST_TIMEOUT: "asiatoro/app/REQUEST_TIMEOUT",
}
