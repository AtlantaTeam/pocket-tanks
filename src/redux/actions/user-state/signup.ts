import type { IDResponse } from '../../../api/types';
import type { Action } from '..';

export type SignupRequestedAction = Action<typeof SIGNUP_REQUESTED>;
export type SignupFulfilledAction = Action<typeof SIGNUP_FULFILLED, IDResponse>;
export type SignupFailedAction = Action<typeof SIGNUP_FAILED>;

export type SignupAction =
    | SignupRequestedAction
    | SignupFulfilledAction
    | SignupFailedAction;

export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const SIGNUP_FULFILLED = 'SIGNUP_FULFILLED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const signupRequested = () => ({
    type: SIGNUP_REQUESTED,
} as SignupRequestedAction);

export const signupFulfilled = (payload: IDResponse) => ({
    type: SIGNUP_FULFILLED,
    payload,
} as SignupFulfilledAction);

export const signupFailed = () => ({
    type: SIGNUP_FAILED,
} as SignupFailedAction);
