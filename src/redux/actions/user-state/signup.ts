import type { IDResponse, ErrorResponse } from '../../../api/types';
import type { Action } from '..';

export type SignupRequestedAction = Action<typeof SIGNUP_REQUESTED, FormData>;
export type SignupFulfilledAction = Action<typeof SIGNUP_FULFILLED, IDResponse>;
export type SignupFailedAction = Action<typeof SIGNUP_FAILED, ErrorResponse>;

export type SignupAction =
    | SignupRequestedAction
    | SignupFulfilledAction
    | SignupFailedAction;

export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const SIGNUP_FULFILLED = 'SIGNUP_FULFILLED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const signupRequested = (payload: FormData) => ({
    type: SIGNUP_REQUESTED,
    payload,
} as SignupRequestedAction);

export const signupFulfilled = (payload: IDResponse) => ({
    type: SIGNUP_FULFILLED,
    payload,
} as SignupFulfilledAction);

export const signupFailed = (payload: ErrorResponse) => ({
    type: SIGNUP_FAILED,
    payload,
} as SignupFailedAction);
