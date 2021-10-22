import { Store } from 'redux';
import type { ErrorResponse } from '../../../api/types';
import type { Action } from '..';

export type AvatarRequestedAction = Action<typeof AVATAR_REQUESTED, Store>;
export type AvatarFulfilledAction = Action<typeof AVATAR_FULFILLED, string | null>;
export type AvatarFailedAction = Action<typeof AVATAR_FAILED, ErrorResponse>;

export type AvatarAction =
    | AvatarRequestedAction
    | AvatarFulfilledAction
    | AvatarFailedAction;

export const AVATAR_REQUESTED = 'AVATAR_REQUESTED';
export const AVATAR_FULFILLED = 'AVATAR_FULFILLED';
export const AVATAR_FAILED = 'AVATAR_FAILED';

export const avatarRequested = (store:Store) => ({
    type: AVATAR_REQUESTED,
    payload: store,
} as AvatarRequestedAction);

export const avatarFulfilled = (payload: string | null) => ({
    type: AVATAR_FULFILLED,
    payload,
} as AvatarFulfilledAction);

export const avatarFailed = (payload: ErrorResponse) => ({
    type: AVATAR_FAILED,
    payload,
} as AvatarFailedAction);
