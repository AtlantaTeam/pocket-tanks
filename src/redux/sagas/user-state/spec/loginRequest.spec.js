import { runSaga } from 'redux-saga';
import * as authController from '../../../../controllers/auth-controller';

import {
    loginRequested,
    loginFulfilled,
    loginFailed,
} from '../../../actions/user-state/login';
import {
    fetchUserInfoFulfilled
} from '../../../actions/user-state/user-info';

import { loginRequest } from '../index';

describe('loginRequest saga', () => {
    it('отправляет запрос на логин, при успехе запрашивает данные пользователя', async () => {
        const dummyResponse = { response: 'dummyData' };
        const authControllerLogin = jest.spyOn(authController, 'login')
            .mockImplementation(() => {});
        const authControllerGetUserInfo = jest.spyOn(authController, 'getUserInfo')
            .mockImplementation(() => dummyResponse);

        const dispatched = [];
        await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, () => loginRequest(loginRequested(new FormData())));

        expect(authControllerLogin).toHaveBeenCalledTimes(1);
        expect(authControllerGetUserInfo).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([loginFulfilled(), fetchUserInfoFulfilled(dummyResponse)]);

        authControllerLogin.mockClear();
        authControllerGetUserInfo.mockClear();
    });

    it('отправляет запрос на логин, при провале диспатчит фэйловый экшн', async () => {
        const dummyError = { error: 'error' };
        const authControllerLogin = jest.spyOn(authController, 'login')
            .mockImplementation(() => Promise.reject(dummyError));
        const authControllerGetUserInfo = jest.spyOn(authController, 'getUserInfo')
            .mockImplementation(() => {});

        const dispatched = [];
        await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, () => loginRequest(loginRequested(new FormData())));

        expect(authControllerLogin).toHaveBeenCalledTimes(1);
        expect(authControllerGetUserInfo).toHaveBeenCalledTimes(0);
        expect(dispatched).toEqual([loginFailed(dummyError)]);

        authControllerLogin.mockClear();
        authControllerGetUserInfo.mockClear();
    });
});
