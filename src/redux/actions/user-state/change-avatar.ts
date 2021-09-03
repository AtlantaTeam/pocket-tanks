import type { UserInfoResponse, ErrorResponse } from '../../../api/types';
import type { Action } from '..';

export type ChangeAvatarRequestedAction = Action<typeof CHANGE_AVATAR_REQUESTED, FormData>;
export type ChangeAvatarFulfilledAction = Action<typeof CHANGE_AVATAR_FULFILLED, UserInfoResponse>;
export type ChangeAvatarFailedAction = Action<typeof CHANGE_AVATAR_FAILED, ErrorResponse>;

export type ChangeAvatarAction =
    | ChangeAvatarRequestedAction
    | ChangeAvatarFulfilledAction
    | ChangeAvatarFailedAction;

export const CHANGE_AVATAR_REQUESTED = 'CHANGE_AVATAR_REQUESTED';
export const CHANGE_AVATAR_FULFILLED = 'CHANGE_AVATAR_FULFILLED';
export const CHANGE_AVATAR_FAILED = 'CHANGE_AVATAR_FAILED';

export const changeAvatarRequested = (payload: FormData) => ({
    type: CHANGE_AVATAR_REQUESTED,
    payload,
} as ChangeAvatarRequestedAction);

export const changeAvatarFulfilled = (payload: UserInfoResponse) => ({
    type: CHANGE_AVATAR_FULFILLED,
    payload,
} as ChangeAvatarFulfilledAction);

export const changeAvatarFailed = (payload: ErrorResponse) => ({
    type: CHANGE_AVATAR_FAILED,
    payload,
} as ChangeAvatarFailedAction);
