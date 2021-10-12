import { AxiosResponse } from 'axios';
import type { NextFunction, Request, Response } from 'express';

import { httpToAPI } from '../../modules/http-service/http-service';
import { AuthAPI } from '../../api/auth-api';

import { deleteUserAuth } from '../utils/userLocals';
import { deleteAuthServerToAPI, getAuthServerToAPI, setAuthServerToAPI } from '../utils/authServerToAPILocals';
import { cookieParser } from '../utils/cookieParser';
import { getUserInfoRequest } from '../utils/getUserInfoRequest';

export const loginController = (req: Request, res: Response, next: NextFunction) => {
    const authServerToAPI = getAuthServerToAPI(res);
    authServerToAPI.login(req.body)
        .then((response: AxiosResponse) => {
            cookieParser(res, response);
            res.status(200);
            res.send('Ок');
            return response;
        })
        .catch((err) => { throw err; })
        .finally(() => {
            next();
        });
};

export const signUpController = (req: Request, res: Response, next: NextFunction) => {
    const authServerToAPI = getAuthServerToAPI(res);
    authServerToAPI.signup(req.body)
        .then((response: AxiosResponse) => {
            cookieParser(res, response);
            res.status(200);
            res.send('Ок');
            return response;
        })
        .catch((err) => { throw err; })
        .finally(() => {
            next();
        });
};

export const getUserInfoController = (req: Request, res: Response, next: NextFunction) => {
    const { authCookie, uuid } = req.cookies;
    if (authCookie && uuid) {
        httpToAPI.httpTransport.defaults.headers.Cookie = `authCookie=${authCookie as string}; uuid=${uuid as string}`;
        const authServerToAPI = new AuthAPI(httpToAPI);
        getUserInfoRequest(req, res, next, authServerToAPI);
    } else {
        console.log('Нет ключа авторизации');
        const authServerToAPI = new AuthAPI(httpToAPI);
        setAuthServerToAPI(res, authServerToAPI);
        next();
    }
};

export const logoutController = (req: Request, res: Response, next: NextFunction) => {
    const authServerToAPI = getAuthServerToAPI(res);
    authServerToAPI.logout()
        .then((response: AxiosResponse) => {
            res.clearCookie('authCookie');
            res.clearCookie('uuid');
            deleteUserAuth(res);
            deleteAuthServerToAPI(res);
            delete httpToAPI.httpTransport.defaults.headers.Cookie;
            res.status(200);
            res.send('Ок');
            return response;
        })
        .catch((err) => { throw err; })
        .finally(() => {
            next();
        });
};
