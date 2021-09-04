import { call, put, takeLatest } from 'redux-saga/effects';

import type { LoginRequestedAction } from '../../actions/user-state/login';
import type { SignupRequestedAction } from '../../actions/user-state/signup';
import type { ChangeProfileRequestedAction } from '../../actions/user-state/change-profile';
import type { ChangeAvatarRequestedAction } from '../../actions/user-state/change-avatar';
import type { ChangePasswordRequestedAction } from '../../actions/user-state/change-password';

import { loginFulfilled, loginFailed, LOGIN_REQUESTED } from '../../actions/user-state/login';
import { signupFulfilled, signupFailed, SIGNUP_REQUESTED } from '../../actions/user-state/signup';
import { logoutFulfilled, logoutFailed, LOGOUT_REQUESTED } from '../../actions/user-state/logout';
import { fetchUserInfoFulfilled, fetchUserInfoFailed, FETCH_USER_INFO_REQUESTED }
    from '../../actions/user-state/user-info';
import { changeProfileFulfilled, changeProfileFailed, CHANGE_PROFILE_REQUESTED }
    from '../../actions/user-state/change-profile';
import { changeAvatarFulfilled, changeAvatarFailed, CHANGE_AVATAR_REQUESTED }
    from '../../actions/user-state/change-avatar';
import { changePasswordFulfilled, changePasswordFailed, CHANGE_PASSWORD_REQUESTED }
    from '../../actions/user-state/change-password';

import { AuthController } from '../../../controllers/auth-controller';
import { UserController } from '../../../controllers/user-controller';

import { IDResponse, UserInfoResponse, ErrorResponse } from '../../../api/types';

export function* loginRequest({ payload }: LoginRequestedAction) {
    try {
        yield call(AuthController.login, payload);
        yield put(loginFulfilled());
        yield call(fetchUserInfoRequest);
    } catch (err) {
        yield put(loginFailed(err as ErrorResponse));
    }
}

export function* signupRequest({ payload }: SignupRequestedAction) {
    try {
        // @ts-expect-error redux-saga types
        const userId = yield call(AuthController.signup, payload);
        yield put(signupFulfilled(userId as IDResponse));
        yield call(fetchUserInfoRequest);
    } catch (err) {
        yield put(signupFailed(err as ErrorResponse));
    }
}

export function* logoutRequest() {
    try {
        yield call(AuthController.logout);
        yield put(logoutFulfilled());
    } catch (err) {
        yield put(logoutFailed(err as ErrorResponse));
    }
}

export function* fetchUserInfoRequest() {
    try {
        // @ts-expect-error redux-saga types
        const userInfo = yield call(AuthController.getUserInfo);
        yield put(fetchUserInfoFulfilled(userInfo as UserInfoResponse));
    } catch (err) {
        yield put(fetchUserInfoFailed(err as ErrorResponse));
    }
}

export function* changeProfileRequest({ payload }: ChangeProfileRequestedAction) {
    try {
        // @ts-expect-error redux-saga types
        const userInfo = yield call(UserController.changeProfile, payload);
        yield put(changeProfileFulfilled(userInfo as UserInfoResponse));
    } catch (err) {
        yield put(changeProfileFailed(err as ErrorResponse));
    }
}

export function* changeAvatarRequest({ payload }: ChangeAvatarRequestedAction) {
    try {
        // @ts-expect-error redux-saga types
        const userInfo = yield call(UserController.changeAvatar, payload);
        yield put(changeAvatarFulfilled(userInfo as UserInfoResponse));
    } catch (err) {
        yield put(changeAvatarFailed(err as ErrorResponse));
    }
}

export function* changePasswordRequest({ payload }: ChangePasswordRequestedAction) {
    try {
        yield call(UserController.changePassword, payload);
        yield put(changePasswordFulfilled());
    } catch (err) {
        yield put(changePasswordFailed(err as ErrorResponse));
    }
}

export function* userStateSaga() {
    yield takeLatest(LOGIN_REQUESTED, loginRequest);
    yield takeLatest(SIGNUP_REQUESTED, signupRequest);
    yield takeLatest(LOGOUT_REQUESTED, logoutRequest);
    yield takeLatest(FETCH_USER_INFO_REQUESTED, fetchUserInfoRequest);
    yield takeLatest(CHANGE_PROFILE_REQUESTED, changeProfileRequest);
    yield takeLatest(CHANGE_AVATAR_REQUESTED, changeAvatarRequest);
    yield takeLatest(CHANGE_PASSWORD_REQUESTED, changePasswordRequest);
}