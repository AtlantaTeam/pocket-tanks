import { Request, Response, NextFunction } from 'express';

import { UserAPI } from 'api/user-api';
import { setUserServerToAPI } from 'server/utils/userServerToAPILocals';
import {
    getUserInfo,
    setUserAuth,
    setUserInfo,
} from 'server/utils/userLocals';
import { objectToCamel } from 'ts-case-convert';
import { saveUserToDB } from 'server/controllers/authControllers';
import { httpToAPI } from '../../modules/http-service/http-service';
import { AuthAPI } from '../../api/auth-api';
import { setAuthServerToAPI } from '../utils/authServerToAPILocals';

export const checkAuth = () => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { authCookieForAuth, uuidForAuth } = req.cookies;
    if (authCookieForAuth && uuidForAuth) {
        httpToAPI
            .httpTransport
            .defaults.headers.Cookie = `authCookie=${authCookieForAuth as string}; uuid=${uuidForAuth as string}`;
        const authServerToAPI = new AuthAPI(httpToAPI);
        const userServerToAPI = new UserAPI(httpToAPI);
        authServerToAPI
            .getUserInfo()
            .then((userInfo) => {
                setUserAuth(res);
                setUserInfo(
                    res,
                    objectToCamel(userInfo.data),
                );
                saveUserToDB(getUserInfo(res));
                setAuthServerToAPI(res, authServerToAPI);
                setUserServerToAPI(res, userServerToAPI);
                next();
                return userInfo;
            })
            .catch((err) => next(err));
    } else {
        console.log('Нет ключа авторизации', 'checkAuth');
        const authServerToAPI = new AuthAPI(httpToAPI);
        const userServerToAPI = new UserAPI(httpToAPI);
        setAuthServerToAPI(res, authServerToAPI);
        setUserServerToAPI(res, userServerToAPI);
        next();
    }
};
