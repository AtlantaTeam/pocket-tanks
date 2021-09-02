import type { UserInfoResponse } from '../../../api/types';
import type { Action } from '..';

export type FetchUserInfoRequestedAction = Action<typeof FETCH_USER_INFO_REQUESTED>;
export type FetchUserInfoFulfilledAction = Action<typeof FETCH_USER_INFO_FULFILLED, UserInfoResponse>;
export type FetchUserInfoFailedAction = Action<typeof FETCH_USER_INFO_FAILED>;

export type FetchUserInfoAction =
    | FetchUserInfoRequestedAction
    | FetchUserInfoFulfilledAction
    | FetchUserInfoFailedAction;

export const FETCH_USER_INFO_REQUESTED = 'FETCH_USER_INFO_REQUESTED';
export const FETCH_USER_INFO_FULFILLED = 'FETCH_USER_INFO_FULFILLED';
export const FETCH_USER_INFO_FAILED = 'FETCH_USER_INFO_FAILED';

export const fetchUserInfoRequested = () => ({
    type: FETCH_USER_INFO_REQUESTED,
} as FetchUserInfoRequestedAction);

export const fetchUserInfoFulfilled = (payload: UserInfoResponse) => ({
    type: FETCH_USER_INFO_FULFILLED,
    payload,
} as FetchUserInfoFulfilledAction);

export const fetchUserInfoFailed = () => ({
    type: FETCH_USER_INFO_FAILED,
} as FetchUserInfoFailedAction);
