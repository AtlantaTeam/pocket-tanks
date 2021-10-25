import { AuthAPI } from 'api/auth-api';
import { objectToCamel } from 'ts-case-convert';
import { NextFunction, Request, Response } from 'express';
import { saveUserToDB } from 'server/controllers/authControllers';
import { setAuthServerToAPI } from './authServerToAPILocals';
import { getUserInfo, setUserAuth, setUserInfo } from './userLocals';

export const getUserInfoRequest = (
    req: Request,
    res: Response,
    next: NextFunction,
    authServerToAPI: AuthAPI,
) => {
    authServerToAPI
        .getUserInfo()
        .then((userInfo) => {
            setUserAuth(res);
            setUserInfo(res, objectToCamel(userInfo.data));
            saveUserToDB(getUserInfo(res));
            setAuthServerToAPI(res, authServerToAPI);
            return objectToCamel(userInfo.data);
        })
        .catch((err) => {
            // const { response, message } = err;
            // res.status(response?.status || 500).send(response?.data?.reason || message);
        })
        .finally(() => {
            next();
        });
};
