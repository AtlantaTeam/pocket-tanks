import { runSaga } from 'redux-saga';
import * as authController from '../../../../controllers/auth-controller';

import {
    signupRequested,
    signupFulfilled,
    signupFailed,
} from '../../../actions/user-state/signup';
import {
    fetchUserInfoFulfilled
} from '../../../actions/user-state/user-info';

import { signupRequest } from '../index';

describe('signupRequest saga', () => {
    it('отправляет запрос на регистрацию, при успехе запрашивает данные пользователя', async () => {
        const dummyResponse = { response: 'dummyData' };
        const authControllerSignup = jest.spyOn(authController, 'signup')
            .mockImplementation(() => dummyResponse);
        const authControllerGetUserInfo = jest.spyOn(authController, 'getUserInfo')
            .mockImplementation(() => dummyResponse);

        const dispatched = [];
        await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, () => signupRequest(signupRequested(new FormData())));

        expect(authControllerSignup).toHaveBeenCalledTimes(1);
        expect(authControllerGetUserInfo).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([signupFulfilled(dummyResponse), fetchUserInfoFulfilled(dummyResponse)]);

        authControllerSignup.mockClear();
        authControllerGetUserInfo.mockClear();
    });

    it('отправляет запрос на регистрацию, при провале диспатчит фэйловый экшн', async () => {
        const dummyError = { error: 'error' };
        const authControllerSignup = jest.spyOn(authController, 'signup')
            .mockImplementation(() => Promise.reject(dummyError));
        const authControllerGetUserInfo = jest.spyOn(authController, 'getUserInfo')
            .mockImplementation(() => {});

        const dispatched = [];
        await runSaga({
            dispatch: (action) => dispatched.push(action),
        }, () => signupRequest(signupRequested(new FormData())));

        expect(authControllerSignup).toHaveBeenCalledTimes(1);
        expect(authControllerGetUserInfo).toHaveBeenCalledTimes(0);
        expect(dispatched).toEqual([signupFailed(dummyError)]);

        authControllerSignup.mockClear();
        authControllerGetUserInfo.mockClear();
    });
});
