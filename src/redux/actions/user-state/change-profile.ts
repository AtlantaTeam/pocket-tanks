import type { UserInfoResponse, ErrorResponse } from '../../../api/types';
import type { Action } from '..';

export type ChangeProfileRequestedAction = Action<typeof CHANGE_PROFILE_REQUESTED, FormData>;
export type ChangeProfileFulfilledAction = Action<typeof CHANGE_PROFILE_FULFILLED, UserInfoResponse>;
export type ChangeProfileFailedAction = Action<typeof CHANGE_PROFILE_FAILED, ErrorResponse>;

export type ChangeProfileAction =
    | ChangeProfileRequestedAction
    | ChangeProfileFulfilledAction
    | ChangeProfileFailedAction;

export const CHANGE_PROFILE_REQUESTED = 'CHANGE_PROFILE_REQUESTED';
export const CHANGE_PROFILE_FULFILLED = 'CHANGE_PROFILE_FULFILLED';
export const CHANGE_PROFILE_FAILED = 'CHANGE_PROFILE_FAILED';

export const changeProfileRequested = (payload: FormData) => ({
    type: CHANGE_PROFILE_REQUESTED,
    payload,
} as ChangeProfileRequestedAction);

export const changeProfileFulfilled = (payload: UserInfoResponse) => ({
    type: CHANGE_PROFILE_FULFILLED,
    payload,
} as ChangeProfileFulfilledAction);

export const changeProfileFailed = (payload: ErrorResponse) => ({
    type: CHANGE_PROFILE_FAILED,
    payload,
} as ChangeProfileFailedAction);
