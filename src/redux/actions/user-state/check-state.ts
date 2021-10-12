import type { ErrorResponse } from '../../../api/types';
import type { Action } from '..';

export type CheckStateRequestedAction = Action<typeof CHECK_STATE_REQUESTED, undefined>;
export type CheckStateFailedAction = Action<typeof CHECK_STATE_FAILED, ErrorResponse>;

export const CHECK_STATE_REQUESTED = 'CHECK_STATE_REQUESTED';
export const CHECK_STATE_FAILED = 'CHECK_STATE_FAILED';

export const checkStateRequested = () => ({
    type: CHECK_STATE_REQUESTED,
} as CheckStateRequestedAction);

export const checkStateFailed = (payload: ErrorResponse) => ({
    type: CHECK_STATE_FAILED,
    payload,
} as CheckStateFailedAction);
