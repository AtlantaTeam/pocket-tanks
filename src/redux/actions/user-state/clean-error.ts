import type { Action } from '..';

export type CleanErrorAction = Action<typeof CLEAN_ERROR, undefined>;

export const CLEAN_ERROR = 'CLEAN_ERROR';

export const cleanError = () => ({
    type: CLEAN_ERROR,
} as CleanErrorAction);
