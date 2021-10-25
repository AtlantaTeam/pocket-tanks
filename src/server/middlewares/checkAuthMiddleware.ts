import { NextFunction, Request, Response } from 'express';
import { getUserInfo } from 'server/utils/userLocals';
import { saveUserToDB } from 'server/controllers/authControllers';
import { httpToAPI } from '../../modules/http-service/http-service';
import { AuthAPI } from '../../api/auth-api';
import { setAuthServerToAPI } from '../utils/authServerToAPILocals';
import { getUserInfoRequest } from '../utils/getUserInfoRequest';

export const checkAuth = () => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { authCookie, uuid } = req.cookies;
    if (authCookie && uuid) {
        httpToAPI.httpTransport.defaults.headers.Cookie = `authCookie=${authCookie as string}; uuid=${uuid as string}`;
        const authServerToAPI = new AuthAPI(httpToAPI);
        getUserInfoRequest(req, res, next, authServerToAPI);
    } else {
        console.log('Нет ключа авторизации', 'checkAuth');
        const authServerToAPI = new AuthAPI(httpToAPI);
        setAuthServerToAPI(res, authServerToAPI);
        next();
    }
};
