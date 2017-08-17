// @flow

export const ActionTypes = {
  SET_ACCESS_POINTS: 'asiatoro/app/SET_ACCESS_POINTS',
  LOAD_ACCESS_POINTS: 'asiatoro/app/LOAD_ACCESS_POINTS',
  LOAD_FOLLOW_ACCESS_POINTS: 'asiatoro/app/LOAD_FOLLOW_ACCESS_POINTS',
  LOAD_FOLLOW_ACCESS_POINTS_END: 'asiatoro/app/LOAD_FOLLOW_ACCESS_POINTS_END',
  SET_USER: 'asiatoro/app/SET_USER',
  UPDATE_USER: 'asiatoro/app/UPDATE_USER',
  LOAD_USER: 'asiatoro/app/LOAD_USER',
  CREATE_USER: 'asiatoro/app/CREATE_USER',
  RENAME_USER: 'asiatoro/app/RENAME_USER',
  POST_FOLLOW: 'asiatoro/app/POST_FOLLOW',
  TOGGLE_FOLLOW: 'asiatoro/app/TOGGLE_FOLLOW',
  POST_CHECKIN: 'asiatoro/app/POST_CHECKIN',
  SET_ERROR: 'asiatoro/app/SET_ERROR',
  SET_NETWORK_ERROR: 'asiatoro/app/SET_NETWORK_ERROR',

  USER_LOGOUT: 'asiatoro/app/USER_LOGOUT',

  FCM_SETUP: 'asiatoro/app/FCM_SETUP',
  FCM_SET_TOKEN: 'asiatoro/app/FCM_SET_TOKEN',
  FCM_REMOVE: 'asiatoro/app/FCM_REMOVE',
}

export const ErrorTypes = {
  USER_NAME_DUPLICATE: 'asiatoro/app/USER_NAME_DUPLICATE',
  REQUEST_TIMEOUT: 'asiatoro/app/REQUEST_TIMEOUT',
}
