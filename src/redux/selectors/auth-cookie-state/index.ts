import type { State } from '../../reducers';

export const getAuthCookieState = (state: State) => state.authCookieState;

export const getAuthCookie = (state: State) => getAuthCookieState(state).authCookie;
