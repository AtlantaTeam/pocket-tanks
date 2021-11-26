import { AxiosResponse } from 'axios';
import type { NextFunction, Request, Response } from 'express';

import { getUserInfoRequest } from 'server/utils/getUserInfoRequest';
import { SERVER_URL, YANDEX_REDIRECT_URI } from 'constants/api-routes';
import { OAuthData } from 'api/types';
import { objectToCamel } from 'ts-case-convert';
import { httpToAPI } from '../../modules/http-service/http-service';
import { AuthAPI } from '../../api/auth-api';

import { deleteUserAuth, getUserInfo } from '../utils/userLocals';
import { deleteAuthServerToAPI, getAuthServerToAPI, setAuthServerToAPI } from '../utils/authServerToAPILocals';
import { cookieParser } from '../utils/cookieParser';

const IS_DEV = process.env.NODE_ENV === 'development';

export const loginController = (req: Request, res: Response, next: NextFunction) => {
    const authServerToAPI = getAuthServerToAPI(res);
    authServerToAPI.login(req.body)
        .then((response: AxiosResponse) => {
            cookieParser(res, response);
            const { status, data } = response;
            res.status(status);
            res.send(data);
            return true;
        })
        .catch((err) => {
            const { response } = err;
            const { status, data } = response;
            if (status === 400 && httpToAPI.httpTransport.defaults.headers.Cookie) {
                delete httpToAPI.httpTransport.defaults.headers.Cookie;
                loginController(req, res, next);
            } else {
                next(err);
            }
        });
};

export const loginWithOAuthController = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.code) {
        const code: string = req.query.code as string;
        const authServerToAPI = getAuthServerToAPI(res);
        const postData: OAuthData = {
            code,
            redirect_uri: IS_DEV ? SERVER_URL : YANDEX_REDIRECT_URI,
        };
        authServerToAPI.loginWithOAuthPraktikum(postData)
            .then((response) => {
                cookieParser(res, response);
                res.redirect('/profile');
                return true;
            })
            .catch((err) => {
                const { response, message } = err;
                if (response?.data?.reason === 'User already in system'
                    && httpToAPI.httpTransport.defaults.headers.Cookie) {
                    delete httpToAPI.httpTransport.defaults.headers.Cookie;
                    loginWithOAuthController(req, res, next);
                } else {
                    next(err);
                }
            });
    } else {
        next();
    }
};

export const loginWithOAuthYandexController = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.code) {
        const code: string = req.query.code as string;
        const authServerToAPI = getAuthServerToAPI(res);
        authServerToAPI.getOAuthYandexToken(code)
            .then((response) => {
                const responseData = objectToCamel(response.data);
                if (responseData?.error) {
                    const { error, errorDescription } = responseData;
                    throw new Error(`${error}: ${errorDescription}`);
                }
                if (!responseData.accessToken) {
                    throw new Error('Error: Yandex token is empty!');
                }
                res.cookie('yandexToken', responseData.accessToken);
                res.redirect('/profile');
                return true;
            })
            .catch((err) => {
                const { response, message } = err;
                if (response?.data?.reason === 'User already in system'
                    && httpToAPI.httpTransport.defaults.headers.Cookie) {
                    delete httpToAPI.httpTransport.defaults.headers.Cookie;
                    loginWithOAuthYandexController(req, res, next);
                } else {
                    next(err);
                }
            });
    } else {
        next();
    }
};

export const loginWithOAuthGoogleController = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.code) {
        const code: string = req.query.code as string;
        const authServerToAPI = getAuthServerToAPI(res);
        authServerToAPI.getOAuthGoogleToken(code)
            .then((response) => {
                const responseData = objectToCamel(response.data);
                if (responseData?.error) {
                    const { error, errorDescription } = responseData;
                    throw new Error(`${error}: ${errorDescription}`);
                }
                if (!responseData.accessToken) {
                    throw new Error('Error: Google token is empty!');
                }
                res.cookie('googleToken', responseData.accessToken);
                res.redirect('/profile');
                return true;
            })
            .catch((err) => {
                const { response, message } = err;
                if (response?.data?.reason === 'User already in system'
                    && httpToAPI.httpTransport.defaults.headers.Cookie) {
                    delete httpToAPI.httpTransport.defaults.headers.Cookie;
                    loginWithOAuthGoogleController(req, res, next);
                } else {
                    next(err);
                }
            });
    } else {
        next();
    }
};

export const signUpController = (req: Request, res: Response, next: NextFunction) => {
    const authServerToAPI = getAuthServerToAPI(res);
    authServerToAPI.signup({ ...req.body, phone: '+7 (111) 111-11-11' })
        .then((response: AxiosResponse) => {
            cookieParser(res, response);
            res.status(200);
            res.send('Ок');
            return response;
        })
        .catch((err) => next(err));
};

export const getUserInfoController = (req: Request, res: Response, next: NextFunction) => {
    const { authCookieForAuth, uuidForAuth, yandexToken } = req.cookies;
    if (authCookieForAuth && uuidForAuth) {
        httpToAPI
            .httpTransport
            .defaults.headers.Cookie = `authCookie=${authCookieForAuth as string}; uuid=${uuidForAuth as string}`;
        const authServerToAPI = new AuthAPI(httpToAPI);
        getUserInfoRequest(req, res, next, authServerToAPI);
        res.status(200).send(getUserInfo(res));
    } else {
        console.log('Нет ключа авторизации', 'getUserInfoController');
        const authServerToAPI = new AuthAPI(httpToAPI);
        setAuthServerToAPI(res, authServerToAPI);
    }
};

export const clearCookiesAndLocals = (res: Response) => {
    res.clearCookie('authCookieForAuth');
    res.clearCookie('uuidForAuth');
    res.clearCookie('yandexToken');
    res.clearCookie('googleToken');
    deleteUserAuth(res);
    deleteAuthServerToAPI(res);
    delete httpToAPI.httpTransport.defaults.headers.Cookie;
    return res.redirect('/login');
};

export const logoutController = (req: Request, res: Response, next: NextFunction) => {
    const { yandexToken } = req.cookies;
    if (yandexToken) {
        clearCookiesAndLocals(res);
    } else {
        getAuthServerToAPI(res).logout()
            .then(() => clearCookiesAndLocals(res))
            .catch((err) => {
                clearCookiesAndLocals(res);
            });
    }
};
