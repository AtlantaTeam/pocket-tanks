import {
    ClearAuthCookie,
    SetAuthCookie,
    CLEAR_AUTH_COOKIE,
    SET_AUTH_COOKIE,
} from '../../actions/auth-cookie-state';

export type AuthCookieStateAction =
    | SetAuthCookie
    | ClearAuthCookie;

export type AuthCookieState = {
    authCookie: string | null;
};

export const initialState: AuthCookieState = {
    authCookie: null,
};

// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
export const authCookieState = (state: AuthCookieState = initialState, action:AuthCookieStateAction) => {
    switch (action.type) {
        case SET_AUTH_COOKIE: {
            state.authCookie = action.payload;
            break;
        }
        case CLEAR_AUTH_COOKIE: {
            state.authCookie = null;
            break;
        }
        // no default
    }
    return state;
};
