import type { EmptyRequest, EmptyResponse, ErrorResponse } from '../../../api/types';
import type { Action } from '..';

export type LogoutRequestedAction = Action<typeof LOGOUT_REQUESTED, EmptyRequest>;
export type LogoutFulfilledAction = Action<typeof LOGOUT_FULFILLED, EmptyResponse>;
export type LogoutFailedAction = Action<typeof LOGOUT_FAILED, ErrorResponse>;

export type LogoutAction =
    | LogoutRequestedAction
    | LogoutFulfilledAction
    | LogoutFailedAction;

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const logoutRequested = () => ({
    type: LOGOUT_REQUESTED,
} as LogoutRequestedAction);

export const logoutFulfilled = () => ({
    type: LOGOUT_FULFILLED,
} as LogoutFulfilledAction);

export const logoutFailed = (payload: ErrorResponse) => ({
    type: LOGOUT_FAILED,
    payload,
} as LogoutFailedAction);
