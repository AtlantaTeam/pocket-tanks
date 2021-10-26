import type { Action } from '..';

export const SET_AUTH_COOKIE = 'SET_AUTH_COOKIE';
export const CLEAR_AUTH_COOKIE = 'CLEAR_AUTH_COOKIE';

export type SetAuthCookie = Action<typeof SET_AUTH_COOKIE, string | null>;
export type ClearAuthCookie = Action<typeof CLEAR_AUTH_COOKIE, undefined>;

export const setAuthCookie = (payload:string | null) => ({
    type: SET_AUTH_COOKIE,
    payload,
} as SetAuthCookie);

export const clearAuthCookie = () => ({
    type: CLEAR_AUTH_COOKIE,
} as ClearAuthCookie);
