import type { EmptyResponse, ErrorResponse } from '../../../api/types';
import type { Action } from '..';

export type ChangePasswordRequestedAction = Action<typeof CHANGE_PASSWORD_REQUESTED, FormData>;
export type ChangePasswordFulfilledAction = Action<typeof CHANGE_PASSWORD_FULFILLED, EmptyResponse>;
export type ChangePasswordFailedAction = Action<typeof CHANGE_PASSWORD_FAILED, ErrorResponse>;

export type ChangePasswordAction =
    | ChangePasswordRequestedAction
    | ChangePasswordFulfilledAction
    | ChangePasswordFailedAction;

export const CHANGE_PASSWORD_REQUESTED = 'CHANGE_PASSWORD_REQUESTED';
export const CHANGE_PASSWORD_FULFILLED = 'CHANGE_PASSWORD_FULFILLED';
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED';

export const changePasswordRequested = (payload: FormData) => ({
    type: CHANGE_PASSWORD_REQUESTED,
    payload,
} as ChangePasswordRequestedAction);

export const changePasswordFulfilled = () => ({
    type: CHANGE_PASSWORD_FULFILLED,
} as ChangePasswordFulfilledAction);

export const changePasswordFailed = (payload: ErrorResponse) => ({
    type: CHANGE_PASSWORD_FAILED,
    payload,
} as ChangePasswordFailedAction);
