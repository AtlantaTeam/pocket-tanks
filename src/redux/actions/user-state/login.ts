import type { Action } from '..';

export type LoginRequestedAction = Action<typeof LOGIN_REQUESTED>;
export type LoginFulfilledAction = Action<typeof LOGIN_FULFILLED>;
export type LoginFailedAction = Action<typeof LOGIN_FAILED>;

export type LoginAction =
    | LoginRequestedAction
    | LoginFulfilledAction
    | LoginFailedAction;

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginRequested = () => ({
    type: LOGIN_REQUESTED,
} as LoginRequestedAction);

export const loginFulfilled = () => ({
    type: LOGIN_FULFILLED,
} as LoginFulfilledAction);

export const loginFailed = () => ({
    type: LOGIN_FAILED,
} as LoginFailedAction);
