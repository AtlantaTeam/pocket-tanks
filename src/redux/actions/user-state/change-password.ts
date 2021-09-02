import type { Action } from '..';

export type ChangePasswordRequestedAction = Action<typeof CHANGE_PASSWORD_REQUESTED>;
export type ChangePasswordFulfilledAction = Action<typeof CHANGE_PASSWORD_FULFILLED>;
export type ChangePasswordFailedAction = Action<typeof CHANGE_PASSWORD_FAILED>;

export type ChangePasswordAction =
    | ChangePasswordRequestedAction
    | ChangePasswordFulfilledAction
    | ChangePasswordFailedAction;

export const CHANGE_PASSWORD_REQUESTED = 'CHANGE_PASSWORD_REQUESTED';
export const CHANGE_PASSWORD_FULFILLED = 'CHANGE_PASSWORD_FULFILLED';
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED';

export const changePasswordRequested = () => ({
    type: CHANGE_PASSWORD_REQUESTED,
} as ChangePasswordRequestedAction);

export const changePasswordFulfilled = () => ({
    type: CHANGE_PASSWORD_FULFILLED,
} as ChangePasswordFulfilledAction);

export const changePasswordFailed = () => ({
    type: CHANGE_PASSWORD_FAILED,
} as ChangePasswordFailedAction);
