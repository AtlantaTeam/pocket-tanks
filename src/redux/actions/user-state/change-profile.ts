import type { UserInfoResponse } from '../../../api/types';
import type { Action } from '..';

export type ChangeProfileRequestedAction = Action<typeof CHANGE_PROFILE_REQUESTED>;
export type ChangeProfileFulfilledAction = Action<typeof CHANGE_PROFILE_FULFILLED, UserInfoResponse>;
export type ChangeProfileFailedAction = Action<typeof CHANGE_PROFILE_FAILED>;

export type ChangeProfileAction =
    | ChangeProfileRequestedAction
    | ChangeProfileFulfilledAction
    | ChangeProfileFailedAction;

export const CHANGE_PROFILE_REQUESTED = 'CHANGE_PROFILE_REQUESTED';
export const CHANGE_PROFILE_FULFILLED = 'CHANGE_PROFILE_FULFILLED';
export const CHANGE_PROFILE_FAILED = 'CHANGE_PROFILE_FAILED';

export const changeProfileRequested = () => ({
    type: CHANGE_PROFILE_REQUESTED,
} as ChangeProfileRequestedAction);

export const changeProfileFulfilled = (payload: UserInfoResponse) => ({
    type: CHANGE_PROFILE_FULFILLED,
    payload,
} as ChangeProfileFulfilledAction);

export const changeProfileFailed = () => ({
    type: CHANGE_PROFILE_FAILED,
} as ChangeProfileFailedAction);
