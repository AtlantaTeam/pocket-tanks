import { AxiosResponse } from 'axios';
import type { NextFunction, Request, Response } from 'express';

import { getUserInfoRequest } from 'server/utils/getUserInfoRequest';
import { SERVER_URL } from 'constants/api-routes';
import { OAuthData, UserInfoResponse } from 'api/types';
import { LeaderBoardAPI } from 'api/leaderboard-api';
import { User } from 'db/models/User';
import { httpToAPI } from '../../modules/http-service/http-service';
import { AuthAPI } from '../../api/auth-api';

import { deleteUserAuth, getUserInfo } from '../utils/userLocals';
import { deleteAuthServerToAPI, getAuthServerToAPI, setAuthServerToAPI } from '../utils/authServerToAPILocals';
import { cookieParser } from '../utils/cookieParser';

export const saveUserToDB = (userData: UserInfoResponse) => {
    if (userData) {
        (async () => {
            const user = await User.findOrCreate({
                where: { remote_id: userData.id },
                defaults: {
                    remote_id: userData.id,
                    name: userData.displayName || `${userData.firstName} ${userData.secondName}`,
                },
            });
            return user;
        })()
            .then((user) => console.log('User exist: ', !!user))
            .catch((err) => console.log(err));
    }
};

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

export const addUserResultsController = (req: Request, res: Response, next: NextFunction) => {
    const { authCookie, uuid } = req.cookies;
    if (authCookie && uuid) {
        httpToAPI.httpTransport.defaults.headers.Cookie = `authCookie=${authCookie as string}; uuid=${uuid as string}`;
        const leaderboadAPIDirectToAPI = new LeaderBoardAPI(httpToAPI);
        leaderboadAPIDirectToAPI.addUserResults(req.body)
            .then((response) => {
                const { data } = response;
                res.status(200).send(data);
                return true;
            })
            .catch((err) => next(err));
    }
};

export const getAllLeaderboardController = (req: Request, res: Response, next: NextFunction) => {
    const { authCookie, uuid } = req.cookies;
    if (authCookie && uuid) {
        httpToAPI.httpTransport.defaults.headers.Cookie = `authCookie=${authCookie as string}; uuid=${uuid as string}`;
        const leaderboadAPIDirectToAPI = new LeaderBoardAPI(httpToAPI);
        leaderboadAPIDirectToAPI.getLeaderBoard(req.body)
            .then((response) => {
                const { data } = response;
                res.status(200).send(data);
                return true;
            })
            .catch((err) => next(err));
    }
};

export const loginWithOAuthController = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.code) {
        const code: string = req.query.code as string;
        const authServerToAPI = getAuthServerToAPI(res);
        const postData: OAuthData = {
            code,
            redirect_uri: SERVER_URL,
        };
        authServerToAPI.loginWithOAuth(postData)
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

export const signUpController = (req: Request, res: Response, next: NextFunction) => {
    const authServerToAPI = getAuthServerToAPI(res);
    authServerToAPI.signup(req.body)
        .then((response: AxiosResponse) => {
            cookieParser(res, response);
            res.status(200);
            res.send('Ок');
            return response;
        })
        .catch((err) => next(err));
};

export const getUserInfoController = (req: Request, res: Response, next: NextFunction) => {
    const { authCookie, uuid } = req.cookies;
    if (authCookie && uuid) {
        httpToAPI.httpTransport.defaults.headers.Cookie = `authCookie=${authCookie as string}; uuid=${uuid as string}`;
        const authServerToAPI = new AuthAPI(httpToAPI);
        getUserInfoRequest(req, res, next, authServerToAPI);
        res.status(200).send(getUserInfo(res));
    } else {
        console.log('Нет ключа авторизации', 'getUserInfoController');
        const authServerToAPI = new AuthAPI(httpToAPI);
        setAuthServerToAPI(res, authServerToAPI);
    }
};

export const logoutController = (req: Request, res: Response, next: NextFunction) => {
    const authServerToAPI = getAuthServerToAPI(res);
    authServerToAPI.logout()
        .then((response: AxiosResponse) => {
            res.clearCookie('authCookie');
            res.clearCookie('uuidForAuth');
            deleteUserAuth(res);
            deleteAuthServerToAPI(res);
            delete httpToAPI.httpTransport.defaults.headers.Cookie;
            return res.redirect('/login');
        })
        .catch((err) => next(err));
};
