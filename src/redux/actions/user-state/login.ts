import type { EmptyResponse, ErrorResponse } from '../../../api/types';
import type { Action } from '..';

export type LoginRequestedAction = Action<typeof LOGIN_REQUESTED, FormData>;
export type LoginFulfilledAction = Action<typeof LOGIN_FULFILLED, EmptyResponse>;
export type LoginFailedAction = Action<typeof LOGIN_FAILED, ErrorResponse>;

export type LoginAction =
    | LoginRequestedAction
    | LoginFulfilledAction
    | LoginFailedAction;

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginRequested = (payload: FormData) => ({
    type: LOGIN_REQUESTED,
    payload,
} as LoginRequestedAction);

export const loginFulfilled = () => ({
    type: LOGIN_FULFILLED,
} as LoginFulfilledAction);

export const loginFailed = (payload: ErrorResponse) => ({
    type: LOGIN_FAILED,
    payload,
} as LoginFailedAction);
