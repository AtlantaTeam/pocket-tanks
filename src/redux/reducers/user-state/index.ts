import {
    FETCH_USER_INFO_REQUESTED,
    FETCH_USER_INFO_FAILED,
    FETCH_USER_INFO_FULFILLED,
} from '../../actions/user-state/user-info';
import {
    LOGIN_REQUESTED,
    LOGIN_FULFILLED,
    LOGIN_FAILED,
} from '../../actions/user-state/login';
import {
    SIGNUP_REQUESTED,
    SIGNUP_FULFILLED,
    SIGNUP_FAILED,
} from '../../actions/user-state/signup';
import {
    LOGOUT_REQUESTED,
    LOGOUT_FULFILLED,
    LOGOUT_FAILED,
} from '../../actions/user-state/logout';
import {
    CHANGE_PROFILE_REQUESTED,
    CHANGE_PROFILE_FULFILLED,
    CHANGE_PROFILE_FAILED,
} from '../../actions/user-state/change-profile';
import {
    CHANGE_AVATAR_REQUESTED,
    CHANGE_AVATAR_FULFILLED,
    CHANGE_AVATAR_FAILED,
} from '../../actions/user-state/change-avatar';
import {
    CHANGE_PASSWORD_REQUESTED,
    CHANGE_PASSWORD_FULFILLED,
    CHANGE_PASSWORD_FAILED,
} from '../../actions/user-state/change-password';
import {
    CLEAN_ERROR,
} from '../../actions/user-state/clean-error';
import type { FetchUserInfoAction } from '../../actions/user-state/user-info';
import type { LoginAction } from '../../actions/user-state/login';
import type { SignupAction } from '../../actions/user-state/signup';
import type { LogoutAction } from '../../actions/user-state/logout';
import type { ChangeProfileAction } from '../../actions/user-state/change-profile';
import type { ChangeAvatarAction } from '../../actions/user-state/change-avatar';
import type { ChangePasswordAction } from '../../actions/user-state/change-password';
import type { CleanErrorAction } from '../../actions/user-state/clean-error';
import type { UserInfoResponse, IDResponse } from '../../../api/types';

export type UserStateAction =
    | FetchUserInfoAction
    | LoginAction
    | SignupAction
    | LogoutAction
    | ChangeProfileAction
    | ChangeAvatarAction
    | ChangePasswordAction
    | CleanErrorAction;

export type UserState = {
    isLoading: boolean;
    isLoggedIn: boolean;
    userInfo: Record<string, never> | IDResponse | UserInfoResponse;
    error: string | null;
};

export const initialState: UserState = {
    isLoading: false,
    isLoggedIn: false,
    userInfo: {},
    error: null,
};

/* eslint-disable no-param-reassign */
export const userState = (state: UserState = initialState, action: UserStateAction) => {
    switch (action.type) {
        case FETCH_USER_INFO_REQUESTED:
        case LOGIN_REQUESTED:
        case SIGNUP_REQUESTED:
        case LOGOUT_REQUESTED:
        case CHANGE_PROFILE_REQUESTED:
        case CHANGE_AVATAR_REQUESTED:
        case CHANGE_PASSWORD_REQUESTED:
            state.isLoading = true;
            break;

        case FETCH_USER_INFO_FULFILLED:
            state.isLoggedIn = true;
            state.isLoading = false;
            state.userInfo = action.payload;
            break;

        case CHANGE_PROFILE_FULFILLED:
        case CHANGE_AVATAR_FULFILLED:
            state.isLoading = false;
            state.userInfo = action.payload;
            break;

        case LOGIN_FULFILLED:
            state.isLoading = false;
            state.isLoggedIn = true;
            break;

        case SIGNUP_FULFILLED:
            state.isLoading = false;
            state.isLoggedIn = true;
            state.userInfo.id = action.payload.id;
            break;

        case LOGOUT_FULFILLED:
            state.isLoading = false;
            state.isLoggedIn = false;
            state.userInfo = {};
            break;

        case CHANGE_PASSWORD_FULFILLED:
            state.isLoading = false;
            break;

        case FETCH_USER_INFO_FAILED:
        case LOGIN_FAILED:
        case SIGNUP_FAILED:
        case LOGOUT_FAILED:
        case CHANGE_PROFILE_FAILED:
        case CHANGE_AVATAR_FAILED:
        case CHANGE_PASSWORD_FAILED:
            state.isLoading = false;
            state.error = action.payload.message;
            break;

        case CLEAN_ERROR:
            state.error = null;
            break;

        // no default
    }
    return state;
};
/* eslint-enable no-param-reassign */
